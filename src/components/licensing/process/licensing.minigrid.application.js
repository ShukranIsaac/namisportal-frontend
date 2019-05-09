import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RenderBootstrapField from '../../forms/form.bootstrap.field';
import styles from '../../contact/form.styles';

/**
 * Grant application
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const MinigridLicensingApplication = ({ classes }) => {

    return (
        <Fragment>
            
            <Field
                name='minigrid_application'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Name"
                            defaultValue="Name..."
                            name="minigrid_application"
                            type="text"
                            props={ input }
                        />
                    );
                }}
            />

            <Field
                name='minigrid_application_summary'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Obtaining Minigrid License"
                            defaultValue="Obtaining Minigrid License..."
                            name="minigrid_application_summary"
                            type="text"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows="10"
            />

        </Fragment>
    );

}

MinigridLicensingApplication.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MinigridLicensingApplication);