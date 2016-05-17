/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-TASK-DIR
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

var help  = require('../helpers');
var get   = help.get;
var fuse  = help.fuse;
var log   = help.log;
var remap = help.remap;
var same  = help.same;
var until = help.until;

// all valid dirs
var ACT_DIRS_REGEX = /^(?:[aA]ct|[tT]asks?|[aA]ct-?tasks?)$/;
// dirs in order of validity
var ACT_DIRS_ARR = [
  'Act-tasks',
  'act-tasks',
  'Acttasks',
  'acttasks',
  'Act-task',
  'act-task',
  'Acttask',
  'acttask',
  'Act',
  'act',
  'Tasks',
  'tasks',
  'Task',
  'task'
];

/**
 * @param {string} basepath
 * @return {string}
 */
module.exports = function findTaskDir(basepath) {

  /** @type {string} */
  var actdir;
  /** @type {!Error} */
  var error;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {number} */
  var i;

  basepath = remap(basepath, /\\/g, '/');
  dirs = get.dirpaths(basepath, {
    validDirs: ACT_DIRS_REGEX
  });

  if (!dirs.length) {
    error = new Error('no valid `act-task` directory found');
    log.error('Failed `act` command', error);
    return '';
  }

  if (dirs.length > 1) {
    i = 0;
    until(true, dirs, function(dir) {
      if ( same(dir, ACT_DIRS_ARR[i]) ) {
        actdir = dir;
        return true;
      }
      ++i;
    });
  }
  else actdir = dirs[0];

  return fuse(basepath, '/', actdir, '/');
};
