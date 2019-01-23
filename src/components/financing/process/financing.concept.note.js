import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

            <RenderBootstrapField
                classes={ classes }
                label="Concept Note"
                defaultValue="Add concept note..."
                name="concept_note"
                type="text"
                multiline={true}
                rows="1000"
            />

        </Fragment>
    );

}

ConceptNote.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConceptNote);