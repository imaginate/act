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
var each  = help.each;
var fill  = help.fill;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
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
  /** @type {HelpTasks} */
  var tasks;
  /** @type {number} */
  var len;

  if ( args.length && !has(args[0], HELP) ) return false;

  result = '\n';
  result = fuse(result, 'Use: act <task> [...<-method>]\n\n');
  result = fuse(result, 'Examples: act task -method -method\n');
  result = fuse(result, '          act task task -method task\n');
  result = fuse(result, '          act task= value task -method= value\n\n');
  result = fuse(result, 'Tasks:\n');

  tasks = getHelpTasks(taskDir);
  len = getHelpTasksLen(tasks);
  result = roll.up(result, tasks, function(task) {
    return printHelpTask(task, len);
  });

  console.log(result);

  return true;
};

////// GET HELP TASKS

/**
 * @private
 * @param {string} taskDir
 * @return {HelpTasks}
 */
function getHelpTasks(taskDir) {

  /** @type {!Array<string>} */
  var tasks;

  tasks = get.filepaths(taskDir, {
    validFiles: /^[a-z][a-z0-9-.]*.js$/
  });
  return remap(tasks, function(task) {
    return getHelpTask(taskDir, task);
  });
}

/**
 * @private
 * @param {string} taskDir
 * @param {string} task
 * @return {HelpTask}
 */
function getHelpTask(taskDir, task) {

  /** @type {!TypeError} */
  var error;
  /** @type {string} */
  var name;

  name = cut(task, /.js$/);
  task = fuse(taskDir, task);
  task = require(task);

  if ( !is._obj(task) ) {
    error = new TypeError('invalid act task exports (must be an object/function)');
    log.error('Failed act command', error, { task: name, exported: task });
  }

  return {
    name:    name,
    desc:    get(task, /^desc/)[0] || '',
    val:     get(task, /^val/)[0]  || '',
    default: task.default || '',
    methods: getHelpMethods(task.methods)
  };
}

/**
 * @private
 * @param {HelpTasks} tasks
 * @return {number}
 */
function getHelpTasksLen(tasks) {

  /** @type {number} */
  var len;

  return 2 + roll(0, tasks, function(max, task) {
    len = task.name.length;
    if (task.val.length) len += task.val.length + 4;
    return len > max ? len : max;
  });
}

/**
 * @private
 * @param {(!Object|undefined)} methods
 * @return {HelpMethods}
 */
function getHelpMethods(methods) {

  /** @type {HelpMethods} */
  var result;

  if ( !is.obj(methods) ) return null;

  result = [];
  each(methods, function(method, name) {
    method = getHelpMethod(name, method);
    fuse.val(result, method);
  });
  return result;
}

/**
 * @private
 * @param {string} name
 * @param {!Object} method
 * @return {HelpMethod}
 */
function getHelpMethod(name, method) {

  /** @type {!TypeError} */
  var error;

  if ( !is._obj(method) || ( !is.func(method) && !is.func(method.method) ) ) {
    error = new TypeError('invalid act task method');
    log.error('Failed act command', error, { method: name, value: method });
  }

  return {
    name: name,
    desc: get(method, /^desc/)[0] || '',
    val:  get(method, /^val/)[0]  || ''
  };
}

/**
 * @private
 * @param {HelpMethods} methods
 * @return {number}
 */
function getHelpMethodsLen(methods) {

  /** @type {number} */
  var len;

  return 5 + roll(0, methods, function(max, method) {
    len = method.name.length;
    if (method.val.length) len += method.val.length + 4;
    return len > max ? len : max;
  });
}

////// PRINT HELP TASKS

/**
 * @private
 * @param {HelpTask} task
 * @param {number} len
 * @return {string}
 */
function printHelpTask(task, len) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var space;

  result = task.val ? fuse(task.name, '[= ', task.val, ']') : task.name;
  space = fill(len - result.length, ' ');
  result = fuse('  ', result, space, task.desc, '\n');
  if (task.default) {
    space = fill(len + 2, ' ');
    result = fuse(result, space, 'default: ', task.default, '\n');
  }
  if (task.methods) {
    len = getHelpMethodsLen(task.methods);
    result = roll.up(result, task.methods, function(method) {
      return printHelpMethod(method, len);
    });
  }
  return result;
}

/**
 * @private
 * @param {HelpMethod} method
 * @param {number} len
 * @return {string}
 */
function printHelpMethod(method, len) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var space;

  result = method.val ? fuse(method.name, '[= ', method.val, ']') : method.name;
  space = fill(len - result.length, ' ');
  return fuse('    -', result, space, method.desc, '\n');
}
