/**
 * -----------------------------------------------------------------------------
 * ACT: PRINT-HELP-TASKS
 * -----------------------------------------------------------------------------
 * @version 1.1.0
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

var printHelpTask = require('./print-task');

/**
 * @param {string} result
 * @param {!HelpTasks} tasks
 * @return {string}
 */
module.exports = function printHelpTasks(result, tasks) {

  /** @type {number} */
  var len;

  len = roll(0, tasks, function(max, task) {
    len = getTaskLen(task);
    return len > max ? len : max;
  });
  len += 2;
  return roll.up(result, tasks, function(task) {
    return printHelpTask(task, len);
  });
};

/**
 * @private
 * @param {?HelpTask} task
 * @return {number}
 */
function getTaskLen(task) {

  /** @type {number} */
  var len;

  if (!task) return 0;

  len = task.name.length;
  len += task.val.length && task.val.length + 4;
  return len;
}
