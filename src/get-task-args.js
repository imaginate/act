/**
 * -----------------------------------------------------------------------------
 * ACT: GET-TASK-ARGS
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
var cut  = help.cut;
var fuse = help.fuse;
var has  = help.has;
var roll = help.roll;

/**
 * @typedef {!{
 *   name:    string,
 *   value:   ?string,
 *   methods: ?Array<string>,
 *   values:  ?Array<?string>
 * }} TaskArg
 *
 * @typedef {!Array<TaskArg>} TaskArgs
 */

/** @type {!RegExp} */
var METHOD = /^-/;
/** @type {!RegExp} */
var VALUE = /=$/;

/**
 * @param {Args} args
 * @return {TaskArgs}
 */
module.exports = function getTaskArgs(args) {

  /** @type {TaskArgs} */
  var tasks;
  /** @type {TaskArg} */
  var task;

  tasks = [];
  roll(0, args, function(start, arg, i, args) {
    if ( !i || has(arg, METHOD) || has(args[i - 1], VALUE) ) return start;
    args = slice(args, start, i);
    task = getTaskArg(args);
    fuse.val(tasks, task);
    return i;
  });
  return tasks;
};

/**
 * @private
 * @param {Args} args
 * @return {TaskArg}
 */
function getTaskArg(args) {

  /** @type {TaskArg} */
  var task;

  task = {
    name:    cut(args[0], VALUE),
    value:   null,
    methods: null,
    values:  null
  };

  if ( has(args[0], VALUE) ) {
    task.value = args[1];
    args = slice(args, 2);
  }
  else {
    args = slice(args, 1);
  }

  if (!args.length) return task;

  task.methods = [];
  task.values  = [];
  roll(false, args, function(skip, arg, i, args) {
    if (skip) return false;
    arg = cut(arg, METHOD);
    if ( !has(arg, VALUE) ) {
      fuse.val(task.methods, arg);
      fuse.val(task.values, task.value);
      return false;
    }
    arg = cut(arg, VALUE);
    fuse.val(task.methods, arg);
    fuse.val(task.values, args[++i]);
    return true;
  });
  return task;
}
