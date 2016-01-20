/**
 * -----------------------------------------------------------------------------
 * ACT: INSERT-SHORTCUTS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
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

var help = require('./helpers');
var each = help.each;
var fuse = help.fuse;
var has  = help.has;

/**
 * @typedef {Object<string, string>} Shortcuts
 */

/** @type {!RegExp} */
var METHOD = /^-/;
/** @type {!RegExp} */
var VALUE = /=$/;

var findShortcuts = require('./find-shortcuts');

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {Args}
 */
module.exports = function insertShortcuts(taskDir, args) {

  /** @type {?Shortcuts} */
  var shortcuts;
  /** @type {Args} */
  var newArgs;
  /** @type {!TypeError} */
  var error;

  shortcuts = findShortcuts(taskDir);

  if (!shortcuts) return args;

  newArgs = [];
  each(args, function(arg, i, args) {

    if (i) {
      // if arg is a method or value push it and end
      if ( has(arg, METHOD) || has(args[i - 1], VALUE) ) {
        newArgs = fuse.val(newArgs, arg);
        return;
      }
    }

    if ( has(shortcuts, arg) ) {
      args = shortcuts[arg].split(' ');
      newArgs = fuse(newArgs, args);
    }
    else newArgs = fuse.val(newArgs, arg);
  });

  return newArgs;
};
