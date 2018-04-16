/**
 * @class docket.DocketSignature
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.1.0
 * @updated 0.3.0
 * @updated v0.4.0
 * @description Data model class for storing signature-level docket entries.
 */
class DocketSignature {
  /**
   * @signature new DocketSignature([data])
   * @added v0.1.0
   * @updated v0.3.0
   * @param data Object
   * @returns DocketSignature
   * @description Returns a new [DocketSignature] instance, initializing with any key/value pairs provided in `data` with 
   * keys that match setter method names.
   */
  constructor(data = {}) {
    this.added(data.added || null);
    this.authors(data.authors || []);
    this.class(data.class || '');
    this.description(data.description || '');
    this.name(data.name || '');
    this.module(data.module || '');
    this.params(data.params || []);
    this.returns(data.returns || null);
    this.signature(data.signature || '');
    this.status(data.status || null);
    this.throws(data.throws || []);
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
   * @signature class()
   * @added v0.2.0
   * @returns string
   * @description Gets the class name.
   *
   * @signature class(name)
   * @added v0.2.0
   * @param name string
   * @throws TypeError
   * @description Sets the class name, throwing a [TypeError] if `name` is not a valid [string].
   */
  class(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._class;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._class = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.class(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.class(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature description()
   * @added v0.1.0
   * @returns string
   * @description Gets the description.
   *
   * @signature description(text)
   * @added v0.1.0
   * @param text string
   * @throws TypeError
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
   * @added v0.1.0
   * @returns string
   * @description Gets the name.
   *
   * @signature name(name)
   * @added v0.1.0
   * @param name string
   * @throws TypeError
   * @description Sets the name, throwing a [TypeError] if `name` is not a valid [string].
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
   * @signature params()
   * @added v0.1.0
   * @returns Array
   * @description Gets the params array.
   *
   * @signature params(paramsArray)
   * @added v0.1.0
   * @param paramsArray Array
   * @throws TypeError
   * @description Sets the params array, throwing a [TypeError] if `paramsArray` is not a valid [Array].
   */
  params(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._params;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._params = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.params(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.params(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature returns()
   * @added v0.1.0
   * @updated v0.3.0
   * @returns DocketReturns
   * @description Gets an object containing the return data.
   *
   * @signature returns(data)
   * @added v0.1.0
   * @updated v0.3.0
   * @param data DocketReturns
   * @throws TypeError
   * @description Sets an object containing the return data, throwing a [TypeError] if `data` is not a valid [DocketReturns].
   */
  returns(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._returns;
    
    /** Setter */
    else if ( arg1 === null || ( typeof arg1 == 'object' && arg1.constructor.name == 'DocketReturns' ) )
      this._returns = arg1;
    
    /** Handle errors */
    else
      throw new TypeError(`${this.constructor.name}.returns(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature signature()
   * @added v0.1.0
   * @returns string
   * @description Gets the signature.
   *
   * @signature signature(signature)
   * @added v0.1.0
   * @param signature string
   * @throws TypeError
   * @description Sets the signature, throwing a [TypeError] if `signature` is not a valid [string].
   */
  signature(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._signature;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._signature = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.signature(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.signature(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature status()
   * @added v0.3.0
   * @returns DocketStatus
   * @description Gets an object containing data about the status of this signature.
   *
   * @signature status(status)
   * @added v0.3.0
   * @param status DocketStatus 
   * @throws TypeError if `status` is not a valid [DocketStatus]
   * @description Sets an object containing data about the status of this signature.
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
   * @signature throws()
   * @added v0.3.0
   * @returns Array
   * @description Gets the throws array.
   *
   * @signature throws(throwsArray)
   * @added v0.3.0
   * @param throwsArray Array
   * @throws TypeError
   * @description Sets the throws array, throwing a [TypeError] if `throwsArray` is not a valid [Array].
   */
  throws(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._throws;
    
    /** Setter */
    else if ( typeof arg1 == 'object' && arg1.constructor.name == 'Array' )
      this._throws = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.throws(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.throws(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
  
  /**
   * @signature updates()
   * @added v0.1.0
   * @updated v0.3.0
   * @returns Array
   * @description Gets an array of the signature updates.
   *
   * @signature updates(updatesArray)
   * @added v0.1.0
   * @updated v0.3.0
   * @param updatesArray Array
   * @throws TypeError
   * @description Sets an array of the signature updates, throwing a [TypeError] if `updatesArray` is not a valid [Array].
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

module.exports.DocketSignature = DocketSignature;
