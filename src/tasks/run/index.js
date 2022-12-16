/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASKS
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
var roll = help.roll;
var same = help.same;

var insertAlias   = require('../../alias/insert');
var newTaskArgs   = require('../new-args');
var runOnlyMethod = require('./only');
var runMethods    = require('./methods');

/**
 * @param {string} taskDir
 * @param {Config} config
 * @param {Args} args
 * @return {boolean}
 */
module.exports = function runTasks(taskDir, config, args) {

  /** @type {(TaskArgs|boolean)} */
  var tasks;
  /** @type {number} */
  var last;
  /** @type {boolean} */
  var end;

  args = insertAlias(config, args);
  tasks = newTaskArgs(taskDir, args);

  if (!tasks) return false;

  last = tasks.length
    ? tasks.length - 1
    : 0;

  return roll(true, tasks, function(result, arg, i) {
    end = same(i, last);
    return arg
      ? arg.methods
        ? runMethods(arg, end, result)
        : runOnlyMethod(arg, end, result)
      : false;
  });
};
