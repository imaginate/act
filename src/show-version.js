/**
 * -----------------------------------------------------------------------------
 * ACT: SHOW-VERSION
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

var has = require('./helpers').has;

/** @type {!RegExp} */
var VERSION = /^-+v(?:ersion)?$/;
/** @type {string} */
var CURRENT = 'v0.0.1';

/**
 * @param {Args} args
 * @return {boolean}
 */
module.exports = function showVersion(args) {

  if ( !has(args[0], VERSION) ) return false;

  console.log(CURRENT);

  return true;
};
