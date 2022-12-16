/**
 * ---------------------------------------------------------------------------
 * LOCAL ACT TASK: year
 * ---------------------------------------------------------------------------
 * @file Use `act year` to access this file.
 * @version 1.5.0
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](https://jsdoc.app)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 * @see [Node Path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html)
 * @see [Vitals](https://github.com/imaginate/vitals)
 */

'use strict';

//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports.desc = 'updates year for entire repo';
exports.value = '2xxx';
exports.method = updateYear;

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

const {
    each,
    fuse,
    get,
    has,
    remap,
    to
} = require('node-vitals')('base', 'fs');

const { resolve } = require('path');

//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

const ROOT_DIRPATH = resolve(__dirname, '..');

//////////////////////////////////////////////////////////////////////////////
// PATTERNS
//////////////////////////////////////////////////////////////////////////////

const COPYRIGHT_PATT = /(?<=copyright (?:[0-9]{4} ?- ?)?)[2-9][0-9]{3}/ig;
const YEAR_PATT = /^[2-9][0-9]{3}$/;

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} year
 * @return {void}
 */
function updateYear(year) {

    if (!isYear(year)) {
        throw new Error(fuse('invalid year`', year, "' (should be `2xxx')"));
    }

    /** @type {!Array<string>} */
    const filepaths = get.filepaths(ROOT_DIRPATH, {
        basepath: true,
        recursive: true,
        validExts: 'js|md',
        invalidExts: 'json',
        invalidDirs: '.*|node_modules|tmp'
    });
    filepaths.push(resolve(ROOT_DIRPATH, 'bin/act'));
    each(filepaths, (filepath) => {
        insertYear(filepath, year);
    });
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
    return !!year && has(year, YEAR_PATT);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} year
 * @return {void}
 */
function insertYear(filepath, year) {
    /** @const {string} */
    const content = get.file(filepath);
    /** @const {string} */
    const result = remap(content, COPYRIGHT_PATT, year);
    to.file(result, filepath);
}
