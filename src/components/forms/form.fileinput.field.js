import React, { Fragment } from 'react';
import { FileInput } from '@blueprintjs/core';
import { Button } from '@material-ui/core';

/**
 * @author Isaac S. Mwakabira
 * 
 * @param {Boolean} disabled
 * @param {Type} type 
 * @param {String} id
 * @param {String} name
 * @param {String} placeholder
 * @param {Function} handleInputChange
 * 
 * @returns {Fragment} button
 */
export const MuiFormFileinputField = ({ 
    disabled = false, 
    type = 'file', 
    id,
    name,
    placeholder, 
    handleInputChange 
}) => {

    return (
        <Fragment>
            <Button variant="" component="label">
                { placeholder }
                <input 
                    id={id}
                    type={type} 
                    disabled={disabled}
                    style={{ display: "none" }} 
                    onInput={ (e) => handleInputChange(e) }
                />
            </Button>
        </Fragment>
    );

}

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