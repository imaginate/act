/**
 * -----------------------------------------------------------------------------
 * ACT: PRINT-HELP-TASK
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
var fill = help.fill;
var fuse = help.fuse;

var printHelpMethods = require('./print-methods');

/**
 * @param {?HelpTask} task
 * @param {number} len
 * @return {string}
 */
module.exports = function printHelpTask(task, len) {

  /** @type {string} */
  var methods;
  /** @type {string} */
  var space;
  /** @type {string} */
  var name;
  /** @type {string} */
  var base;
  /** @type {string} */
  var val;

  if (!task) return '';

  val = task.val && fuse('= <', task.val, '>');
  base = task.default && fuse(' (default: ', task.default, ')');
  name = fuse(name, val);
  space = fill(len - name.length, ' ');
  methods = printHelpMethods(task.methods);
  return fuse('    ', name, space, task.desc, base, '\n', methods);
};
