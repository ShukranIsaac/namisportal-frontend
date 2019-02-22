import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { FileInput } from '@blueprintjs/core';
// import { Button } from '@material-ui/core';
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
    handleFileChange,
    classes
}) => {

    return (
        <Fragment>
            <CloudUploadIcon />
            <Field name={ name } type={ type } component={ FileUpload } />
        </Fragment>
    );

}

export const FileUpload = ({ input, resetKey }) => {

	const { value, ...inputProps } = input

	const handleChange = (e) => {
		input.onChange(e.target.files[0])
	}

	return <input name="supporting_document" {...inputProps} key={resetKey} type="file" onChange={handleChange} />

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