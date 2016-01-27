/**
 * -----------------------------------------------------------------------------
 * LOCAL ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ node bin/act version` to access this file.
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

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var ERROR_MSG = 'invalid value (must be a semantic version)';
var SEMANTIC  = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var NPM_BADGE = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;

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


/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var filepaths;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  filepaths = get.filepaths('.', {
    deep:      true,
    validExts: /js$/,
    validDirs: 'bin'
  });
  insertJSVersions('.', filepaths, version);

  filepaths = get.filepaths('src', {
    deep:      true,
    validExts: /js$/
  });
  insertJSVersions('src', filepaths, version);

  insertNPMVersion(version);
}

/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  if ( !isSemVersion(version, true) ) throw new Error(ERROR_MSG);

  insertNPMVersion(version);
}


/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && has(version, SEMANTIC);
}

/**
 * @private
 * @param {string} basedir
 * @param {!Array<string>} filepaths
 * @param {string} version
 */
function insertJSVersions(basedir, filepaths, version) {
  basedir = basedir && fuse(basedir, '/');
  version = fuse('$1', version);
  each(filepaths, function(filepath) {
    filepath = fuse(basedir, filepath);
    insertJSVersion(filepath, version);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertJSVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = get.file(filepath);
  content = remap(content, ALL_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} version
 */
function insertNPMVersion(version) {

  /** @type {string} */
  var content;

  content = get.file('./package.json');
  version = fuse('$1', version);
  content = remap(content, NPM_VERSION, version);
  to.file(content, './package.json');

  content = get.file('./README.md');
  version = remap(version, /-/, '--');
  content = remap(content, NPM_BADGE, version);
  to.file(content, './README.md');
}
