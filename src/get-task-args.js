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

  /** @type {!(ReferenceError|TypeError)} */
  var error;
  /** @type {TaskArg} */
  var task;
  /** @type {string} */
  var file;

  task = {
    name:    cut(args[0], VALUE),
    value:   null,
    methods: null,
    values:  null
  };

  if ( !has(task.name, VALID) ) {
    error = new ReferenceError('invalid act task name (must start with a letter)');
    log.error('Failed act command', error, { task: task.name });
  }

  file = fuse(taskDir, task.name, '.js');

  if ( !is.file(file) ) {
    error = new ReferenceError('act task does not exist');
    log.error('Failed act command', error, { task: file });
  }

  task.task = require(file);

  if ( !is._obj(task.task) ) {
    error = new TypeError('invalid act task exports (must be an object/function)');
    log.error('Failed act command', error, { task: name, exported: task.task });
  }

  task.task.name = task.name;

  if ( has(args[0], VALUE) ) {
    task.value = args[1];
    args = slice(args, 2);
  }
  else {
    args = slice(args, 1);
  }

  if (!args.length) {
    if ( !is._str(task.task.default) ) return task;
    args = task.task.default.split(' ');
    each(args, function(arg, i, args) {
      if ( has(arg, METHOD) ) return;
      if ( i && has(args[--i], VALUE) ) return;
      error = new ReferenceError('invalid act task default method arg');
      log.error('Failed act command', error, { methodArg: arg });
    });
  }

  task.methods = [];
  task.values  = [];
  roll(false, args, function(skip, arg, i, args) {
    if (skip) return false;
    arg = cut(arg, METHOD);
    if ( !has(arg, VALUE) ) {
      fuse.val(task.methods, arg);
      fuse.val(task.values, task.value);
      return false;
    }
    arg = cut(arg, VALUE);
    fuse.val(task.methods, arg);
    fuse.val(task.values, args[++i]);
    return true;
  });
  return task;
}
