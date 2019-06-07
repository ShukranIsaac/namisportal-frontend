import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, } from '@blueprintjs/core';
// import { Row, Col } from 'reactstrap';
import { UserProfile, profile } from '../user/user.profile';

// get the logged in user
const user = UserProfile.get();

/**
 * List all GIS features and stats
 * 
 * @author Isaac S. Mwakabira
 */
export const GisFeatures = withStyles(styles)(({
    handleClick, 
    classes, 
    general,
}) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Features"
                name="create"
                handleClick={e => handleClick(e) }
                disabled={ !profile.canWrite({ user }) }
            />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <Divider />

            <div className='app-sections' style={{ marginTop: '-53px' }}>
                Features
            </div>
            
        </Fragment>
    )

});

GisFeatures.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default GisFeatures;