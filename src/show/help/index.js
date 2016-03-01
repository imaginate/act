/**
 * -----------------------------------------------------------------------------
 * ACT: SHOW-HELP
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

var fuse = require('../../helpers').fuse;

var newHelpTasks   = require('./new-tasks');
var printHelpTasks = require('./print-tasks');
var printAlias     = require('./print-alias');

/**
 * @param {string} taskDir
 * @param {Config} config
 * @return {boolean}
 */
module.exports = function showHelp(taskDir, config) {

  /** @type {string} */
  var result;
  /** @type {!HelpTasks} */
  var tasks;

  tasks = newHelpTasks(taskDir);

  result = '\n';
  result = fuse(result, '  usage: act <task> [...<-method>]\n\n');
  result = fuse(result, '  examples:\n');
  result = fuse(result, '    act task -method -method\n');
  result = fuse(result, '    act task task -method task\n');
  result = fuse(result, '    act task= value task -method= value\n\n');
  result = fuse(result, '  tasks:\n');
  result = printHelpTasks(result, tasks);
  result = printAlias(result, config);
  console.log(result);

  return !tasks.error;
};
