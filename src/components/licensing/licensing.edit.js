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
class EditLicensingStep extends Component {

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
        const { subcategory, category } = this.props;
        // authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            if(values !== null && values !== undefined) {
                // define sub-category structure
                const _sub_category = {
                    name: values.name,
                    shortName: values.shortName,
                    about: values.summary,
                }

                if (subcategory !== null && subcategory !== undefined) {
                    // console.log(sub_category)
                    this.props.editCategory(subcategory._id, _sub_category, user.token, category);
                    // then change state to default
                    // so that the page redirects and list all licensing items
                    this.props.defaultItem();
                }
            }

        }

    }

    /**
     * Delete category
     */
    archiveCategory = (event) => {
        event.preventDefault();
        // props holds state functions like defaultItem(), saveItem() etc 
        const { subcategory } = this.props;
        // if subcategory exists then delete
        if(subcategory !== null && subcategory._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(subcategory, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }
        }

    }

    render() {

        // props
        const { 
            classes, handleClick, handleSubmit, 
            valid, pristine, submitting, 
            subcategory, general, //handleLink
        } = this.props;

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

                    {
                        general && (
                            !general.isLoading ? (
                                subcategory !== null ? (
                                    <Fragment>
                                        <FormTextInputField 
                                            classes={ classes }
                                            name='name'
                                            label="Name"
                                            value={ subcategory.name }
                                            placeholder="Enter license process step..."
                                            type="text"
                                        />

                                        <FormTextInputField
                                            classes={ classes } 
                                            name="shortName"
                                            value={ subcategory.shortName }
                                            label="Shortname"
                                            placeholder="Enter license process step shortname..."
                                            type="text"
                                        />

                                        <FormTextInputField 
                                            classes={ classes }
                                            name='summary'
                                            label="Summary Text"
                                            value={ subcategory.about }
                                            placeholder="Enter license process summary..."
                                            type="text"
                                            multiline={ true }
                                            rows="10"
                                        />
                                    </Fragment>
                                ) : null
                            ) : <div className="loader" />
                        )
                    }

                    <Button 
                        type="submit" 
                        disabled={!valid || pristine || submitting} 
                        intent="success" 
                        text="Update" 
                    />

                    <Button 
                        className={ classes.margin }
                        intent="danger" text="Archive" 
                        onClick={ (e) => this.archiveCategory(e) } 
                    />
                    
                    <Button
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

EditLicensingStep.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: "editLicenseStep",
    Validate,
    AsyncValidate,
})(withStyles(styles)(EditLicensingStep));