import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import RenderBootstrapField from '../../forms/form.bootstrap.field';

import styles from '../../contact/form.styles';
// import { MuiFormFileinputField } from '../../forms/form.fileinput.field';

/**
 * Concept note
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const BusinessEntity = ({ classes, handleChange }) => {

    return (
        <Fragment>

            <Field
                name='name'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Name"
                            defaultValue="Bussiness entity..."
                            name="name"
                            type="text"
                            props={ input }
                        />
                    );
                }}
            />

            <Field
                name='business'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Business Entity"
                            defaultValue="Business entity summary..."
                            name="business"
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

BusinessEntity.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BusinessEntity);