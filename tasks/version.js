/**
 * ---------------------------------------------------------------------------
 * LOCAL ACT TASK: version
 * ---------------------------------------------------------------------------
 * @file Use `act version` to access this file.
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

exports.desc = 'updates version for the repo';
exports.value = 'x.x.x-pre.x';
exports.default = '-all';
exports.methods = {
    all: {
        desc: 'updates version for entire repo',
        value: 'x.x.x-pre.x',
        method: updateAllVersion
    },
    npm: {
        desc: 'updates only npm version',
        value: 'x.x.x-pre.x',
        method: updateNpmVersion
    }
};

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

const SEMVER_PATT = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?$/;
const BDGVER_PATT =
    /(?<=badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+(?:\.[0-9]+)?)?/;
const SRCVER_PATT =
    /(?<=\bv?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?\b/g;
const PKGVER_PATT =
    /(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?(?=")/;

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} version
 * @return {void}
 */
function updateAllVersion(version) {

    if (!isSemVersion(version)) {
        throw new Error(fuse(
            'invalid version `', version, "' (must be a semantic version)"
        ));
    }

    updateJs(version);
    updatePackage(version);
    updateReadme(version);
}

/**
 * @public
 * @param {string} version
 * @return {void}
 */
function updateNpmVersion(version) {

    if (!isSemVersion(version)) {
        throw new Error(fuse(
            'invalid version `', version, "' (must be a semantic version)"
        ));
    }

    updatePackage(version);
    updateReadme(version);
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
    return !!version && has(version, SEMVER_PATT);
}

/**
 * @private
 * @param {string} version
 * @return {void}
 */
function updateJs(version) {
    /** @const {!Array<string>} */
    const filepaths = get.filepaths(ROOT_DIRPATH, {
        basepath: true,
        recursive: true,
        validExts: 'js',
        invalidDirs: '.*|node_modules|tmp'
    });
    filepaths.push(resolve(ROOT_DIRPATH, 'bin/act'));
    each(filepaths, (filepath) => {
        updateJsFile(filepath, version);
    });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 * @return {void}
 */
function updateJsFile(filepath, version) {
    /** @const {string} */
    const content = get.file(filepath);
    /** @const {string} */
    const result = remap(content, SRCVER_PATT, version);
    to.file(result, filepath);
}

/**
 * @private
 * @param {string} version
 * @return {void}
 */
function updatePackage(version) {
    /** @const {string} */
    const filepath = resolve(ROOT_DIRPATH, 'package.json');
    /** @const {string} */
    const content = get.file(filepath);
    /** @const {string} */
    const result = remap(content, PKGVER_PATT, version);
    to.file(result, filepath);
}

/**
 * @private
 * @param {string} version
 * @return {void}
 */
function updateReadme(version) {
    /** @const {string} */
    const filepath = resolve(ROOT_DIRPATH, 'README.md');
    /** @const {string} */
    const content = get.file(filepath);
    /** @const {string} */
    const replace = remap(version, /-/, '--');
    /** @const {string} */
    const result = remap(content, BDGVER_PATT, replace);
    to.file(result, filepath);
}
