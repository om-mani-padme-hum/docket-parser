/** Require external modules */
const acorn = require('acorn');
const ejs = require('ejs');
const fs = require('fs');

/** Require local modules */
const docketAdded = require('./docket-added');
const docketClass = require('./docket-class');
const docketModule = require('./docket-module');
const docketParam = require('./docket-param');
const docketReturns = require('./docket-returns');
const docketSignature = require('./docket-signature');
const docketStatus = require('./docket-status');
const docketThrows = require('./docket-throws');
const docketUpdated = require('./docket-updated');

/**
 * @class docket.Parser
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.1.0
 * @updated v0.2.0
 * @updated v0.3.0
 * @updated v0.4.0
 * @updated v0.6.0
 * @updated v0.6.2
 * @updated v0.6.4
 * @updated v0.6.5
 * @description Class for parsing docket entries in JavaScript class files using the acorn JavaScript parser.
 */
class Parser {
  /**
   * @signature new Parser()
   * @added v0.1.0
   * @updated v0.2.0
   * @updated v0.3.0
   * @updated v0.6.2
   * @updated v0.6.4
   * @returns Parser
   * @description Returns a new [Parser] instance.
   */
  constructor() {
    this.classes([]);
    this.count(0);
    this.currentFile('');
    this.last(null);
    this.lastClass(null);
    this.lastModule(null);
    this.lastSignature(null);
    this.linkClass('text-success');
    this.modules([]);
    this.signatures([]);
    this.title('');
  }
  
  /**
   * @signature classes()
   * @added v0.1.0
   * @returns Array
   * @description Gets the classes array.
   *
   * @signature classes(classesArray)
   * @added v0.1.0
   * @param classesArray Array
   * @throws TypeError
   * @description Sets the classes array, throwing a [TypeError] if `classesArray` is not a valid [Array].
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
   * @signature count()
   * @added v0.3.0
   * @returns number
   * @description Gets the count of a counter used internally to set unique ID's for each module, class, or signature that needs
   * them.
   *
   * @signature count(value)
   * @added v0.3.0
   * @param value number
   * @throws TypeError
   * @description Sets the count of a counter used internally to set unique ID's for each module, class, or signature that needs
   * them, throwing a [TypeError] if `count` is not a valid [number].
   */
  count(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._count;
    
    /** Setter */
    else if ( typeof arg1 == 'number' )
      this._count = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.count(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.count(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
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
   * @throws TypeError
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
   * @updated v0.6.0
   * @param folderPath string
   * @param class DocketClass
   * @description Documents `class` in a file at `folderPath`, including all of its methods that contain docket entries.
   */
  async documentClass(folderPath, c) {
    const signatures = c.signatures();
         
    let markup = '';
    
    /** Render the header */
    markup += await this.renderHeader(c);
    
    /** Render the table of contents */
    markup += await this.renderTableOfContents(c);
    
    /** Render the class */
    markup += await this.renderClass(c);
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ ) {      
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
   * @updated v0.6.0
   * @param folderPath string
   * @param module DocketModule
   * @description Documents `module` in a file at `folderPath`, including all of its classes that contain docket entries.
   */
  async documentModule(folderPath, m) {
    const classes = m.classes();
    const signatures = m.signatures();
         
    let markup = '';
    
    /** Render the header */
    markup += await this.renderHeader(m);
    
    /** Render the table of contents */
    markup += await this.renderTableOfContents(m);
    
    /** Render the module */
    markup += await this.renderModule(m);
    
    /** Generate class documentation */
    for ( let i = 0, i_max = classes.length; i < i_max; i++ ) {
      markup += await this.renderClass(classes[i]);
      
      for ( let j = 0, j_max = classes[i].signatures().length; j < j_max; j++ ) {        
        markup += await this.renderSignature(classes[i].signatures()[j]);
      }
    }
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ )      
      markup += await this.renderSignature(signatures[i]);
    
    /** Finish module documentation */
    markup += await this.renderFooter();
    
    /** Write markup to file */
    fs.writeFileSync(`${folderPath}/Module_${m.name()}.html`, markup);
  }
  
  /**
   * @signature documentSignature(folderPath, signature)
   * @added v0.2.0
   * @updated v0.6.0
   * @param folderPath string
   * @param signature DocketSignature
   * @description Documents `signature` in a file at `folderPath`.
   */
  async documentSignature(folderPath, s) {         
    let markup = '';
    
    /** Render the header */
    markup += await this.renderHeader(s);
    
    /** Render the table of contents */
    markup += await this.renderTableOfContents(s);
    
    /** Render the signature */
    markup += await this.renderSignature(s);
    markup += await this.renderFooter();
    
    /** Write markup to file */
    fs.writeFileSync(`${folderPath}/Signature_${s.name()}.html`, markup);
  }
  
  /**
   * @signature generateDocs(folderPath)
   * @added v0.2.0
   * @updated v0.6.0
   * @param folderPath string
   * @description Generates the documentation for parsed docket modules, classes, and signatures and saves one file per 
   * module, one file per class that is not part of a module, and one file per signature that is not part of a module or
   * class to `folderPath`.
   */
  async generateDocs(folderPath) {
    const classes = this.classes();
    const modules = this.modules();
    const signatures = this.signatures();
    
    console.log('Generating documentation...');
    
    /** Make sure we can write to the folderPath */
    fs.accessSync(folderPath, fs.constants.W_OK);
 
    console.log('Path is writable... OK');
    
    /** Generate class documentation */
    for ( let i = 0, i_max = classes.length; i < i_max; i++ )
      await this.documentClass(folderPath, classes[i]);
    
    /** Generate module documentation */
    for ( let i = 0, i_max = modules.length; i < i_max; i++ )
      await this.documentModule(folderPath, modules[i]);
    
    /** Generate signature documentation */
    for ( let i = 0, i_max = signatures.length; i < i_max; i++ )
      await this.documentSignature(folderPath, signatures[i]);
    
    /** Copy Bootstrap files to folderPath */
    console.log('Copying Boostrap files...');
    
    fs.copyFileSync('node_modules/bootstrap/dist/js/bootstrap.min.js', folderPath + '/bootstrap.min.js');
    fs.copyFileSync('node_modules/bootstrap/dist/css/bootstrap.min.css', folderPath + '/bootstrap.min.css');
    fs.copyFileSync('node_modules/jquery/dist/jquery.min.js', folderPath + '/jquery.min.js');
    fs.copyFileSync('node_modules/popper.js/dist/popper.min.js', folderPath + '/popper.min.js');
    
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
   * @throws TypeError
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
   * @returns DocketClass
   * @description Gets the last class block found.
   *
   * @signature lastClass(class)
   * @added v0.1.0
   * @param class DocketClass
   * @throws TypeError
   * @description Sets the last class block found, throwing a [TypeError] if `class` is not a valid [DocketClass].
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
   * @returns DocketModule
   * @description Gets the last module block found.
   *
   * @signature lastModule(module)
   * @added v0.2.0
   * @param module DocketModule
   * @throws TypeError
   * @description Sets the last module block found, throwing a [TypeError] if `module` is not a valid [DocketModule].
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
   * @returns DocketSignature
   * @description Gets the last signature block found.
   *
   * @signature lastSignature(signature)
   * @added v0.1.0
   * @param signature DocketSignature
   * @throws TypeError
   * @description Sets the last signature block found, throwing a [TypeError] if `signature` is not a valid [DocketSignature].
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
   * @signature linkClass()
   * @added v0.6.4
   * @returns string
   * @description Gets the CSS class that should be applied to the links for customized colors.
   *
   * @signature linkClass(class)
   * @added v0.6.4
   * @param class string
   * @throws TypeError
   * @description Sets the CSS class that should be applied to the links for customized colors, throwing a [TypeError] 
   * if `class` is not a valid [string].
   */
  linkClass(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._linkClass;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._linkClass = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.linkClass(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature modules()
   * @added v0.2.0
   * @returns Array
   * @description Gets the modules array.
   *
   * @signature modules(modulesArray)
   * @added v0.2.0
   * @param modulesArray Array
   * @throws TypeError
   * @description Sets the modules array, throwing a [TypeError] if `modulesArray` is not a valid [Array].
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
   * @signature parseComment(block, text, start, end)
   * @added v0.1.0
   * @updated v0.2.0
   * @updated v0.3.0
   * @updated v0.6.4
   * @updated v0.6.7
   * @param block boolean True if this is a block type comment, false otherwise
   * @param text string Comment text
   * @param start number Starting line number
   * @param end number Ending line number
   * @description This is a handler that processes comments found by the acorn JavaScript parser.  It is used to identify and
   * parse docket entries and stores the resulting object tree in the parser for later document generation.
   */
  parseComment(block, text, start, end) {
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
        const a = new docketAdded.DocketAdded();
        
        const data = lines[i].substr(6).trim().split(' ');
        
        a.version(data[0]);
        a.description(data.slice(1).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
                
        this.last().added(a);
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
        this.last().description(lines[i].substr(12).trim().replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
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
        const p = new docketParam.DocketParam();
        
        const data = lines[i].substr(6).trim().split(' ');
        
        p.name(data[0]);
        p.type(data[1].replace(/object\[|\]/g, '').split('|').map(x => `&lt;<a class='${this.linkClass()}' href='#'>${x}</a>&gt;`).join('|'));
        p.description(data.slice(2).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
        
        this.lastSignature().params().push(p);
      } else if ( lines[i].substr(0, 8) == '@returns' ) {
        const r = new docketReturns.DocketReturns();
        
        const data = lines[i].substr(8).trim().split(' ');
        
        r.type(data[0].replace(/object\[|\]/g, '').split('|').map(x => `&lt;<a class='${this.linkClass()}' href='#'>${x}</a>&gt;`).join('|'));
        r.description(data.slice(1).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
                
        this.lastSignature().returns(r);
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
          this.lastModule().signatures().push(s);
        else if ( s.module().length > 0 )
          throw new Error(`${this.currentFile()}: @module used in signature when no matching module has been parsed.`);
        else if ( this.lastClass() )
          this.lastClass().signatures().push(s);
        else
          this.signatures().push(s);
      } else if ( lines[i].substr(0, 7) == '@status' ) {
        const s = new docketStatus.DocketStatus();
        
        const data = lines[i].substr(7).trim().split(' ');
        
        s.status(data[0]);
        s.description(data.slice(1).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
                
        this.last().status(s);
      } else if ( lines[i].substr(0, 7) == '@throws' ) {
        const t = new docketThrows.DocketThrows();
        
        const data = lines[i].substr(7).trim().split(' ');
        
        t.type(data[0].replace(/object\[|\]/g, '').split('|').map(x => `&lt;<a class='${this.linkClass()}' href='#'>${x}</a>&gt;`).join('|'));
        t.description(data.slice(1).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
                
        this.lastSignature().throws().push(t);
      } else if ( lines[i].substr(0, 8) == '@updated' ) {
        const u = new docketUpdated.DocketUpdated();
        
        const data = lines[i].substr(8).trim().split(' ');
        
        u.description(data.slice(1).join(' ').replace(/`([a-zA-Z0-9_$]+)`/g, `<code class='text-dark p-1'>$1</code>`).replace(/\[([a-zA-Z0-9_$]+)\]/g, `&lt;<a class='${this.linkClass()}' href='#'>$1</a>&gt;`));
        u.version(data[0]);
                
        this.last().updates().push(u);
      }
    }
  }
  
  /**
   * @signature parseFile(filePath)
   * @added v0.1.0
   * @updated v0.2.0
   * @updated v0.3.0
   * @param filePath string
   * @description Parses all docket entries in the modules, classes, and method and/or function signatures of the file located at 
   * `filePath` and stores the resulting object tree in the parser for later document generation.
   */
  parseFile(filePath) {
    /** Store current file */
    this.currentFile(filePath);
    
    /** Reset the count */
    this.count(0);
    
    /** Read the file */
    const text = fs.readFileSync(filePath);
    
    /** Parse JavaScript file using acorn while parsing comments into our document tree with the attached parseComment handler */
    try {
      acorn.parse(text, { ecmaVersion: 9, onComment: this.parseComment.bind(this) });
    } catch ( err ) {
      console.log(`Error in ${filePath}:`);
      console.log(err.message);
    }
  }
  
  /**
   * @signature parseFiles(filePathArray)
   * @added v0.2.0
   * @updated v0.3.0
   * @param filePathArray Array<string>
   * @description Parses all docket entries in the modules, classes, and method and/or function signatures of the files in 
   * `filePathArray` and stores the resulting object tree in the parser for later document generation.
   */
  parseFiles(filePathArray) {
    filePathArray.forEach((filePath) => {
      this.parseFile(filePath);
      
      this.lastClass(null);
      this.lastSignature(null);
    });
  }
  
  /**
   * @signature renderClass(class)
   * @added v0.2.0
   * @updated v0.3.0
   * @updated v0.6.0
   * @updated v0.6.4
   * @param class DocketClass
   * @throws Error if EJS fails to render the template
   * @returns string The rendered HTML
   * @description Renders the EJS class template using the provided `class` object.
   */
  renderClass(c) {
    if ( c.module().length > 0 )
      console.log(`Documenting class ${c.module()}.${c.name()}...`);
    else
      console.log(`Documenting class ${c.name()}...`);
    
    /** Increase the count by one */
    this.count(this.count() + 1);
    
    /** Authors */
    let authors = '';
    
    for ( let i = 0, i_max = c.authors().length; i < i_max; i++ ) {
      authors += c.authors()[i];
      
      if ( i == i_max - 2 )
        authors += ', and';
      else if ( i != i_max - 1 )
        authors += ', ';
    }
    
    /** Title */
    let title = '';
          
    if ( c.module().length > 0 )
      title += `${c.module()}.`;
      
    title += c.name();
    
    /** ID */
    let id = '';
    
    if ( c.module().length > 0 )
      id = `c-${c.module()}-${c.name()}`;
    else
      id = `c-${c.name()}`;
    
    /** Create data object for passing to template */
    const data = {
      added: c.added(),
      authors: authors,
      copyright: c.copyright(),
      count: this.count(),
      description: c.description(),
      id: id,
      linkClass: this.linkClass(),
      name: c.name(),
      status: c.status(),
      title: title,
      updates: c.updates()
    };
    
    /** Render the output */
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/class.ejs', data, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }
  
  /**
   * @signature renderFooter()
   * @added v0.2.0
   * @updated v0.6.4
   * @throws Error if EJS fails to render the template
   * @returns string The rendered HTML
   * @description Renders the EJS footer template.
   */
  renderFooter() {
    console.log(`Documenting footer...`);
    
    /** Create data object for passing to template */
    const data = {
      linkClass: this.linkClass()
    }
    
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/footer.ejs', data, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderHeader(obj)
   * @added v0.2.0
   * @updated v0.6.0
   * @updated v0.6.4
   * @param obj object[DocketClass|DocketModule|DocketSignature]
   * @throws Error if EJS fails to render the template
   * @returns string The rendered HTML
   * @description Renders the EJS header template.
   */
  renderHeader(obj) {
    console.log(`Documenting header...`);
    
    /** Create data object for passing to template */
    const data = {
      linkClass: this.linkClass(),
      title: this.title()
    }
    
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/header.ejs', data, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderModule(module)
   * @added v0.2.0
   * @updated v0.3.0
   * @updated v0.6.0
   * @updated v0.6.4
   * @param module DocketModule
   * @throws Error if EJS fails to render the template
   * @returns string The rendered HTML
   * @description Renders the EJS module template using the provided `module` object.
   */
  renderModule(m) {
    console.log(`Documenting module ${m.name()}...`);
    
    /** Increase the count by one */
    this.count(this.count() + 1);
    
    /** Authors */
    let authors = '';
    
    for ( let i = 0, i_max = m.authors().length; i < i_max; i++ ) {
      authors += m.authors()[i];
      
      if ( i == i_max - 2 )
        authors += ', and';
      else if ( i != i_max - 1 )
        authors += ', ';
    }
    
    /** Create data object for passing to template */
    const data = {
      added: m.added(),
      authors: authors,
      copyright: m.copyright(),
      count: this.count(),
      description: m.description(),
      id: `m-${m.name()}`,
      linkClass: this.linkClass(),
      name: m.name(),
      status: m.status(),
      title: m.name(),
      updates: m.updates()
    };
    
    /** Render the output */
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/module.ejs', data, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderSignature(signature)
   * @added v0.2.0
   * @updated v0.3.0
   * @updated v0.6.0
   * @updated v0.6.4
   * @param signature DocketSignature
   * @throws Error if EJS fails to render the template
   * @returns string The rendered HTML
   * @description Renders the EJS module template using the provided `signature` object.
   */
  renderSignature(s) {
    if ( s.class().length > 0 )
      console.log(`Documenting signature ${s.class()}.${s.name()}...`);
    else if ( s.module().length > 0 )
      console.log(`Documenting signature ${s.module()}.${s.name()}...`);
    else
      console.log(`Documenting signature ${s.name()}...`);

    /** Increase the count by one */
    this.count(this.count() + 1);
    
    /** Authors */
    let authors = '';
    
    for ( let i = 0, i_max = s.authors().length; i < i_max; i++ ) {
      authors += s.authors()[i];
      
      if ( i == i_max - 2 )
        authors += ', and';
      else if ( i != i_max - 1 )
        authors += ', ';
    }

    /** Title */
    let title = '';
    
    if ( s.class().length > 0 && s.signature().substr(0, 4) != 'new ' )
      title = `${s.class()[0].toLowerCase()}${s.class().slice(1)}.`;
      
    title += s.signature();
        
    /** ID */
    let id = '';
    
    if ( s.class().length > 0 ) {
      if ( s.name().substr(0, 3) == 'new' )
        id = `s-${s.class()}-new`;
      else
        id = `s-${s.class()}-${s.name()}`;
    } else if ( s.module().length > 0 ) {
      id = `s-${s.module()}-${s.name()}`;
    } else {
      id = `s-${s.name()}`;
    }
    
    /** Create data object for passing to template */
    const data = {
      added: s.added(),
      authors: authors,
      count: this.count(),
      description: s.description(),
      id: id,
      linkClass: this.linkClass(),
      name: s.name(),
      module: s.module(),
      params: s.params(),
      returns: s.returns(),
      status: s.status(),
      throws: s.throws(),
      title: title,
      updates: s.updates()
    };
    
    /** Render the output */
    return new Promise((resolve, reject) => {
      ejs.renderFile(__dirname + '/templates/signature.ejs', data, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }

  /**
   * @signature renderTableOfContents(obj)
   * @added v0.6.0
   * @updated v0.6.4
   * @param obj object[DocketClass|DocketModule|DocketSignature]
   * @returns string The rendered HTML
   * @throws Error if EJS fails to render the template
   * @description Renders the EJS table of contents template.
   */
  renderTableOfContents(obj) {
    console.log(`Documenting table of contents...`);
    
    return new Promise((resolve, reject) => {
      let list = '';
      
      if ( obj.constructor.name == 'DocketClass' ) {
        /** Output list item for the class */
        list += ' '.repeat(14) + `<li class='py-1'><a class='${this.linkClass()}' href='#c-${obj.name()}'>Class: ${obj.name()}</a></li>\n`;

        /** Create a nested ordered list for all of the classes signatures */
        list += ' '.repeat(14) + `<ul>\n`;

        /** Loop through each class signature */
        obj.signatures().forEach((s) => {
          /** Output list item for the signature */
          if ( s.name().substr(0, 3) == 'new' )
            list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.class()}-new'>${s.signature()}</a></li>\n`;
          else
            list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.class()}-${s.name()}'>${s.class()[0].toLowerCase()}${s.class().slice(1)}.${s.signature()}</a></li>\n`;
        });
      } else if ( obj.constructor.name == 'DocketModule' ) {
        /** Output list item for the module */
        list += ' '.repeat(12) + `<li class='py-1'><a class='${this.linkClass()}' href='#m-${obj.name()}'>Module: ${obj.name()}</a></li>\n`;
        
        if ( obj.classes() ) {
          /** Create a nested unordered list for all of the modules classes */
          list += ' '.repeat(12) + `<ul>\n`;
          
          /** Loop through each module class */
          obj.classes().forEach((c) => {
            /** Output list item for the class */
            list += ' '.repeat(14) + `<li class='py-1'><a class='${this.linkClass()}' href='#c-${c.module()}-${c.name()}'>Class: ${c.name()}</a></li>\n`;
            
            /** Create a nested ordered list for all of the classes signatures */
            list += ' '.repeat(14) + `<ul>\n`;
          
            /** Loop through each class signature */
            c.signatures().forEach((s) => {
              /** Output list item for the signature */
              if ( s.name().substr(0, 3) == 'new' )
                list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.class()}-new'>${s.signature()}</a></li>\n`;
              else
                list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.class()}-${s.name()}'>${s.class()[0].toLowerCase()}${s.class().slice(1)}.${s.signature()}</a></li>\n`;
            });

            list += ' '.repeat(14) + `</ul>\n`;
          });
          
          /** Loop through each module signature */
          obj.signatures().forEach((s) => {
            /** Output list item for the signature */
            list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.module()}-${s.name()}'>${s.module()[0].toLowerCase()}${s.module().slice(1)}.${s.name()}</a></li>\n`;
          });
                                
          list += ' '.repeat(12) + `</ul>\n`;
        }
      } else if ( obj.constructor.name == 'DocketSignature' ) {
        /** Define signature object */
        const s = obj;
        
        /** Output list item for the signature */
        list += ' '.repeat(16) + `<li class='py-1'><a class='${this.linkClass()}' href='#s-${s.name()}'>${s.signature()}</a></li>\n`;
      }
      
      ejs.renderFile(__dirname + '/templates/table-of-contents.ejs', {list: list}, {}, (err, html) => {
        if ( err )
          reject(err);

        resolve(html + '\n');
      });
    });
  }
  
  /**
   * @signature signatures()
   * @added v0.2.0
   * @returns Array
   * @description Gets the signatures array.
   *
   * @signature signatures(signaturesArray)
   * @added v0.2.0
   * @param signaturesArray Array
   * @throws TypeError
   * @description Sets the signatures array, throwing a [TypeError] if `signaturesArray` is not a valid [Array].
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
  
  /**
   * @signature title()
   * @added v0.6.2
   * @returns string
   * @description Gets the title of the documentation.
   *
   * @signature title(text)
   * @added v0.6.2
   * @param text string
   * @throws TypeError
   * @description Sets the title of the documentation, throwing a [TypeError] if `data` is not a valid [string].
   */
  title(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._title;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._title = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.title(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.Parser = Parser;
