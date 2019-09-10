import React, { Fragment } from "react";
import { TextArea, Intent } from "@blueprintjs/core";

const FormTextareaField = ({ value, placeholder, name, id, handleChange }) => {

    return (
        <Fragment>

            <TextArea
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                value={value}
                large={true}
                intent={Intent.PRIMARY}
                className="bp3-fill"
            />

        </Fragment>
    );

}

export const BootsrapTextareaField = ({
    name,
    placeholder,
    label,
    handleChange,
    value,
    rows
}) => {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea 
                className="form-control" 
                name={name}
                value={value}
                id={name} 
                rows={rows} 
                placeholder={placeholder} 
                onChange={(e) => handleChange(e)}
            />
        </>
    );

}

export default FormTextareaField;