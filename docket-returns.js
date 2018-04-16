/**
 * @class docket.DocketReturns
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.3.0
 * @description Data model class for storing method and function signature return details.
 */
class DocketReturns {
  /**
   * @signature new DocketReturns([data])
   * @added v0.3.0
   * @param data Object
   * @returns DocketReturns
   * @description Returns a new [DocketReturns] instance, initializing with any key/value pairs provided in `data` with keys 
   * that match setter method names.
   */
  constructor(data = {}) {
    this.description(data.description || '');
    this.type(data.type || '');
  }
  
  /**
   * @signature description()
   * @added v0.3.0
   * @returns string
   * @description Gets the parameter description.
   *
   * @signature description(text)
   * @added v0.3.0
   * @param text string
   * @throws TypeError
   * @description Sets the parameter description, throwing a [TypeError] if `text` is not a valid [string].
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
   * @signature type()
   * @added v0.3.0
   * @returns string
   * @description Gets the parameter type.
   *
   * @signature type(type)
   * @added v0.3.0
   * @param type string
   * @throws TypeError
   * @description Sets the parameter type, throwing a [TypeError] if `type` is not a valid [string].
   */
  type(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._type;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._type = arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.type(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.type(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.DocketReturns = DocketReturns;
