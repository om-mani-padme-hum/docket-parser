# Docket JavaScript Documentation Generator

## Usage

```javascript
const docket = require('docket');
const util = require('util');

const parser = new docket.Parser();

parser.parseFile('parser.js');

console.log(util.inspect(parser.classes(), { depth: null }));
```

## Outputs

**Note:** All of the parameters below can be accessed via getter/setter methods of the same name that don't start with `_`.

```text
[ DocketClass {
    _added: 'v0.1.0',
    _authors: [ 'Rich Lowe' ],
    _copyright: '2018 Rich Lowe',
    _description: 'Class for parsing docket entries in JavaScript class files using the acorn JavaScript parser.',
    _name: 'Parser',
    _see: [],
    _signatures: 
     [ DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Returns a new [Parser] instance, initializing with any key: value pairs provided in `data` with keys that match setter method names.',
         _name: 'new Parser',
         _param: [ 'data object[Object]' ],
         _returns: 'object[Parser]',
         _see: [],
         _signature: 'new Parser([data])',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Gets the classes array.',
         _name: 'classes',
         _param: [],
         _returns: 'object[Array]',
         _see: [],
         _signature: 'classes()',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Sets the classes array, throwing a `TypeError` if `obj` is not a valid `Array`.',
         _name: 'classes',
         _param: [ 'obj object[Array]' ],
         _returns: '',
         _see: [],
         _signature: 'classes(obj)',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Gets the last object or signature block found.',
         _name: 'last',
         _param: [],
         _returns: 'object[DocketClass|DocketSignature]',
         _see: [],
         _signature: 'last()',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Sets the last object or signature block found, throwing a `TypeError` if `obj` is not a valid [DocketClass] or [DocketSignature].',
         _name: 'last',
         _param: [ 'obj object[DocketClass|DocketSignature]' ],
         _returns: '',
         _see: [],
         _signature: 'last(obj)',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Gets the last class block found.',
         _name: 'lastClass',
         _param: [],
         _returns: 'object[DocketClass]',
         _see: [],
         _signature: 'lastClass()',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Sets the last class block found, throwing a `TypeError` if `obj` is not a valid [DocketClass].',
         _name: 'lastClass',
         _param: [ 'obj object[DocketClass]' ],
         _returns: '',
         _see: [],
         _signature: 'lastClass(obj)',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Gets the last signature block found.',
         _name: 'lastSignature',
         _param: [],
         _returns: 'object[DocketSignature]',
         _see: [],
         _signature: 'lastSignature()',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Sets the last signature block found, throwing a `TypeError` if `obj` is not a valid [DocketSignature].',
         _name: 'lastSignature',
         _param: [ 'obj object[DocketSignature]' ],
         _returns: '',
         _see: [],
         _signature: 'lastSignature(obj)',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'This is a handler that processes comments found by the acorn JavaScript parser.  It is used to identify and parse docket entries and create the resulting object tree that can later be used for generating the final documentation.',
         _name: 'onComment',
         _param: 
          [ 'block boolean True if this is a block type comment, false otherwise',
            'text string Comment text',
            'start number Starting line number',
            'end number Ending line number' ],
         _returns: '',
         _see: [],
         _signature: 'onComment(block, text, start, end)',
         _updated: [] },
       DocketSignature {
         _added: 'v0.1.0',
         _authors: [],
         _description: 'Parses all docket entries in the classes of the file located at `filePath` and appends them to the classes array in this Parser instance.',
         _name: 'parseFile',
         _param: [ 'filePath string' ],
         _returns: '',
         _see: [],
         _signature: 'parseFile(filePath)',
         _updated: [] } ],
    _updated: [] } ]
```

## License

MIT Licensed
