import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputLabel } from '@material-ui/core';

/**
 * Material-ui customized input: bootstrap
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const RenderBootstrapField = ({ 
  classes, label, 
  defaultValue, name, 
  type, props, value
}) => {

    return (
      <Fragment>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            {label}
          </InputLabel>
          <InputBase
            id={ `${name + defaultValue}` }
            name={name}
            placeholder={defaultValue}
            type={type}
            value={props.input.value || value}
            onChange={(e) => props.input.onChange(e)}
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
            {...props}
          />
        </FormControl>
      </Fragment>
    );

}

export default RenderBootstrapField;
