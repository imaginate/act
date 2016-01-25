/**
 * -----------------------------------------------------------------------------
 * ACT: NEW-TASK-ARGS
 * -----------------------------------------------------------------------------
 * @version 1.0.1
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../helpers');
var cut   = help.cut;
var fuse  = help.fuse;
var has   = help.has;
var is    = help.is;
var log   = help.log;
var roll  = help.roll;
var slice = help.slice;
var until = help.until;

/**
 * @typedef {?{
 *   task:    (!Object|function),
 *   name:    string,
 *   value:   ?string,
 *   methods: ?Array<string>,
 *   values:  ?Array<?string>
 * }} TaskArg
 *
 * @typedef {!Array<TaskArg>} TaskArgs
 */

/** @type {!RegExp} */
var METHOD = /^-/;
/** @type {!RegExp} */
var VALUE = /=$/;
/** @type {!RegExp} */
var VALID = /^[a-z]/;
/** @type {!RegExp} */
var START_SPACE = /^ +/;
/** @type {!RegExp} */
var END_SPACE = / +$/;

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {TaskArgs}
 */
module.exports = function newTaskArgs(taskDir, args) {

  /** @type {TaskArgs} */
  var tasks;
  /** @type {TaskArg} */
  var task;
  /** @type {number} */
  var last;

  tasks = [];
  last = roll(0, args, function(start, arg, i, args) {

    // if one of the following is true return the previous start index:
    // - first arg
    // - arg is a method
    // - arg is a value
    if ( !i || has(arg, METHOD) || has(args[i - 1], VALUE) ) return start;

    // the current arg is assumed to be the next task so
    // - save the prior task's args and
    // - return the new start index
    args = slice(args, start, i);
    task = getTaskArg(taskDir, args);
    fuse.val(tasks, task);
    return i;
  });

  // save the last task's args
  args = slice(args, last);
  task = getTaskArg(taskDir, args);
  fuse.val(tasks, task);

  return tasks;
};

/**
 * @private
 * @param {string} taskDir
 * @param {Args} args
 * @return {TaskArg}
 */
function getTaskArg(taskDir, args) {

  /** @type {!ReferenceError} */
  var error;
  /** @type {TaskArg} */
  var task;
  /** @type {string} */
  var name;

  name = cut(args[0], VALUE);

  if ( !has(name, VALID) ) {
    error = new ReferenceError('invalid task name (must start with a letter)');
    log.error('Failed `act` command', error, { task: name });
    return null;
  }

  task = {
    name:    name,
    value:   null,
    methods: null,
    values:  null,
    exports: getTaskExports(taskDir, name)
  };

  if (!task.exports) return null;

  if ( has(args[0], VALUE) ) {
    task.value = args[1];
    args = slice(args, 2);
  }
  else {
    args = slice(args, 1);
  }

  if (!args.length) {
    if ( !is._str(task.exports.default) ) return task;
    args = getTaskDefaultArgs(name, task.exports.default);
  }

  return args && buildTaskArgMethods(task, args);
}

/**
 * @private
 * @param {string} taskDir
 * @param {string} name
 * @return {(?Object|function)}
 */
function getTaskExports(taskDir, name) {

  /** @type {(!ReferenceError|TypeError)} */
  var error;
  /** @type {string} */
  var title;
  /** @type {(!Object|function)} */
  var task;
  /** @type {string} */
  var file;

  file = fuse(taskDir, name, '.js');

  if ( !is.file(file) ) {
    error = new ReferenceError('task does not exist');
    log.error('Failed `act` command', error, { task: file });
    return null;
  }

  task = require(file);

  if ( !is._obj(task) ) {
    title = fuse('Failed `', name, '` task');
    error = new TypeError('invalid `exports` (must be an object/function)');
    log.error(title, error, { exports: task });
    return null;
  }

  task.name = name;
  return task;
}

/**
 * @private
 * @param {string} name
 * @param {string} defaultArgs
 * @return {?Args}
 */
function getTaskDefaultArgs(name, defaultArgs) {

  /** @type {!ReferenceError} */
  var error;
  /** @type {!RegExp} */
  var regex;
  /** @type {string} */
  var title;
  /** @type {boolean} */
  var fail;
  /** @type {Args} */
  var args;

  // trim space and task from default args
  defaultArgs = cut(defaultArgs, START_SPACE);
  defaultArgs = cut(defaultArgs, END_SPACE);
  regex = fuse('^', name, ' +');
  regex = new RegExp(regex);
  defaultArgs = cut(defaultArgs, regex);

  // convert to Args array and check for errors
  args = defaultArgs.split(' ');
  fail = until(false, args, function(arg, i, args) {

    if ( has(arg, METHOD) || ( i && has(args[--i], VALUE) ) ) return true;

    title = fuse('Failed `', name, '` task');
    error = 'invalid `exports.default` (must be a valid command string)';
    error = new ReferenceError(error);
    log.error(title, error, { defaultArgs: defaultArgs, invalidArg: arg });
    return false;
  });
  return fail ? null : args;
}

/**
 * @private
 * @param {TaskArg} task
 * @param {Args} args
 * @return {TaskArg}
 */
function buildTaskArgMethods(task, args) {

  /** @type {!Array} */
  var methods;
  /** @type {!Array} */
  var values;
  /** @type {*} */
  var value;

  methods = [];
  values  = [];
  value   = task.value;

  roll(false, args, function(skip, arg, i, args) {

    if (skip) return false;

    arg = cut(arg, METHOD);

    if ( !has(arg, VALUE) ) {
      fuse.val(methods, arg);
      fuse.val(values, value);
      return false;
    }

    arg = cut(arg, VALUE);
    fuse.val(methods, arg);
    fuse.val(values, args[++i]);
    return true;
  });

  task.methods = methods;
  task.values  = values;
  return task;
}
