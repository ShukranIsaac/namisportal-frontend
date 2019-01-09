import React, { Fragment } from "react";
import { TextArea, Intent } from "@blueprintjs/core";

const FormTextareaField = ({ value, placeholder, name, id, handleChange }) => {

    return (
        <Fragment>

            <TextArea 
                id={id} 
                name={name}
                placeholder={placeholder} 
                onChange={ (e) => handleChange(e) }
                value={value}
                large={true}
                intent={Intent.PRIMARY}
                className="bp3-fill"
            />

        </Fragment>
    );

}

export default FormTextareaField;