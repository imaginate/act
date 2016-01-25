/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASK-ONLY-METHOD
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

var help = require('../../helpers');
var fuse = help.fuse;
var is   = help.is;
var log  = help.log;

/**
 * @param {TaskArg} arg
 * @param {boolean} result
 * @return {boolean}
 */
module.exports = function runTaskOnlyMethod(arg, result) {

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
};
