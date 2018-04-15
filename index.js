/** Require local modules */
const docketClass = require('./docket-class');
const docketModule = require('./docket-module');
const docketSignature = require('./docket-signature');
const parser = require('./parser');

/**
 * @module docket
 * @added v0.1.0
 * @updated v0.2.0
 * @copyright 2018 Rich Lowe
 * @author Rich Lowe
 * @description A simple module for parsing and generating beatiful documentation from Node.js modules, classes, and method 
 * signatures.
 */
module.exports.DocketClass = docketClass.DocketClass;
module.exports.DocketModule = docketSignature.DocketModule;
module.exports.DocketSignature = docketSignature.DocketSignature;
module.exports.Parser = parser.Parser;
