/**
 * -----------------------------------------------------------------------------
 * ACT: SHOW-VERSION
 * -----------------------------------------------------------------------------
 * @version 1.4.0
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

/** @type {string} */
var VERSION = 'v1.4.0';

/**
 * @param {Args} args
 * @return {boolean}
 */
module.exports = function showVersion(args) {
  console.log('\n', VERSION);
  return true;
};
