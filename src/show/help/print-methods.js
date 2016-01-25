/**
 * -----------------------------------------------------------------------------
 * ACT: PRINT-HELP-METHODS
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

var roll = require('../../helpers').roll;

var printHelpMethod = require('./print-method');

/**
 * @param {?HelpMethods} methods
 * @return {string}
 */
module.exports = function printHelpMethods(methods) {

  /** @type {number} */
  var len;

  if (!methods) return '';

  len = roll(0, methods, function(max, method) {
    len = getMethodLen(method);
    return len > max ? len : max;
  });
  len += 2;
  return roll.up('', methods, function(method) {
    return printHelpMethod(method, len);
  });
};

/**
 * @private
 * @param {?HelpMethod} method
 * @return {number}
 */
function getMethodLen(method) {

  /** @type {number} */
  var len;

  if (!method) return 0;

  len = method.name.length;
  len += method.val.length && method.val.length + 4;
  return len;
}
