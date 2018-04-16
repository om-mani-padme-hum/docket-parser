/** Require local modules */
const docketAdded = require('./docket-added');
const docketClass = require('./docket-class');
const docketModule = require('./docket-module');
const docketParam = require('./docket-param');
const docketReturns = require('./docket-returns');
const docketSignature = require('./docket-signature');
const docketStatus = require('./docket-status');
const docketThrows = require('./docket-throws');
const docketUpdated = require('./docket-updated');
const parser = require('./parser');

/**
 * @module docket
 * @copyright 2018 Rich Lowe
 * @author Rich Lowe
 * @status experimental This module is still in pre-release development and significant API changes can be expected.
 * @description A simple module for parsing and generating beatiful documentation from Node.js modules, classes, and method 
 * signatures.
 */
module.exports.DocketAdded = docketAdded.DocketAdded;
module.exports.DocketClass = docketClass.DocketClass;
module.exports.DocketModule = docketSignature.DocketModule;
module.exports.DocketParam = docketParam.DocketParam;
module.exports.DocketReturns = docketReturns.DocketReturns;
module.exports.DocketSignature = docketSignature.DocketSignature;
module.exports.DocketStatus = docketStatus.DocketStatus;
module.exports.DocketThrows = docketThrows.DocketThrows;
module.exports.DocketUpdated = docketUpdated.DocketUpdated;
module.exports.Parser = parser.Parser;
