import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import RenderBootstrapField from '../../forms/form.bootstrap.field';
import AsyncValidate from '../../contact/form.async-validate';
import Validate from '../../contact/email.validate';

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

            <RenderBootstrapField
                classes={ classes }
                label="Concept Note"
                defaultValue="Add concept note..."
                name="concept_note"
                type="text"
                component="input"
                multiline={true}
                rows="1000"
            />

        </Fragment>
    );

}

ConceptNote.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: `conceptNote`,
    Validate,
    AsyncValidate
})(withStyles(styles)(ConceptNote));