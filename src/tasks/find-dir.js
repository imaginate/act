/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-TASK-DIR
 * -----------------------------------------------------------------------------
 * @version 1.1.2
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

var help = require('../helpers');
var get   = help.get;
var fuse  = help.fuse;
var log   = help.log;
var remap = help.remap;

/**
 * @param {string} basepath
 * @return {string}
 */
module.exports = function findTaskDir(basepath) {

  /** @type {!Error} */
  var error;
  /** @type {!Array<string>} */
  var dirs;

  basepath = remap(basepath, /\\/g, '/');
  dirs = get.dirpaths(basepath, { validDirs: /^_?act-?tasks?$/ });

  if (!dirs.length) {
    error = new Error('no valid `act-task` directory found');
    log.error('Failed `act` command', error);
    return '';
  }

  if (dirs.length > 1) {
    error = new Error('multiple `act-task` directories found');
    log.error('Failed `act` command', error);
    return '';
  }

  return fuse(basepath, '/', dirs[0], '/');
};
