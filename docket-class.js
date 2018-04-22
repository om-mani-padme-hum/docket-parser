/**
 * @class docket.DocketClass
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.1.0
 * @updated v0.2.0
 * @updated v0.3.0
 * @updated v0.4.0
 * @description Data model class for storing class-level docket entries.
 */
class DocketClass {
  /**
   * @signature new DocketClass([data])
   * @added v0.1.0
   * @updated v0.3.0
   * @param data Object
   * @returns DocketClass
   * @description Returns a new [DocketClass] instance, initializing with any key/value pairs provided in `data` with keys 
   * that match setter method names.
   */
  constructor(data = {}) {
    this.added(data.added || null);
    this.authors(data.authors || []);
    this.copyright(data.copyright || '');
    this.description(data.description || '');
    this.name(data.name || '');
    this.module(data.module || '');
    this.signatures(data.signatures || []);
    this.status(data.status || null);
    this.updates(data.updates || []);
  }
  
  /**
   * @signature added()
   * @added v0.1.0
   * @updated v0.3.0
   * @returns DocketAdded
   * @description Gets an object containing data about the version this signature was added.
   *
   * @signature added(data)
   * @added v0.1.0
   * @updated v0.3.0
   * @param data DocketAdded
   * @throws TypeError
   * @description Sets as object containing data about the version this signature was added, throwing a [TypeError] if `data` is
   * not a valid [DocketAdded].
   */
  added(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._added;
    
    /** Setter */
    else if ( arg1 === null || ( typeof arg1 == 'object' && arg1.constructor.name == 'DocketAdded' ) )
      this._added = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.added(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature authors()
   * @added v0.1.0
   * @returns Array
   * @description Gets the authors array.
   *
   * @signature authors(authorsArray)
   * @added v0.1.0
   * @param authorsArray Array
   * @throws TypeError
   * @description Sets the authors array, throwing a [TypeError] if `authorsArray` is not a valid [Array].
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
   * @signature copyright()
   * @added v0.1.0
   * @returns string
   * @description Gets the copyright text.
   *
   * @signature copyright(text)
   * @added v0.1.0
   * @param text string
   * @throws TypeError
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
   * @added v0.1.0
   * @returns string
   * @description Gets a description of the class.
   *
   * @signature description(text)
   * @added v0.1.0
   * @param text string
   * @throws TypeError
   * @description Sets a description of the class, throwing a [TypeError] if `text` is not a valid [string].
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
   * @added v0.1.0
   * @returns string
   * @description Gets the name of the class.
   *
   * @signature name(name)
   * @added v0.1.0
   * @param name string
   * @throws TypeError
   * @description Sets the name of the class, throwing a [TypeError] if `name` is not a valid [string].
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
   * @signature module()
   * @added v0.2.0
   * @returns string
   * @description Gets the module name.
   *
   * @signature module(name)
   * @added v0.2.0
   * @param name string
   * @throws TypeError
   * @description Sets the module name, throwing a [TypeError] if `name` is not a valid [string].
   */
  module(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._module;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._module = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.module(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.module(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }

  /**
   * @signature signatures()
   * @added v0.1.0
   * @returns Array
   * @description Gets the signatures array.
   *
   * @signature signatures(signaturesArray)
   * @added v0.1.0
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
   * @signature status()
   * @added v0.3.0
   * @returns DocketStatus
   * @description Gets an object containing data about the status of this class.
   *
   * @signature status(status)
   * @added v0.3.0
   * @param status DocketStatus 
   * @throws TypeError if `status` is not a valid [DocketStatus]
   * @description Sets an object containing data about the status of this class.
   */
  status(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._status;
    
    /** Setter */
    else if ( arg1 === null || ( typeof arg1 == 'object' && arg1.constructor.name == 'DocketStatus' ) )
      this._status = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.status(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature updates()
   * @added v0.1.0
   * @updated v0.3.0
   * @returns Array
   * @description Gets an array of the class updates.
   *
   * @signature updates(updatesArray)
   * @added v0.1.0
   * @updated v0.3.0
   * @param updatesArray Array
   * @throws TypeError
   * @description Sets an array of the class updates, throwing a [TypeError] if `updatesArray` is not a valid [Array].
   */
  updates(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._updates;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._updates = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.updates(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.updates(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.DocketClass = DocketClass;
