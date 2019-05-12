import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

/**
 * Select multiple options
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Object} classes
 * @param {Array} options
 * @param {Function} handleChangeMultiple
 * @param {String} state
 * @returns component
 */
const FormSelectMultiple = ({ classes, options, handleChangeMultiple, state }) => {

    return (
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="select-multiple-native">
            Select Stakeholder Type(s)
          </InputLabel>
          <Select
            multiple
            native
            value={state.name}
            onClick={handleChangeMultiple}
            inputProps={{
              id: 'select-multiple-native',
            }}
            name="stakeholder_type"
          >
            {
                options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
          </Select>
        </FormControl>
    );

}

export default FormSelectMultiple;