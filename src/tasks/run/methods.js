/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASK-METHODS
 * -----------------------------------------------------------------------------
 * @version 1.4.1
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../../helpers');
var fuse = help.fuse;
var has  = help.has;
var is   = help.is;
var log  = help.log;
var roll = help.roll;
var same = help.same;

var runMethod = require('./method');

/**
 * @param {TaskArg} arg
 * @param {boolean} end
 * @param {boolean} result
 * @return {boolean}
 */
module.exports = function runTaskMethods(arg, end, result) {

  /** @type {!(Object|function)} */
  var methods;
  /** @type {!(ReferenceError|TypeError)} */
  var error;
  /** @type {string} */
  var title;
  /** @type {number} */
  var last;

  methods = arg.exports.methods;

  if ( !is._obj(methods) ) {
    title = fuse('Failed `', arg.name, '` task');
    error = 'invalid `exports.methods` (must be an object/function)';
    error = new TypeError(error);
    log.error(title, error, { task: arg.exports });
    return false;
  }

  last = end && result
    ? arg.methods.length
      ? arg.methods.length - 1
      : 0
    : -1;
  return roll(result, arg.methods, function(result, key, i) {

    if ( !has(methods, key) ) {
      title = fuse('Failed `', arg.name, '.', key, '` task');
      error = new ReferenceError('method does not exist');
      log.error(title, error, { task: arg.exports, method: key });
      return false;
    }

    end = result && same(i, last);
    return runMethod(arg, methods[key], key, arg.values[i], end, result);
  });
};
