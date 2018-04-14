/** Require external modules */
const acorn = require('acorn');
const fs = require('fs');

/** Require local modules */
const docketClass = require('./docket-class');
const docketSignature = require('./docket-signature');

/**
 * @class Parser
 * @authors Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.1.0
 * @description Class for parsing docket entries in JavaScript class files using the acorn JavaScript parser.
 */
class Parser {
  /**
   * @signature new Parser([data])
   * @added v0.1.0
   * @param data object[Object]
   * @returns object[Parser]
   * @description Returns a new [Parser] instance, initializing with any key: value pairs provided in `data` with keys that match
   * setter method names.
   */
  constructor(data = {}) {
    this.classes(data.classes || []);
    this.last(data.last || null);
    this.lastClass(data.lastClass || null);
    this.lastSignature(data.lastSignature || null);
  }
  
  /**
   * @signature classes()
   * @added v0.1.0
   * @returns object[Array]
   * @description Gets the classes array.
   *
   * @signature classes(obj)
   * @added v0.1.0
   * @param obj object[Array]
   * @throws object[TypeError]
   * @description Sets the classes array, throwing a `TypeError` if `obj` is not a valid `Array`.
   */
  classes(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._classes;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._classes = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.classes(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.classes(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature last()
   * @added v0.1.0
   * @returns object[DocketClass|DocketSignature]
   * @description Gets the last object or signature block found.
   *
   * @signature last(obj)
   * @added v0.1.0
   * @param obj object[DocketClass|DocketSignature]
   * @throws object[TypeError]
   * @description Sets the last object or signature block found, throwing a `TypeError` if `obj` is not a valid
   * [DocketClass] or [DocketSignature].
   */
  last(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._last;
    
    /** Setter */
    else if ( arg1 === null || ['DocketClass', 'DocketSignature'].includes(arg1.constructor.name) )
      this._last = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.last(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature lastClass()
   * @added v0.1.0
   * @returns object[DocketClass]
   * @description Gets the last class block found.
   *
   * @signature lastClass(obj)
   * @added v0.1.0
   * @param obj object[DocketClass]
   * @throws object[TypeError]
   * @description Sets the last class block found, throwing a `TypeError` if `obj` is not a valid [DocketClass].
   */
  lastClass(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._lastClass;
    
    /** Setter */
    else if ( arg1 === null || arg1.constructor.name == 'DocketClass' )
      this._lastClass = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.lastClass(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature lastSignature()
   * @added v0.1.0
   * @returns object[DocketSignature]
   * @description Gets the last signature block found.
   *
   * @signature lastSignature(obj)
   * @added v0.1.0
   * @param obj object[DocketSignature]
   * @throws object[TypeError]
   * @description Sets the last signature block found, throwing a `TypeError` if `obj` is not a valid [DocketSignature].
   */
  lastSignature(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._lastSignature;
    
    /** Setter */
    else if ( arg1 === null || arg1.constructor.name == 'DocketSignature' )
      this._lastSignature = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.lastSignature(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature onComment(block, text, start, end)
   * @added v0.1.0
   * @param block boolean True if this is a block type comment, false otherwise
   * @param text string Comment text
   * @param start number Starting line number
   * @param end number Ending line number
   * @description This is a handler that processes comments found by the acorn JavaScript parser.  It is used to identify and
   * parse docket entries and create the resulting object tree that can later be used for generating the final documentation.
   */
  onComment(block, text, start, end) {
    /** Split the comment into lines and trim them of white spaces and astericks */
    let lines = text.split('\n').map(x => x.replace(/^[\s\*]*|[\s]*$/, '')).filter(x => x.length > 0);
    
    /** We need to know if we find any docket entries */
    let foundParserEntries = false;
    
    /** Append lines that don't start with @ to previous lines */
    for ( let i = lines.length - 1, i_min = 0; i >= i_min; i-- ) {
      /** If line is a docket entry, set the boolean, otherwise append to previous line */
      if ( lines[i][0] == '@' ) {
        foundParserEntries = true;
      } else if ( i > 0 ) {
        lines[i - 1] += ' ' + lines[i];
        lines[i] = '';
      } else {
        lines[i] = '';
      }
    }
    
    /** If there we no docket entries, ignore this comment */
    if ( !foundParserEntries )
      return;
    
    /** Remove blank lines created from last step */
    lines = lines.filter(x => x.length > 0);
    
    /** Parse docket entries */
    for ( let i = 0, i_max = lines.length; i < i_max; i++ ) {
      if ( lines[i].substr(0, 6) == '@added' ) {
        this.last().added(lines[i].substr(6).trim());
      } else if ( lines[i].substr(0, 8) == '@authors' ) {
        this.last().authors().push(lines[i].substr(8).trim());
      } else if ( lines[i].substr(0, 6) == '@class' ) {
        const c = new docketClass.DocketClass();
        
        c.name(lines[i].substr(7).trim());
        
        this.last(c);
        this.lastClass(c);
        this.classes().push(c);
      } else if ( lines[i].substr(0, 10) == '@copyright' ) {
        this.last().copyright(lines[i].substr(10).trim());
      } else if ( lines[i].substr(0, 12) == '@description' ) {
        this.last().description(lines[i].substr(12).trim());
      } else if ( lines[i].substr(0, 6) == '@param' ) {
        this.lastSignature().param().push(lines[i].substr(6).trim());
      } else if ( lines[i].substr(0, 8) == '@returns' ) {
        this.lastSignature().returns(lines[i].substr(8).trim());
      } else if ( lines[i].substr(0, 4) == '@see' ) {
        this.last().see(lines[i].substr(4).trim());
      } else if ( lines[i].substr(0, 10) == '@signature' ) {
        const s = new docketSignature.DocketSignature();
        
        s.signature(lines[i].substr(10).trim());
        
        const matches = s.signature().match(/^([^(]+)/);
        
        s.name(matches[1]);
        
        this.last(s);
        this.lastSignature(s);
        this.lastClass().signatures().push(s);
      } else if ( lines[i].substr(0, 8) == '@updated' ) {
        this.last().updated().push(lines[i].substr(8).trim());
      }
    }
  }
  
  /**
   * @signature parseFile(filePath)
   * @added v0.1.0
   * @param filePath string
   * @description Parses all docket entries in the classes of the file located at `filePath` and appends them to the classes
   * array in this Parser instance.
   */
  parseFile(file) {
    /** Read the file */
    const text = fs.readFileSync(file);
    
    /** Parse file text using acorn with our attached our onComment handler */
    acorn.parse(text, { onComment: this.onComment.bind(this) });
  }
}

module.exports.Parser = Parser;
