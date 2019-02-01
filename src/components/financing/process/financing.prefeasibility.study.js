import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import RenderBootstrapField from '../../forms/form.bootstrap.field';
import AsyncValidate from '../../contact/form.async-validate';
import Validate from '../../contact/email.validate';
import styles from '../../contact/form.styles';

/**
 * Prefeasibility Study and draft business plan
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const PrefeasibilityStudy = ({ classes, handleChange }) => {

    return (
        <Fragment>
            
            <RenderBootstrapField
                classes={ classes }
                label="Prefeasibility Study and draft business plan"
                defaultValue="Add Prefeasibility Study and draft business plan..."
                name="prefeasibility_study"
                type="text"
                component="textarea"
                multiline={true}
                rows="1000"
            />

            <br/>

        </Fragment>
    );

}

PrefeasibilityStudy.propTypes = {
    classes: PropTypes.object.isRequired
}

export default reduxForm({
    form: 'prefeasibilityStudy',
    Validate,
    AsyncValidate
})(withStyles(styles)(PrefeasibilityStudy));