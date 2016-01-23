/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASKS
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

var help = require('./helpers');
var fuse = help.fuse;
var has  = help.has;
var is   = help.is;
var log  = help.log;
var roll = help.roll;

var insertShortcuts = require('./insert-shortcuts');
var getTaskArgs = require('./get-task-args');

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {boolean}
 */
module.exports = function runTasks(taskDir, args) {

  /** @type {(TaskArgs|boolean)} */
  var tasks;

  args = insertShortcuts(taskDir, args);
  tasks = args && getTaskArgs(taskDir, args);
  return tasks && roll(true, tasks, function(result, arg) {
    return arg
      ? arg.methods
        ? runMethods(arg, result)
        : runOnlyMethod(arg, result)
      : false;
  });
};

/**
 * @private
 * @param {TaskArg} arg
 * @param {boolean} result
 * @return {boolean}
 */
function runOnlyMethod(arg, result) {

  /** @type {!(Object|function)} */
  var method;
  /** @type {!TypeError} */
  var error;
  /** @type {string} */
  var title;

  method = is.func(arg.exports)
    ? arg.exports
    : arg.exports.method || arg.exports.methods;

  if ( !is.func(method) ) {
    title = fuse('Failed `', arg.name, '` task');
    error = new TypeError('invalid `exports.method` (must be a function)');
    log.error(title, error, { task: arg.exports });
    return false;
  }

  try {
    method(arg.val);
  }
  catch (error) {
    title = fuse('Failed `', arg.name, '` task');
    log.error(title, error, { task: arg.exports });
    return false;
  }

  title = fuse('Completed `', arg.name, '` task');
  if (arg.exports.done !== false) log.pass(title);
  return result;
}

/**
 * @private
 * @param {TaskArg} arg
 * @param {boolean} result
 * @return {boolean}
 */
function runMethods(arg, result) {

  /** @type {!(Object|function)} */
  var methods;
  /** @type {!(ReferenceError|TypeError)} */
  var error;
  /** @type {string} */
  var title;

  methods = arg.exports.methods;

  if ( !is._obj(methods) ) {
    title = fuse('Failed `', arg.name, '` task');
    error = 'invalid `exports.methods` (must be an object/function)';
    error = new TypeError(error);
    log.error(title, error, { task: arg.exports });
    return false;
  }

  return roll(result, arg.methods, function(result, key, i) {

    if ( !has(methods, key) ) {
      title = fuse('Failed `', arg.name, '.', key, '` task');
      error = new ReferenceError('method does not exist');
      log.error(title, error, { task: arg.exports, method: key });
      return false;
    }

    return runMethod(arg, methods[key], key, arg.values[i], result);
  });
}

/**
 * @private
 * @param {TaskArg} arg
 * @param {(!Object|function)} method
 * @param {string} key
 * @param {?string} val
 * @param {boolean} result
 * @return {boolean}
 */
function runMethod(arg, method, key, val, result) {

  /** @type {!TypeError} */
  var error;
  /** @type {string} */
  var title;

  method = is.obj(method) ? method.method : method;

  if ( !is.func(method) ) {
    title = fuse('Failed `', arg.name, '.', key, '` task');
    error = fuse('invalid `exports.methods.', key, '.method`');
    error = fuse(error, ' (must be a function)');
    error = new TypeError(error);
    log.error(title, error, { task: arg.exports });
    return false;
  }

  try {
    method(val);
  }
  catch (error) {
    title = fuse('Failed `', arg.name, '.', key, '` task');
    log.error(title, error, { task: arg.exports });
    return false;
  }

  title = fuse('Completed `', arg.name, '.', key, '` task');
  if (arg.exports.done !== false) log.pass(title);
  return result;
}
