import React, { Fragment } from 'react';
import { FileInput } from '@blueprintjs/core';
// import { Button } from '@material-ui/core';
import { Field } from 'redux-form';
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
    disabled,
    type = "file",
    name,
    placeholder,
    handleFileChange
}) => {

    return (
        <>
            <CloudUploadIcon />
            <label htmlFor="pdf_document">{placeholder}</label>
            <input
                disabled={disabled}
                type={type}
                name={name}
                className="form-control-file"
                onChange={(e) => handleFileChange(e)}
            />
        </>
    );

}

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
export const DefaultMuiFormFileinputField = ({
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
            <Field
                name={name}
                placeholder={placeholder}
                type={type}
                component={FileUpload}
            />
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

export const ImageUpload = ({ input, resetKey }) => {

    const { value, ...inputProps } = input

    const handleChange = (e) => {
        input.onChange(e.target.files[0])
    }

    return <input name="image" {...inputProps} key={resetKey} alt="image" type="image" onChange={handleChange} />

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
                onInputChange={(e) => handleInputChange(e)}
                className="bp3-small"
            />

        </Fragment>
    );

}

export default FormFileinputField;