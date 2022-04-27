/** Require local modules */
const parser = require('./parser');

/**
 * @module docket
 * @copyright 2018 Rich Lowe
 * @author Rich Lowe
 * @status experimental This module is still in pre-release development and significant API changes can be expected.
 * @description A simple module for automatically parsing comments in your code to generate beatiful documentation 
 * from Node.js modules, classes, and method signatures.
 */
module.exports = new parser.Parser();
