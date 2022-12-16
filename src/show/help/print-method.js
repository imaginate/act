/**
 * -----------------------------------------------------------------------------
 * ACT: PRINT-HELP-METHOD
 * -----------------------------------------------------------------------------
 * @version 1.5.0
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
var fill = help.fill;
var fuse = help.fuse;

/**
 * @param {?HelpMethod} method
 * @param {number} len
 * @return {string}
 */
module.exports = function printHelpMethod(method, len) {

  /** @type {string} */
  var space;
  /** @type {string} */
  var name;
  /** @type {string} */
  var val;

  if (!method) return '';

  val = method.val && fuse('= <', method.val, '>')
  name = fuse(method.name, val);
  space = fill(len - name.length, ' ');
  return fuse('      -', name, space, method.desc, '\n');
};
