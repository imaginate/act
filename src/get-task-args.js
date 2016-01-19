/**
 * -----------------------------------------------------------------------------
 * ACT: GET-TASK-ARGS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
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

var help = require('./helpers');
var cut  = help.cut;
var each = help.each;
var fuse = help.fuse;
var has  = help.has;
var is   = help.is;
var log  = help.log;
var roll = help.roll;

/**
 * @typedef {!{
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

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {TaskArgs}
 */
module.exports = function getTaskArgs(taskDir, args) {

  /** @type {TaskArgs} */
  var tasks;
  /** @type {TaskArg} */
  var task;

  tasks = [];
  roll(0, args, function(start, arg, i, args) {
    if ( !i || has(arg, METHOD) || has(args[i - 1], VALUE) ) return start;
    args = slice(args, start, i);
    task = getTaskArg(taskDir, args);
    fuse.val(tasks, task);
    return i;
  });
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
    error = new ReferenceError('invalid act task name (must start with a letter)');
    log.error('Failed act command', error, { task: name });
  }

  task = {
    name:    name,
    value:   null,
    methods: null,
    values:  null,
    exports: getTaskExports(taskDir, name)
  };

  if ( has(args[0], VALUE) ) {
    task.value = args[1];
    args = slice(args, 2);
  }
  else {
    args = slice(args, 1);
  }

  if (!args.length) {
    if ( !is._str(task.exports.default) ) return task;
    args = getTaskDefaultArgs(task.exports.default);
  }

  return buildTaskArgMethods(task, args);
}

/**
 * @private
 * @param {string} taskDir
 * @param {string} name
 * @return {!(Object|function)}
 */
function getTaskExports(taskDir, name) {

  /** @type {!(ReferenceError|TypeError)} */
  var error;
  /** @type {!(Object|function)} */
  var task;
  /** @type {string} */
  var file;

  file = fuse(taskDir, name, '.js');

  if ( !is.file(file) ) {
    error = new ReferenceError('act task does not exist');
    log.error('Failed act command', error, { task: file });
  }

  task = require(file);

  if ( !is._obj(task) ) {
    error = new TypeError('invalid act task exports (must be an object/function)');
    log.error('Failed act command', error, { task: name, exports: task });
  }

  task.name = name;
  return task;
}

/**
 * @private
 * @param {string} defaultArgs
 * @return {Args}
 */
function getTaskDefaultArgs(defaultArgs) {

  /** @type {!ReferenceError} */
  var error;
  /** @type {Args} */
  var args;

  args = defaultArgs.split(' ');
  each(args, function(arg, i, args) {
    if ( has(arg, METHOD) || ( i && has(args[--i], VALUE) ) ) return;
    error = new ReferenceError('invalid arg in act task exports.default');
    log.error('Failed act command', error, { default: defaultArgs, arg: arg });
  });
  return args;
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
