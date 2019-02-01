import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
// import { Field  } from 'redux-form';
import { InputBase, InputLabel } from '@material-ui/core';

const RenderBootstrapField = ({ 
  classes, label, rows, 
  defaultValue, value, name, 
  type, multiline, props
}) => {

    return (
      <Fragment>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            {label}
          </InputLabel>
          {/* <label className={classes.bootstrapFormLabel}>
            { label }
          </label> */}
          {/* <Field 
            name={name}
            placeholder={defaultValue}
            type={type}
            value={value}
            onChange={ (e) => onChange(e) }
            component={component}
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
          /> */}
          <InputBase
            id={ `${name + defaultValue}` }
            name={name}
            placeholder={defaultValue}
            type={type}
            value={props.input.value}
            onChange={(e) => props.input.onChange(e)}
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
            multiline={multiline}
            rowsMax={rows}
            {...props}
          />
        </FormControl>
      </Fragment>
    );

}

export default RenderBootstrapField;
