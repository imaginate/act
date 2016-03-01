/**
 * -----------------------------------------------------------------------------
 * ACT: PRINT-ALIAS
 * -----------------------------------------------------------------------------
 * @version 1.1.2
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var roll = help.roll;

/**
 * @param {string} result
 * @param {!Config} config
 * @return {string}
 */
module.exports = function printAlias(result, config) {

  /** @type {string} */
  var space;
  /** @type {number} */
  var len;

  if (!config.alias) return result;

  len = roll(0, config.alias, function(max, cmd, name) {
    return name.length > max ? name.length : max;
  });
  len += 2;
  result = fuse(result, '\n  alias:\n');
  return roll.up(result, config.alias, function(cmd, name) {
    space = fill(len - name.length, ' ');
    return fuse('    ', name, space, cmd, '\n');
  });
};
