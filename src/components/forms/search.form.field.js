import React, { Fragment } from "react";

/**
 * Search input
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {String} placeholder
 * @param {String} name
 * @param {Function} handleChange 
 * 
 * @returns {Object} results
 */
const  SearchInputControl = ({ placeholder, name, handleChange }) => {

    return (
      <Fragment>
        <div className="form-group col-lg-12 col-sm-12">
          <div className="bp3-input-group">
            <span className="bp3-icon bp3-icon-search"></span>
            <input
                className="bp3-input"
                type="search" 
                name={ `${ 'search_' + name}` }
                placeholder={placeholder}
                id={ `${ 'search_' + name}`}
                onChange={ (e) => handleChange(e) } />
          </div>
        </div>
      </Fragment>
    );

}

export default SearchInputControl;