import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { FileInput } from '@blueprintjs/core';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    handleInputChange,
    classes
}) => {

    return (
        <Fragment>
            <Field
                name='supporting_documents'
                type={ type }
                component={ input => {
                    return (
                        <Button 
                            variant="contained" 
                            color="default" 
                            className={classes.button} 
                            component="label"
                        >
                            { placeholder }
                            <input 
                                name='supporting_documents'
                                id={id}
                                type={type} 
                                disabled={disabled}
                                style={{ display: "none" }} 
                                onInput={ (e) => handleInputChange(e) }
                                { ...input }
                            />
                            <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                    );
                }}
            />
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