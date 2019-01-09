import React, { Fragment } from 'react';

const FormTextInputField = ({ value, placeholder, name, id, type, handleChange }) => {

    return (
        <Fragment>

            <input
                id={id}
                name={name}
                value={value}
                className="bp3-input bp3-fill bp3-large" 
                type={type} 
                placeholder={placeholder} 
                dir="auto"
                onChange={ (e) => handleChange(e) } 
            />

        </Fragment>
    );

}

export default FormTextInputField;