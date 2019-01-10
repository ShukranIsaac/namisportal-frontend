import React, { Fragment } from "react";

const  SearchInputControl = ({ placeholder, name, handleChange }) => {

    return <>
      <Fragment>
        <div className="form-group row" style={{ margin: '15px' }}>
          <div className="bp3-input-group">
            <span className="bp3-icon bp3-icon-search"></span>
            <input
                className="bp3-input"
                type="search" 
                name={ `${ 'search_' + name}` }
                placeholder={placeholder}
                id={ `${ 'search_' + name}`}
                onChange={ (e) => { handleChange(e) } } />
          </div>
        </div>
      </Fragment>
    </>

}

export default SearchInputControl;