/** Require external modules */
const acorn = require('acorn');
const ejs = require('ejs');
const fs = require('fs');

/** Require local modules */
const docketClass = require('./docket-class');
const docketModule = require('./docket-module');
const docketSignature = require('./docket-signature');

/**
 * @class docket.Parser
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.1.0
 * @updated v0.2.0
 * @description Class for parsing docket entries in JavaScript class files using the acorn JavaScript parser.
 */
class Parser {
  /**
   * @signature new Parser([data])
   * @added v0.1.0
   * @updated v0.2.0
   * @param data object[Object]
   * @returns object[Parser]
   * @description Returns a new [Parser] instance, initializing with any key: value pairs provided in `data` with keys that match
   * setter method names.
   */
  constructor(data = {}) {
    this.currentFile(data.currentFile || '');
    this.classes(data.classes || []);
    this.last(data.last || null);
    this.lastClass(data.lastClass || null);
    this.lastModule(data.lastModule || null);
    this.lastSignature(data.lastSignature || null);
    this.modules(data.modules || []);
    this.signatures(data.signatures || []);
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
   * @description Sets the classes array, throwing a [TypeError] if `obj` is not a valid [Array].
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
   * @signature currentFile()
   * @added v0.2.0
   * @returns string
   * @description Gets the current file name.
   *
   * @signature currentFile(fileName)
   * @added v0.2.0
   * @param fileName string
   * @throws object[TypeError]
   * @description Sets the current file name, throwing a [TypeError] if `fileName` is not a valid [string].
   */
  currentFile(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._currentFile;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._currentFile = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.currentFile(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.currentFile(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature documentClass(folderPath, class)
   * @added v0.2.0
   * @param folderPath string
   * @param class object[DocketClass]
   * @description Documents `class` in a file at `folderPath`, including all of its methods that contain docket entries.
   */
  async documentClass(folderPath, c) {
    const signatures = c.signatures();
    
    console.log(`Documenting class ${c.name()}...`);
     
    let markup = '';
    
    /** Generate class documentation */
    markup += await this.renderHeader(c);
    markup += await this.renderClass(c);
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ ) {
      console.log(`Documenting signature ${c.name()}.${signatures[i].name()}...`);
      
      markup += await this.renderSignature(signatures[i]);
    }
    
    /** Finish class documentation */
    markup += await this.renderFooter();
    
    /** Write markup to file */
    fs.writeFileSync(`${folderPath}/Class_${c.name()}.html`, markup);
  }
  
  /**
   * @signature documentModule(folderPath, module)
   * @added v0.2.0
   * @param folderPath string
   * @param module object[DocketModule]
   * @description Documents `module` in a file at `folderPath`, including all of its classes that contain docket entries.
   */
  async documentModule(folderPath, m) {
    const classes = m.classes();
    const signatures = m.signatures();
    
    console.log(`Documenting module ${m.name()}...`);
     
    let markup = '';
    
    /** Generate module documentation */
    markup += await this.renderHeader(m);
    markup += await this.renderModule(m);
    
    /** Generate class documentation */
    for ( let i = 0, i_max = classes.length; i < i_max; i++ ) {
      console.log(`Documenting class ${m.name()}.${classes[i].name()}...`);

      markup += await this.renderClass(classes[i]);
      
      for ( let j = 0, j_max = classes[i].signatures().length; j < j_max; j++ ) {
        console.log(`Documenting signature ${m.name()}.${classes[i].name()}.${classes[i].signatures()[j].name()}...`);
        
        markup += await this.renderSignature(classes[i].signatures()[j]);
      }
    }
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ ) {
      console.log(`Documenting signature ${m.name()}.${signatures[i].name()}...`);
      
      markup += await this.renderSignature(signatures[i]);
    }
    
    /** Finish module documentation */
    markup += await this.renderFooter();
    
    /** Write markup to file */
    fs.writeFileSync(`${folderPath}/Module_${m.name()}.html`, markup);
  }
  
  /**
   * @signature documentSignature(folderPath, signature)
   * @added v0.2.0
   * @param folderPath string
   * @param signature object[DocketSignature]
   * @description Documents `signature` in a file at `folderPath`.
   */
  async documentSignature(folderPath, s) {    
    console.log(`Documenting signature ${s.name()}...`);
     
    let markup = '';
    
    /** Generate signature documentation */
    markup += await this.renderHeader(s);
    markup += await this.renderSignature(s);
    markup += await this.renderFooter();
    
    /** Write markup to file */
    fs.writeFileSync(`${folderPath}/Signature_${s.name()}.html`, markup);
  }
  
  /**
   * @signature generateDocs(folderPath)
   * @added v0.2.0
   * @param folderPath string
   * @description Generates the documentation for parsed docket classes and saves one file per class to `folderPath`.
   */
  generateDocs(folderPath) {
    const classes = this.classes();
    const modules = this.modules();
    const signatures = this.signatures();
    
    console.log('Generating documentation...');
    
    /** Make sure we can write to the folderPath */
    fs.accessSync(folderPath, fs.constants.W_OK);
 
    console.log('Path is writable... OK');
    
    /** Generate class documentation */
    for ( let i = 0, i_max = classes.length; i < i_max; i++ )
      this.documentClass(folderPath, classes[i]);
    
    /** Generate module documentation */
    for ( let i = 0, i_max = modules.length; i < i_max; i++ )
      this.documentModule(folderPath, modules[i]);
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ )
      this.documentSignature(folderPath, signatures[i]);
    
    /** Copy Bootstrap files to folderPath */
    console.log('Copying Boostrap files...');
    
    fs.copyFileSync(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js', folderPath + '/bootstrap.min.js');
    fs.copyFileSync(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css', folderPath + '/bootstrap.min.css');
    fs.copyFileSync(__dirname + '/node_modules/jquery/dist/jquery.min.js', folderPath + '/jquery.min.js');
    fs.copyFileSync(__dirname + '/node_modules/popper.js/dist/popper.min.js', folderPath + '/popper.min.js');
    
    console.log('Done!');
  }
  
  /**
   * @signature last()
   * @added v0.1.0
   * @updated v0.2.0
   * @returns object[DocketClass|DocketModule|DocketSignature]
   * @description Gets the last object or signature block found.
   *
   * @signature last(obj)
   * @added v0.1.0
   * @updated v0.2.0
   * @param obj object[DocketClass|DocketModule|DocketSignature]
   * @throws object[TypeError]
   * @description Sets the last object or signature block found, throwing a [TypeError] if `obj` is not a valid [DocketClass]
   * or [DocketModule] or [DocketSignature].
   */
  last(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._last;
    
    /** Setter */
    else if ( arg1 === null || ['DocketClass', 'DocketModule', 'DocketSignature'].includes(arg1.constructor.name) )
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
   * @description Sets the last class block found, throwing a [TypeError] if `obj` is not a valid [DocketClass].
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
   * @signature lastModule()
   * @added v0.2.0
   * @returns object[DocketModule]
   * @description Gets the last module block found.
   *
   * @signature lastModule(obj)
   * @added v0.2.0
   * @param obj object[DocketModule]
   * @throws object[TypeError]
   * @description Sets the last module block found, throwing a [TypeError] if `obj` is not a valid [DocketModule].
   */
  lastModule(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._lastModule;
    
    /** Setter */
    else if ( arg1 === null || arg1.constructor.name == 'DocketModule' )
      this._lastModule = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.lastModule(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
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
   * @description Sets the last signature block found, throwing a [TypeError] if `obj` is not a valid [DocketSignature].
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
   * @signature modules()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets the modules array.
   *
   * @signature modules(obj)
   * @added v0.2.0
   * @param obj object[Array]
   * @throws object[TypeError]
   * @description Sets the modules array, throwing a [TypeError] if `obj` is not a valid [Array].
   */
  modules(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._modules;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._modules = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.modules(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.modules(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature onComment(block, text, start, end)
   * @added v0.1.0
   * @updated v0.2.0
   * @param block boolean True if this is a block type comment, false otherwise
   * @param text string Comment text
   * @param start number Starting line number
   * @param end number Ending line number
   * @description This is a handler that processes comments found by the acorn JavaScript parser.  It is used to identify and
   * parse docket entries and stores the resulting object tree in the parser for later document generation.
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
      } else if ( lines[i].substr(0, 7) == '@author' ) {
        this.last().authors().push(lines[i].substr(7).trim());
      } else if ( lines[i].substr(0, 6) == '@class' ) {
        const c = new docketClass.DocketClass();
        
        const text = lines[i].substr(6).trim();
        
        if ( text.includes('.') ) {
          c.module(text.split('.')[0]);
          c.name(text.split('.')[1]);
        } else {
          c.name(text);
        }
        
        if ( c.name().length == 0 )
          throw new ReferenceError(`${this.currentFile()}: @class used without name.`);
        
        this.last(c);
        this.lastClass(c);
        this.lastSignature(null);
        
        if ( this.lastModule() && c.module().length > 0 && c.module() == this.lastModule().name() )
          this.lastModule().classes().push(c);
        else if ( c.module().length > 0 )
          throw new Error(`${this.currentFile()}: @module used in class when no matching module has been parsed.`);
        else
          this.classes().push(c);
      } else if ( lines[i].substr(0, 10) == '@copyright' ) {
        this.last().copyright(lines[i].substr(10).trim());
      } else if ( lines[i].substr(0, 12) == '@description' ) {
        this.last().description(lines[i].substr(12).trim());
      } else if ( lines[i].substr(0, 7) == '@module' ) {
        if ( this.lastClass() ) {
          this.lastClass().module(lines[i].substr(7).trim());
        } else if ( this.lastSignature() ) {
          this.lastSignature().module(lines[i].substr(7).trim());
        } else {
          const m = new docketModule.DocketModule();

          m.name(lines[i].substr(7).trim());

          if ( m.name().length == 0 )
            throw new ReferenceError(`${this.currentFile()}: @module used without name.`);

          this.last(m);
          this.lastClass(null);
          this.lastModule(m);
          this.lastSignature(null);
          this.modules().push(m);
        }
      } else if ( lines[i].substr(0, 6) == '@param' ) {
        this.lastSignature().param().push(lines[i].substr(6).trim());
      } else if ( lines[i].substr(0, 8) == '@returns' ) {
        this.lastSignature().returns(lines[i].substr(8).trim());
      } else if ( lines[i].substr(0, 4) == '@see' ) {
        this.last().see(lines[i].substr(4).trim());
      } else if ( lines[i].substr(0, 10) == '@signature' ) {
        const s = new docketSignature.DocketSignature();
        
        s.signature(lines[i].substr(10).trim());
        
        if ( this.lastClass() )
          s.class(this.lastClass().name());
        
        const matches = s.signature().match(/^([^(]+)/);
        
        if ( matches[1].includes('.') ) {
          s.module(matches[1].split('.')[0]);
          s.name(matches[1].split('.')[1]);
        } else {
          s.name(matches[1]);
        }
        
        this.last(s);
        this.lastSignature(s);
        
        if ( this.lastModule() && s.module().length > 0 && s.module() == this.lastModule().name() )
          this.lastModule.signatures().push(s);
        else if ( s.module().length > 0 )
          throw new Error(`${this.currentFile()}: @module used in signature when no matching module has been parsed.`);
        else if ( this.lastClass() )
          this.lastClass().signatures().push(s);
        else
          this.signatures().push(s);
      } else if ( lines[i].substr(0, 8) == '@updated' ) {
        this.last().updated().push(lines[i].substr(8).trim());
      }
    }
  }
  
  /**
   * @signature parseFile(filePath)
   * @added v0.1.0
   * @updated v0.2.0
   * @param filePath string
   * @description Parses all docket entries in the modules, classes, and method and/or function signatures of the file located at 
   * `filePath` and stores the resulting object tree in the parser for later document generation.
   */
  parseFile(filePath) {
    /** Store current file */
    this.currentFile(filePath);
    
    /** Read the file */
    const text = fs.readFileSync(filePath);
    
    /** Parse file text using acorn with our attached our onComment handler */
    try {
      acorn.parse(text, { ecmaVersion: 9, onComment: this.onComment.bind(this) });
    } catch ( err ) {
      console.log(`Error in ${filePath}:`);
      console.log(err.message);
    }
  }
  
  /**
   * @signature parseFiles(fileList)
   * @added v0.2.0
   * @param fileList object[Array]
   * @description Parses all docket entries in the modules, classes, and method and/or function signatures of the files in the 
   * `fileList` array and stores the resulting object tree in the parser for later document generation.
   */
  parseFiles(fileList) {
    fileList.forEach((filePath) => {
      this.parseFile(filePath);
      
      this.lastClass(null);
      this.lastSignature(null);
    });
  }
  
  /**
   * @signature renderClass(class)
   * @added v0.2.0
   * @param class object[DocketClass]
   * @returns string The rendered HTML
   * @description Renders the EJS class template using the provided `class` object.
   */
  renderClass(c) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/class.ejs', { c: c }, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }
  
  /**
   * @signature renderFooter()
   * @added v0.2.0
   * @returns string The rendered HTML
   * @description Renders the EJS footer template.
   */
  renderFooter() {
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/footer.ejs', {}, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderHeader(data)
   * @added v0.2.0
   * @param data object[DocketClass|DocketModule|DocketSignature]
   * @returns string The rendered HTML
   * @description Renders the EJS header template.
   */
  renderHeader(data) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/header.ejs', {data: data}, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderModule(module)
   * @added v0.2.0
   * @param module object[DocketModule]
   * @returns string The rendered HTML
   * @description Renders the EJS module template using the provided `module` object.
   */
  renderModule(m) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/module.ejs', { m: m }, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderSignature(signature)
   * @added v0.2.0
   * @param signature object[DocketSignature]
   * @returns string The rendered HTML
   * @description Renders the EJS module template using the provided `signature` object.
   */
  renderSignature(s) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/signature.ejs', { s: s }, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature signatures()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets the signatures array.
   *
   * @signature signatures(obj)
   * @added v0.2.0
   * @param obj object[Array]
   * @throws object[TypeError]
   * @description Sets the signatures array, throwing a [TypeError] if `obj` is not a valid [Array].
   */
  signatures(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._signatures;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._signatures = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.signatures(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.signatures(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.Parser = Parser;
