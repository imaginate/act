/**
 * -----------------------------------------------------------------------------
 * LOCAL ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ node bin/act version` to access this file.
 * @version 1.4.0
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////

exports['desc'] = 'updates version for the repo';
exports['value'] = 'x.x.x-pre.x';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates version for entire repo',
    'value': 'x.x.x-pre.x',
    'method': updateAllVersion
  },
  'npm': {
    'desc': 'updates only npm version',
    'value': 'x.x.x-pre.x',
    'method': updateNPMVersion
  }
};

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var path = require('path');
var resolve = path.resolve;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

var ROOTPATH = resolve(__dirname, '..');
var ERRMSG   = 'invalid value (must be a semantic version)';

var SEMVER = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var BDGVER = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
var SRCVER = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var PKGVER = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var filepaths;

  if ( !isSemVersion(version) ) throw new Error(ERRMSG);

  filepaths = get.filepaths(ROOTPATH, {
    basepath:    true,
    recursive:   true,
    validExts:   'js',
    invalidDirs: '.*|node_modules|tmp'
  });
  insertVersions(filepaths, version);

  updateNPMVersion(version);
}

/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;

  if ( !isSemVersion(version) ) throw new Error(ERRMSG);

  filepath = resolve(ROOTPATH, 'package.json');
  content  = get.file(filepath);
  version  = fuse('$1', version);
  content  = remap(content, PKGVER, version);
  to.file(content, filepath);

  filepath = resolve(ROOTPATH, 'README.md');
  content  = get.file(filepath);
  version  = remap(version, /-/, '--');
  content  = remap(content, BDGVER, version);
  to.file(content, filepath);
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && has(version, SEMVER);
}

/**
 * @private
 * @param {!Array<string>} filepaths
 * @param {string} version
 */
function insertVersions(filepaths, version) {
  version = fuse('$1', version);
  each(filepaths, function(filepath) {
    insertVersion(filepath, version);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = get.file(filepath);
  content = remap(content, SRCVER, version);
  to.file(content, filepath);
}

