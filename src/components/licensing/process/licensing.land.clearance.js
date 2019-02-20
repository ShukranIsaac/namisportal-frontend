import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import RenderBootstrapField from '../../forms/form.bootstrap.field';
import styles from '../../contact/form.styles';

/**
 * Prefeasibility Study and draft business plan
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const LandClearance = ({ classes, handleChange }) => {

    return (
        <Fragment>
            
            <Field
                name='land_clearance_name'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Name"
                            defaultValue="Land clearance, name..."
                            name="land_clearance_name"
                            type="text"
                            props={ input }
                        />
                    );
                }}
            />

            <Field
                name='land_clearance_summary'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Land Clearance"
                            defaultValue="Land clearance..."
                            name="land_clearance_summary"
                            type="text"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows="10"
            />

            <br/>

        </Fragment>
    );

}

LandClearance.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandClearance);