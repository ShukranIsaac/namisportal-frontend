import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import RenderBootstrapField from '../../forms/form.bootstrap.field';

import styles from '../../contact/form.styles';
import { MuiFormFileinputField } from '../../forms/form.fileinput.field';

/**
 * Concept note appraisal
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const EnvironmentalClearance = ({ classes, handleChange }) => {

    return (
        <Fragment>

            <Field
                name='environmental_name'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Name"
                            defaultValue="Environmental clearance name..."
                            name="environmental_name"
                            type="text"
                            props={ input }
                        />
                    );
                }}
            />

            <Field
                name='environmental'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Summary"
                            defaultValue="Environmental clearance..."
                            name="environmental"
                            type="text"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows="10"
            />

            <br/>

            <MuiFormFileinputField
                id="pdf_document"
                placeholder="Supporting documents"
                handleInputChange={ (e) => handleChange(e) }
                classes={ classes }
            />

            <div className={ classes.margin } />
            <div className={ classes.margin } />
            <div className={ classes.margin } />

        </Fragment>
    );

}

EnvironmentalClearance.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EnvironmentalClearance);