/**
 * -----------------------------------------------------------------------------
 * ACT: NEW-HELP-TASK
 * -----------------------------------------------------------------------------
 * @version 1.3.0
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
var fuse = help.fuse;
var get  = help.get;
var is   = help.is;
var log  = help.log;

/**
 * @typedef {{
 *   name:    string,
 *   desc:    string,
 *   val:     string,
 *   error:   boolean,
 *   default: string,
 *   methods: ?HelpMethods
 * }} HelpTask
 */

var newHelpMethods = require('./new-methods');

/**
 * @param {string} file
 * @param {string} name
 * @return {?HelpTask}
 */
module.exports = function newHelpTask(file, name) {

  /** @type {?HelpMethods} */
  var methods;
  /** @type {!TypeError} */
  var error;
  /** @type {string} */
  var title;
  /** @type {!HelpTask} */
  var task;

  task = {};

  try {
    task.exports = require(file);
    task.exports.name = name;
  }
  catch (error) {
    title = fuse('Failed `', name, '` task');
    log.error(title, error, { file: file });
  }

  if ( !is._obj(task.exports) ) {
    title = fuse('Failed `', name, '` task');
    error = new TypeError('invalid `exports` (must be an object/function)');
    log.error(title, error, { task: task.exports });
    return null;
  }

  task.name = name;
  task.desc = get(task.exports, /^desc/)[0] || '';
  task.val  = get(task.exports, /^val/)[0]  || '';
  task.default = task.exports.default || '';
  methods = newHelpMethods(task.exports.methods, name);
  task.methods = methods;
  task.error = !!methods && methods.error;
  return task;
};
