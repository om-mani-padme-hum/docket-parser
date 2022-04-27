const docket = require('./index');

const fileList = ['index.js', 'docket-added.js', 'docket-class.js', 'docket-module.js', 
                  'docket-param.js', 'docket-returns.js', 'docket-signature.js', 'docket-status.js', 
                  'docket-throws.js', 'docket-updated.js', 'parser.js'];

docket.title('Docket v0.7.6 Documentation');
docket.linkClass('text-success');
docket.parseFiles(fileList);
docket.generateDocs('docs');
