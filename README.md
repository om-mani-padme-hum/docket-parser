# Docket JavaScript Documentation Generator

## Usage

```javascript
const docket = require('docket');

const parser = new docket.Parser();

const fileList = ['index.js', 'docket-added.js', 'docket-class.js', 'docket-module.js', 'docket-param.js', 'docket-returns.js', 
                  'docket-signature.js', 'docket-status.js', 'docket-throws.js', 'docket-updated.js', 'parser.js'];

parser.parseFiles(fileList);
parser.generateDocs(__dirname + '/docs');
```

## Outputs

The documentation for Docket, which you can find in the `/docs` folder.

## License

MIT Licensed
