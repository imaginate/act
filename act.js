#!/usr/bin/env node

/**
 * -----------------------------------------------------------------------------
 * ACT
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

var slice = require('./src/helpers').slice;

var showHelp = require('./src/show-help');
var getTasks = require('./src/get-tasks');
var runTasks = require('./src/run-tasks');

/**
 * @typedef {!Array<string>} Args
 *
 * @typedef {!{
 *   name:    string,
 *   methods: !Array<string>,
 *   values:  !Array<(string|undefined)>
 * }} Task
 *
 * @typedef {!Array<Task>} Tasks
 */

/** @type {Args} */
var args;
/** @type {Tasks} */
var tasks;

args = slice(process.argv, 2);

if ( showHelp(args) ) return;

tasks = getTasks(args);
runTasks(tasks);
