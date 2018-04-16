const docket = require('./index');
const util = require('util');

const parser = new docket.Parser();

const fileList = ['index.js', 'docket-added.js', 'docket-class.js', 'docket-module.js', 'docket-param.js', 'docket-returns.js', 
                  'docket-signature.js', 'docket-status.js', 'docket-throws.js', 'docket-updated.js', 'parser.js'];

parser.parseFiles(fileList);
parser.generateDocs(__dirname + '/docs');
//console.log(util.inspect(parser, { depth: null }));