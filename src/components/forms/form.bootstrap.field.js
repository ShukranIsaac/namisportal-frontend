import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
// import InputBase from '@material-ui/core/InputBase';
// import InputLabel from '@material-ui/core/InputLabel';
import { Field  } from 'redux-form';

const RenderBootstrapField = ({ 
  classes, label, rows, 
  defaultValue, value, name, 
  type, component, multiline, onChange,
  touched, error, warning
}) => {

    return (
      <Fragment>
        <FormControl className={classes.margin}>
          {/* <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            {label}
          </InputLabel> */}
          <label className={classes.bootstrapFormLabel}>
            { label }
          </label>
          <Field 
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
          />
          {
            touched && 
            ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))
          }
          {/* <InputBase
            id={ `${name + defaultValue}` }
            name={name}
            placeholder={defaultValue}
            type={type}
            value={value}
            onChange={ (e) => onChange(e) }
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
            multiline={multiline}
            rowsMax={rows}
          /> */}
        </FormControl>
      </Fragment>
    );

}

export default RenderBootstrapField;
