import React, { Fragment } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

/**
 * Generic single check box
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {String} color 
 * @param {String} value 
 * @param {Function} handleChange
 * @param {Boolean} checked  
 * 
 * @returns {FormControlLabel} checkbox
 */
export const FormCheckboxControl = ({ 
    color = 'primary', 
    value, 
    checked, 
    label, 
    handleChange 
}) => {

    return (
        <Fragment>
            <FormControlLabel 
                control={
                    <Checkbox 
                        checked={ checked }
                        onChange={ (e) => handleChange(e) }
                        value={ value }
                        color={ color }
                    />
                }
                label={ label }
            />
        </Fragment>
    );

}