import React, { Fragment } from 'react';
import { FileInput } from '@blueprintjs/core';

const FormFileinputField = ({ 
    disabled = false, 
    type = 'file', 
    id,
    name,
    placeholder, 
    handleInputChange 
}) => {

    return (
        <Fragment>

            <FileInput 
                id={id}
                name={name}
                disabled={disabled} 
                text={placeholder} 
                type={type}
                onInputChange={ (e) => handleInputChange(e) }
                className="bp3-small"
            />

        </Fragment>
    );

}

export default FormFileinputField;