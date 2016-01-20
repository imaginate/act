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

/**
 * @param {TaskArgs} args
 */
module.exports = function runTasks(args) {

  /** @type {!(Object|function)} */
  var methods;
  /** @type {!(Object|function)} */
  var method;
  /** @type {!(ReferenceError|TypeError)} */
  var error;

  each(args, function(arg) {

    methods = arg.exports;

    if (!arg.methods) {
      method = is.func(methods) ? methods : methods.method || methods.methods;
      if ( !is.func(method) ) {
        error = new TypeError('invalid act task exports.method (must be a function)');
        log.error('Failed act command', error, { task: arg.exports });
      }
      return method(arg.value);
    }

    methods = arg.exports.methods;

    if ( !is._obj(methods) ) {
      error = new TypeError('invalid act task exports.methods (must be an object/function)');
      log.error('Failed act command', error, { task: arg.exports });
    }

    each(arg.methods, function(argMethod, i, argMethods) {

      if ( !has(methods, argMethod) ) {
        error = new ReferenceError('act task method does not exist');
        log.error('Failed act command', error, { task: arg.exports, method: argMethod });
      }

      method = methods[argMethod];
      if ( is.obj(method) ) method = method.method;

      if ( !is.func(method) ) {
        error = new TypeError('invalid act task exports.methods.<method>[.method] (must be a function)');
        log.error('Failed act command', error, { task: arg.exports, method: argMethod });
      }

      method( arg.values[i] );
    });
  });
};
