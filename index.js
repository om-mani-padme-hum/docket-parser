/** Require local modules */
const docketClass = require('./docket-class');
const docketSignature = require('./docket-signature');
const parser = require('./parser');

/** Export module classes */
module.exports.DocketClass = docketClass.DocketClass;
module.exports.DocketSignature = docketSignature.DocketSignature;
module.exports.Parser = parser.Parser;
