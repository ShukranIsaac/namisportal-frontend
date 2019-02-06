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
const ConceptNote = ({ classes, handleChange }) => {

    return (
        <Fragment>

            <Field
                name='concept_note'
                component={ input => {
                    return (
                        <RenderBootstrapField
                            classes={ classes }
                            label="Concept Note"
                            defaultValue="Add concept note..."
                            name="concept_note"
                            type="text"
                            multiline={true}
                            rows="20"
                            props={ input }
                        />
                    );
                }}
                multiline={true}
                rows={20}
            />

        </Fragment>
    );

}

ConceptNote.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConceptNote);