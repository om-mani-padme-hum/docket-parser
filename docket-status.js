/**
 * @class docket.DocketStatus
 * @author Rich Lowe
 * @copyright 2018 Rich Lowe
 * @added v0.3.0
 * @description Data model class for storing module, class, or signature status details.
 */
class DocketStatus {
  /**
   * @signature new DocketStatus([data])
   * @added v0.3.0
   * @param data Object
   * @returns DocketStatus
   * @description Returns a new [DocketStatus] instance, initializing with any key/value pairs provided in `data` with keys 
   * that match setter method names.
   */
  constructor(data = {}) {
    this.description(data.description || '');
    this.status(data.status || '');
  }
  
  /**
   * @signature color()
   * @added v0.3.0
   * @throws RangeError if status is invalid or has not been set.
   * @returns string 
   * @description Returns the appropriate class name based on the status: success for stable, danger, for deprecated, warning
   * for experimental.
   */
  color() {
    /** Getter */
    if ( this.status() == 'stable' )
      return 'success';
    else if ( this.status() == 'experimental' )
      return 'warning';
    else if ( this.status() == 'deprecated' )
      return 'danger';
    
    throw new RangeError(`${this.constructor.name}.color(): Status is invalid or has not been set.`);
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
   * @signature status()
   * @added v0.3.0
   * @returns string
   * @description Gets the status.
   *
   * @signature status(capitalized)
   * @added v0.3.0
   * @param capitalized boolean
   * @returns string
   * @description Gets a capitalized version of the status.
   *
   * @signature status(status)
   * @added v0.3.0
   * @param status string Can be 'stable', 'experimental', or 'deprecated'
   * @throws TypeError
   * @description Sets the status, throwing a [TypeError] if `status` is not a valid [string].
   */
  status(arg1) {
    /** Getter */
    if ( arg1 === undefined )
      return this._status;
    if ( typeof arg1 == 'boolean' )
      return `${this._status[0].toUpperCase()}${this._status.slice(1)}`;
    
    /** Setter */
    else if ( typeof arg1 == 'string' )
      this._status= arg1;
    
    /** Handle errors */
    else if ( arg1 === null )
      throw new TypeError(`${this.constructor.name}.status(null): Invalid signature.`);
    else
      throw new TypeError(`${this.constructor.name}.status(${typeof arg1}[${arg1.constructor.name}]): Invalid signature.`);
  }
}

module.exports.DocketStatus = DocketStatus;
