/**
 * ---------------------------------------------------------------------------
 * ACT
 * ---------------------------------------------------------------------------
 * @version 1.4.2
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

// save reference to the base path
const BASE_DIR = process.cwd();

const { cut, has, is, log, slice } = require('./src/helpers');

/**
 * @typedef {!Array<string>} Args
 */

/** @const {!RegExp} */
const TRIM_START = /^ *(?:act +)?/;
/** @const {!RegExp} */
const TRIM_END = / +$/;
/** @const {!RegExp} */
const NODE = /^["']?(?:.+[\/\\])?node(?:.[a-z]+)?["']?$/;
/** @const {!RegExp} */
const ACT = /^["']?(?:.+[\/\\])?act(?:.js)?["']?$/;
/** @const {!RegExp} */
const SPACE = / +/;

const findTaskDir = require('./src/tasks/find-dir');
const loadConfig = require('./src/config/load');
const showHelp = require('./src/show/help');
const showVersion = require('./src/show/version');
const runTasks = require('./src/tasks/run');

/**
 * @public
 * @param {(string|!Array<string>)} cmd
 * @return {boolean}
 */
module.exports = function initAct(cmd) {

    /** @type {Args} */
    let args;

    if (is.str(cmd)) {
        cmd = cut(cmd, TRIM_START);
        cmd = cut(cmd, TRIM_END);
        args = cmd.split(SPACE);
    } else if (is('!strings', cmd)) {
        args = has(cmd[0], NODE) && has(cmd[1], ACT)
            ? slice(cmd, 2)
            : has(cmd[0], ACT)
                ? slice(cmd, 1)
                : cmd;
    } else {
        /** @const {!TypeError} */
        const error = new TypeError(
            "invalid `cmd' param (must be a string or an array of strings)"
        );
        log.error("Failed `act' command.", error, { cmd: cmd });
        return false;
    }

    /** @const {string} */
    const dir = findTaskDir(BASE_DIR);
    /** @const {(?Config|boolean)} */
    const config = loadConfig(dir);
    return config
        ? is.help(args)
            ? showHelp(dir, config)
            : is.version(args)
                ? showVersion(args)
                : runTasks(dir, config, args)
        : false;
};
