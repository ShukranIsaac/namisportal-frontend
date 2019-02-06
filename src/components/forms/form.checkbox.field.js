import React from 'react';
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
    classes,
    color = 'primary', 
    value, 
    name,
    checked, 
    label, 
    handleChange 
}) => {

    return (
        <FormControlLabel 
            control={
                <Checkbox 
                    checked={ checked }
                    onChange={ (e) => handleChange(e) }
                    value={ value }
                    color={ color } 
                    name={ name }
                    classes={{
                        root: classes.root,
                        checked: classes.checked,
                    }}
                />
            }
            label={ value }
        />
    );

}