# Docket JavaScript Documentation Generator v0.7.6

## Installation

`npm install docket-parser`

Use the example below and enter your code filenames into the array, making sure that module directives preceed 
all class and signature directives you want it to contain, and similarly including class directives before any 
signature directives you want it to contain.  If you don't get the order right, Docket will output an error.

## Usage

```javascript
const docket = require('docket-parser');

const fileList = ['index.js', 'docket-added.js', 'docket-class.js', 'docket-module.js', 
                  'docket-param.js', 'docket-returns.js', 'docket-signature.js', 'docket-status.js', 
                  'docket-throws.js', 'docket-updated.js', 'parser.js'];

docket.title('Docket v0.X.X Documentation');
docket.linkClass('text-success');
docket.parseFiles(fileList);
docket.generateDocs('docs');
```

## Outputs

The documentation for Docket can be found in the `/docs` folder, though these docs are in HTML and once
Markdown support is added, the docs will be displayed in this README.

## Helper

This package comes with a tool called `helper.js` that can be used to quickly generate getters and setters
complete with Docket style documentation using a small, customized object structure representing the class
properties.  The output is written to `helper-out.js` and can be copied into the body of any class.  Customize
it however you'd like.

## Todo

* Link all objects together, including links to other modules, and standard objects to Mozilla
* Add option to output in Markdown format
* Add support for documenting properties
* Add scroll-spy capability from Bootstrap

## License

MIT Licensed
