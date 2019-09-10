import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';
import PropTypes from 'prop-types';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Create new licensing step
 * 
 * @author Isaac S. Mwakabira
 */
class CreateLicensingStep extends Component {

    constructor() {
        super();
        this.state = {}

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

	/**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange = (event) => {
        
        this.setState({[event.target.name]: event.target.value});
  
    }

    handleSubmit = (values) => {
        
        // get category
        const { maincategory } = this.props;
        // authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            if(values !== null && values !== undefined) {
                // define sub-category structure
                const sub_category = {
                    name: values.name,
                    shortName: values.shortName,
                    about: values.summary,
                }

                if (maincategory !== null && maincategory !== undefined) {
                    // console.log(sub_category)
                    this.props.createCategory(maincategory._id, sub_category, user.token);
                    // then change state to default
                    // so that the page redirects and list all licensing items
                    this.props.defaultItem();
                }
            }

        }

    }

    render() {

        // props
        const { classes, handleClick, handleSubmit, valid, pristine, submitting } = this.props;

        return (
            <Fragment>
                <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Steps"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <FormTextInputField 
                        classes={ classes }
                        name='name'
                        label="Name"
                        placeholder="Enter license process step..."
                        type="text"
                    />

                    <FormTextInputField
                        classes={ classes } 
                        name="shortName"
                        label="Shortname"
                        placeholder="Enter license process step shortname..."
                        type="text"
                    />

                    <FormTextInputField 
                        classes={ classes }
                        name='summary'
                        label="Summary Text"
                        placeholder="Enter license process summary..."
                        type="text"
                        multiline={ true }
                        rows="10"
                    />

                    <div className={ classes.margin } />

                    <Button 
                        type="submit" 
                        disabled={!valid || pristine || submitting} 
                        intent="success" 
                        text="Save" 
                    />
                    
                    <Button 
                        className={ classes.margin } 
                        name="default" 
                        intent="primary" 
                        text="Cancel" 
                        onClick={ e => handleClick(e) } 
                    /> 

                </form>
            </Fragment>
        );

    }

}

CreateLicensingStep.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: "createLicenseStep",
    Validate,
    AsyncValidate,
})(withStyles(styles)(CreateLicensingStep));