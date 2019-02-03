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
const PrefeasibilityStudy = ({ classes, handleChange }) => {

    return (
        <Fragment>
            
            <Field
                name='prefeasibility_study'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Prefeasibility Study and draft business plan"
                            defaultValue="Add Prefeasibility Study and draft business plan..."
                            name="prefeasibility_study"
                            type="text"
                            multiline={true}
                            rows="1000"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows={20}
            />

            <br/>

        </Fragment>
    );

}

PrefeasibilityStudy.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PrefeasibilityStudy);