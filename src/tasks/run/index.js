/**
 * -----------------------------------------------------------------------------
 * ACT: RUN-TASKS
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

var roll = require('../../helpers').roll;

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

  args = insertAlias(config, args);
  tasks = newTaskArgs(taskDir, args);
  return tasks && roll(true, tasks, function(result, arg) {
    return arg
      ? arg.methods
        ? runMethods(arg, result)
        : runOnlyMethod(arg, result)
      : false;
  });
};
