import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

const RenderBootstrapField = ({classes, label, defaultValue, name, type, onChange}) => {

    return (
      <>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            {label}
          </InputLabel>
          <InputBase
            id={ `${name + defaultValue}` }
            name={name}
            placeholder={defaultValue}
            type={type}
            onChange={ (e) => onChange(e) }
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
          />
        </FormControl>
      </>
    );

}

export default RenderBootstrapField;