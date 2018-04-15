/**
 * @class docket.DocketModule
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.2.0
 * @description Data model class for storing module-level docket entries.
 */
class DocketModule {
  /**
   * @signature new DocketModule([data])
   * @added v0.2.0
   * @param data object[Object]
   * @returns object[DocketModule]
   * @description Returns a new [DocketModule] instance, initializing with any key: value pairs provided in `data` with keys 
   * that match setter method names.
   */
  constructor(data = {}) {
    this.added(data.added || '');
    this.authors(data.authors || []);
    this.classes(data.classes || []);
    this.copyright(data.copyright || '');
    this.description(data.description || '');
    this.name(data.name || '');
    this.see(data.see || []);
    this.signatures(data.signatures || []);
    this.updated(data.updated || []);
  }
  
  /**
   * @signature added()
   * @added v0.2.0
   * @returns string
   * @description Gets the version this module was added.
   *
   * @signature added(version)
   * @added v0.2.0
   * @param version string
   * @throws object[TypeError]
   * @description Sets the version this module was added, throwing a [TypeError] if `version` is not a valid [string].
   */
  added(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._added;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._added = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.added(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.added(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature authors()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets the authors array.
   *
   * @signature authors(authors)
   * @added v0.2.0
   * @param authors object[Array]
   * @throws object[TypeError]
   * @description Sets the authors array, throwing a [TypeError] if `authors` is not a valid [Array].
   */
  authors(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._authors;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._authors = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.authors(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.authors(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature classes()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets the classes array.
   *
   * @signature classes(obj)
   * @added v0.2.0
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
   * @signature copyright()
   * @added v0.2.0
   * @returns string
   * @description Gets the copyright text.
   *
   * @signature copyright(text)
   * @added v0.2.0
   * @param text string
   * @throws object[TypeError]
   * @description Sets the copyright text, throwing a [TypeError] if `text` is not a valid [string].
   */
  copyright(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._copyright;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._copyright = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.copyright(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.copyright(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature description()
   * @added v0.2.0
   * @returns string
   * @description Gets the description.
   *
   * @signature description(text)
   * @added v0.2.0
   * @param text string
   * @throws object[TypeError]
   * @description Sets the description, throwing a [TypeError] if `text` is not a valid [string].
   */
  description(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._description;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._description = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.description(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.description(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature name()
   * @added v0.2.0
   * @returns string
   * @description Gets the name.
   *
   * @signature name(text)
   * @added v0.2.0
   * @param text string
   * @throws object[TypeError]
   * @description Sets the name, throwing a [TypeError] if `text` is not a valid [string].
   */
  name(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._name;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._name = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.name(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.name(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature see()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets the see array.
   *
   * @signature see(see)
   * @added v0.2.0
   * @param see object[Array]
   * @throws object[TypeError]
   * @description Sets the see array, throwing a [TypeError] if `see` is not a valid [Array].
   */
  see(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._see;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._see = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.see(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.see(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
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
  
  /**
   * @signature updated()
   * @added v0.2.0
   * @returns object[Array]
   * @description Gets an array of the versions where this module was updated.
   *
   * @signature updated(versions)
   * @added v0.2.0
   * @param versions object[Array]
   * @throws object[TypeError]
   * @description Sets an array of the versions where this module was updated, throwing a [TypeError] if `versions` is not a 
   * valid [Array].
   */
  updated(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._updated;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._updated = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.updated(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.updated(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.DocketModule = DocketModule;
