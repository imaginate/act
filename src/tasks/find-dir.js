/**
 * ---------------------------------------------------------------------------
 * ACT: FIND-TASK-DIR
 * ---------------------------------------------------------------------------
 * @version 1.5.0
 * @see [Act](https://github.com/imaginate/act)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Vitals](https://github.com/imaginate/vitals)
 * @see [LogOCD](https://github.com/imaginate/log-ocd)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

const {
    cut,
    get,
    fuse,
    log,
    remap,
    resolve,
    same,
    until
} = require('../helpers');
const END_SLASH = /(?<=[\s\S])\/$/;

// all valid dirs
const ACT_DIR_PATT = /^(?:[aA]ct|[tT]asks?|[aA]ct-?tasks?)$/;
// dirs in order of validity
const ACT_DIR_RANK = [
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

    /** @type {?string} */
    let taskpath = getTaskDirpath(basepath);
    if (taskpath) {
        return taskpath;
    }

    /** @type {string} */
    let prevpath = '';
    /** @type {string} */
    let nextpath = basepath;
    /** @const {boolean} */
    const stable = until(true, 1e6, () => {
        prevpath = nextpath;
        nextpath = resolve(prevpath, '..');
        taskpath = getTaskDirpath(nextpath);
        return !!taskpath || prevpath === nextpath;
    });
    if (taskpath) {
        return taskpath;
    }

    /** @type {string} */
    let msg = fuse(
        'No valid Act task directory found.\n',
        'The task directory name must match the below pattern.\n',
        "    pattern = `^(?:[aA]ct|[tT]asks?|[aA]ct-?tasks?)$'"
    );
    if (!stable) {
        msg = fuse('Max parent directories searched (1,000,000).\n', msg);
    }
    log.error("Failed `act' command.", new Error(msg));
    return '';
};

/**
 * @private
 * @param {string} dirpath
 * @return {?string}
 */
function getTaskDirpath(dirpath) {
    /** @const {?string} */
    const dirname = getTaskDirname(dirpath);
    return dirname && resolve(dirpath, dirname);
}

/**
 * @private
 * @param {string} dirpath
 * @return {?string}
 */
function getTaskDirname(dirpath) {

    /** @const {!Array<string>} */
    const dirnames = remap(get.dirpaths(dirpath, {
        validDirs: ACT_DIR_PATT
    }), (dirname) => {
        return cut(dirname, END_SLASH);
    });
    switch (dirnames.length) {
        case 0:
            return null;
        case 1:
            return dirnames[0];
    }

    /** @const {!Set<string>} */
    const dirset = new Set(dirnames);
    /** @type {?string} */
    let dirname = null;
    until(true, ACT_DIR_RANK, (_dirname) => {
        if (dirset.has(_dirname)) {
            dirname = _dirname;
            return true;
        }
    });
    return dirname;
}
