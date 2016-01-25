/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASK-METHOD
 * -----------------------------------------------------------------------------
 * @version 1.1.1
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

var help = require('../../helpers');
var fuse = help.fuse;
var is   = help.is;
var log  = help.log;

/**
 * @param {TaskArg} arg
 * @param {(!Object|function)} method
 * @param {string} key
 * @param {?string} val
 * @param {boolean} result
 * @return {boolean}
 */
module.exports = function runTaskMethod(arg, method, key, val, result) {

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
};
