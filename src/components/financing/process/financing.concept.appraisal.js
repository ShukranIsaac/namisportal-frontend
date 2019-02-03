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
const ConceptNoteAppraisal = ({ classes, handleChange }) => {

    return (
        <Fragment>
            
            <Field
                name='concept_note_appraisal'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Concept Note Appraisal"
                            defaultValue="Add concept note appraisal..."
                            name="concept_note_appraisal"
                            type="text"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows={20}
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

ConceptNoteAppraisal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ConceptNoteAppraisal);