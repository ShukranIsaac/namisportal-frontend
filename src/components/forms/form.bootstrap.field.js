import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    classes, label, defaultValue, name,
    type, value, props, meta
}) => {

    return (
        <FormControl className={classNames(classes.margin, classes.inputFillWhole)}>
            <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}> {label} </InputLabel>
            <InputBase
                id={`${name + defaultValue}`}
                name={name}
                placeholder={defaultValue}
                value={props.input.value || value}
                type={type}
                onChange={(e) => props.input.onChange(e)}
                classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,
                }}
                {...props}
                className={classes.inputFillWhole}
            />
        </FormControl>
    );

}

RenderBootstrapField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderBootstrapField)

export const BootsrapTextField = ({
    name,
    type,
    value,
    placeholder,
    label,
    handleChange,
    helper,
    id
}) => {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                required 
                name={name} 
                type={type} 
                id={id} 
                value={value}
                placeholder={placeholder} 
                className="form-control"
                onChange={ (e) => handleChange(e) } 
                aria-describedby= { 
                    helper ? `${ name }Helper` : `${ name }` 
                }
            />
            { helper && <small id="usernameHelper" className="form-text text-muted danger">Fill out required field!</small> }
        </>
    );

}