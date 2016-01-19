/**
 * -----------------------------------------------------------------------------
 * ACT: SHOW-HELP
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

var help = require('./helpers');
var cut   = help.cut;
var fill  = help.fill;
var fuse  = help.fuse;
var get   = help.get;
var is    = help.is;
var log   = help.log;
var remap = help.remap;
var roll  = help.roll;

/**
 * @typedef {!{
 *   name: string,
 *   desc: string,
 *   val:  string
 * }} HelpMethod
 *
 * @typedef {?Array<HelpMethod>} HelpMethods
 *
 * @typedef {!{
 *   name:    string,
 *   desc:    string,
 *   val:     string,
 *   default: string,
 *   methods: HelpMethods
 * }} HelpTask
 *
 * @typedef {!Array<HelpTask>} HelpTasks
 */

/** @type {!RegExp} */
var HELP = /^?$|^-+h(?:elp)?$/;

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {boolean}
 */
module.exports = function showHelp(taskDir, args) {

  /** @type {string} */
  var result;

  if ( args.length && !has(args[0], HELP) ) return false;

  result = '\n';
  result = fuse(result, 'Use: act <task> [...<-method>]\n\n');
  result = fuse(result, 'Examples: act task -method -method\n');
  result = fuse(result, '          act task task -method task\n');
  result = fuse(result, '          act task= value task -method= value\n\n');
  result = fuse(result, 'Tasks:\n');
  result = roll.up(result, getHelpTasks(taskDir), printHelpTask);
  console.log(result);

  return true;
};
