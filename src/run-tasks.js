/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASKS
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
var each = help.each;
var has  = help.has;
var is   = help.is;
var log  = help.log;

/** @type {!RegExp} */
var HELP = /^?$|^-+h(?:elp)?$/;

/**
 * @param {TaskArgs} args
 */
module.exports = function runTasks(args) {

  /** @type {!(ReferenceError|TypeError)} */
  var error;
  /** @type {!(Object|function)} */
  var task;

  each(args, function(arg) {

    task = arg.task;

    if (!arg.methods) {
      if ( !is.func(task.methods) ) {
        error = new TypeError('invalid act task exports.methods (must be a function or have a default with valid methods)');
        log.error('Failed act command', error, { task: task });
      }
      return task.methods(arg.value);
    }

    if ( !is._obj(task.methods) ) {
      error = new TypeError('invalid act task exports.methods (must be an object/function)');
      log.error('Failed act command', error, { task: task });
    }

    each(arg.methods, function(method, i, methods) {

      if ( !has(task.methods, method) ) {
        error = new ReferenceError('act task method does not exist');
        log.error('Failed act command', error, { task: task, method: method });
      }

      method = task.methods[method];
      if ( is.obj(method) ) method = method.method;

      if ( !is.func(method) ) {
        error = new TypeError('invalid act task exports.methods.<method>[.method] (must be a function)');
        log.error('Failed act command', error, { method: methods[i], task: task });
      }

      method(arg.values[i]);
    });
  });
};
