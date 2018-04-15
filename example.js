const docket = require('./index');
const util = require('util');

const parser = new docket.Parser();

const fileList = ['index.js', 'docket-class.js', 'docket-module.js', 'docket-signature.js', 'parser.js'];

parser.parseFiles(fileList);
parser.generateDocs(__dirname + '/docs');
//console.log(util.inspect(parser, { depth: null }));