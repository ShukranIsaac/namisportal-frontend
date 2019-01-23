import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
            
            <RenderBootstrapField
                classes={ classes }
                label="Prefeasibility Study and draft business plan"
                defaultValue="Add Prefeasibility Study and draft business plan..."
                name="prefeasibility_study"
                type="text"
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

export default withStyles(styles)(PrefeasibilityStudy);