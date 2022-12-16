/**
 * ---------------------------------------------------------------------------
 * ACT: HELPERS
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

//////////////////////////////////////////////////////////////////////////////
// VITALS
//////////////////////////////////////////////////////////////////////////////

const {
    copy,
    cut,
    each,
    fill,
    fuse,
    get,
    has,
    is,
    remap,
    roll,
    same,
    slice,
    to,
    until
} = require('node-vitals')('base', 'fs');
exports.copy = copy;
exports.cut = cut;
exports.each = each;
exports.fill = fill;
exports.fuse = fuse;
exports.get = get;
exports.has = has;
exports.is = is;
exports.remap = remap;
exports.roll = roll;
exports.same = same;
exports.slice = slice;
exports.to = to;
exports.until = until;

//////////////////////////////////////////////////////////////////////////////
// LOG
//////////////////////////////////////////////////////////////////////////////

const log = require('log-ocd')();
log.error.setConfig({
    ocdmap: true,
    throw:  false,
    exit:   true
});
log.error.setFormat({
    lineLimit: 80
});
log.pass.setFormat({
    linesAfter: 0
});
exports.log = log;

//////////////////////////////////////////////////////////////////////////////
// PATH
//////////////////////////////////////////////////////////////////////////////

const { resolve: _resolve } = require('path');

/**
 * @param {...string} path
 * @return {string}
 */
exports.resolve = function resolve(...paths) {
    /** @const {string} */
    const path = _resolve(...paths);
    return remap(path, /\\/g, '/');
};

//////////////////////////////////////////////////////////////////////////////
// CUSTOM IS METHODS
//////////////////////////////////////////////////////////////////////////////

/** @type {!RegExp} */
const VERSION = /^--?v(?:ersion)?$/;
/** @type {!RegExp} */
const HELP = /^(?:-?-?\?|--?h(?:elp)?)$/;

/**
 * @param {Args} args
 * @return {boolean}
 */
exports.is.help = function isHelp(args) {
    return !args.length || has(args[0], HELP);
};

/**
 * @param {Args} args
 * @return {boolean}
 */
exports.is.version = function isVersion(args) {
    return has(args[0], VERSION);
};
