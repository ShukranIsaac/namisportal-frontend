import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';

import MultiStepForm from '../forms/form.multistep';
import { BusinessEntity, EnvironmentalClearance } from './process';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for a license.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class LicensingProcess extends Component {

    /**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange= (event) => {

        this.setState({ [event.target.name]: event.target !== 'value' ? event.target.files : event.target.value });
        // console.log(this.state)
    }

    handleSubmit = (values) => {
        // category under which this subcategory should 
        // be uploaded to
        const { subcategory } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            let sub_category;
            if(values !== null && values !== undefined) {
                // define sub-category structure
                sub_category = {
                    name: values.subcategory,
                    about: values.about
                }

                // console.log(sub_category)
                // console.log(subcategory)
                this.props.createCategory(subcategory._id, sub_category , user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }

        } 
        
    }

    /**
     * Actual components on each step
     */
    components = [
        { 'component': <BusinessEntity /> },
        { 'component': <EnvironmentalClearance /> },
    ];

    render() {

        const { classes, handleClick, handleSubmit } = this.props;

        return (
            <Fragment>
                <div >

                    <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) }>

                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="New SubCategory"
                            name="create"
                            handleClick={e => handleClick(e) }
                        />

                        <div className={ classes.margin }/>
                        <div className={ classes.margin }/>
                        <div className={ classes.margin }/>
                        <div className={ classes.margin }/>
                        <div className={ classes.margin }/>

                        <Divider />

                        <MultiStepForm 
                            steps={ steps } { ...this.props }
                            handleChange={ this.handleChange } 
                            components={ this.components }
                        />

                        <div className={ classes.margin } />
                        <div className={ classes.margin } />
                        <div className={ classes.margin } />

                    </form>
    
                </div>
            </Fragment>
        );

    }

}

const steps = [
    {name: 'Business Entity', },
    {name: 'Environmental Clearance', },
    {name: 'Land Clearance', },
    {name: 'Minigrid Licence', },
];

LicensingProcess.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createLicensing',
    Validate,
    AsyncValidate
})(withStyles(styles)(LicensingProcess));