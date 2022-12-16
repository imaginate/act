/**
 * -----------------------------------------------------------------------------
 * ACT: NEW-HELP-TASKS
 * -----------------------------------------------------------------------------
 * @version 1.4.2
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

const {
    cut,
    fuse,
    get,
    is,
    remap,
    resolve,
    until
} = require('../../helpers');

/**
 * @typedef {Array<?HelpTask>} HelpTasks
 */

var newHelpTask = require('./new-task');

/**
 * @param {string} taskDir
 * @return {!HelpTasks}
 */
module.exports = function newHelpTasks(taskDir) {

  /** @type {!Array<string>} */
  var files;
  /** @type {!HelpTasks} */
  var tasks;
  /** @type {string} */
  var name;

  files = get.filepaths(taskDir, {
    validFiles: /^[a-z].*.js$/
  });
  tasks = remap(files, function(file) {
    name = cut(file, /.js$/);
    file = resolve(taskDir, file);
    return newHelpTask(file, name);
  });
  tasks.error = until(true, tasks, function(task) {
    return is.null(task) || task.error;
  });
  return tasks;
};
