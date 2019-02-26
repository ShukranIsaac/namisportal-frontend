import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputLabel } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

/**
 * Material-ui customized input: bootstrap
 * 
 * @author Isaac S. Mwakabira
 * 
 */

const styles = theme => ({
  inputFillWhole: {
    width: '100%'
  }
})

const RenderBootstrapField = ({ 
  classes, label, 
  defaultValue, name, 
  type, props, value
}) => {

    return (
      <Fragment>
        <FormControl className={[classes.margin, classes.inputFillWhole]}>
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
            className={classes.inputFillWhole}
          />
        </FormControl>
      </Fragment>
    );

}

RenderBootstrapField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderBootstrapField)