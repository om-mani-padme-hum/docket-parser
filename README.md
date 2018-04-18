# Docket JavaScript Documentation Generator v0.4.6

## Usage

```javascript
const docket = require('docket-parser');

const fileList = ['index.js', 'docket-added.js', 'docket-class.js', 'docket-module.js', 
                  'docket-param.js', 'docket-returns.js', 'docket-signature.js', 'docket-status.js', 
                  'docket-throws.js', 'docket-updated.js', 'parser.js'];

docket.parseFiles(fileList);
docket.generateDocs('docs');
```

## Outputs

The documentation for Docket, which you can find in the `/docs` folder, though this will soon be hosted 
elsewhere also for easier viewing.

## Todo

* Add auto-rendered table of contents with scroll-spy capability from Bootstrap
* Move rendering from large EJS templates to small EJS templates rendered by the individual classes
* Link all objects together, including links to other modules, and standard objects to Mozilla

## License

MIT Licensed
