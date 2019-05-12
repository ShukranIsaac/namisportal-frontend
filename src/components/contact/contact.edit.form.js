import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm, Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditContactDetails extends Component {

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
        
        const target = event.target;
        // console.log(target);
        this.setState({ [target.name]: target === 'checked' ? target.checked : target.value });
  
    }

    handleSubmit = (values) => {
        // stakeholder to be edited
        const { contact } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {
            
            let edited_contact;
            if(values !== null && values !== undefined) {
                
                // contacts structure
                edited_contact = {
                    name: values.stakeholder_name,
                    about: values.summary,
                    mission: values.mission,
                    vision: values.vision,
                    contacts: {
                        email: values.email,
                        telephone: values.telephone,
                        website: values.website,
                        address: values.address
                    }
                }
                
                // then edit this contact
                this.props.editContacts(contact._id, edited_contact, user.token);
                // then change state to default
                // so that the page redirects and list contacts
                this.props.defaultItem();
            }

        } 

    }

    render() {

        const { 
            classes, stakeholder, handleClick, handleSubmit,
            valid, pristine, submitting
        } = this.props;

        // console.log(this.props.stakeholder)
        /**
         * If the stakeholder is not defined and has no data just return loader.
         */
        if(stakeholder === null && stakeholder === undefined) {
            return <div className="loader" />;
        }
        
        return (
            <Fragment>

                <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off" >
                    
                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Contacts"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />
                    
                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Contact"
                        name="create"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <Field
                        name='contact_name'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label='Department Name'
                                    defaultValue="Edit contact name..."
                                    // value={ stakeholder !== null && stakeholder.name }
                                    name="contact_name"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                    />

                    <Field 
                        name="physical_address" 
                        component={input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    props={ input }
                                    label='Physical Address'
                                    defaultValue= "Department's physical address..."
                                    // value={ stakeholder !== null && stakeholder.contacts.address }
                                    name="physical_address"
                                    type="text"
                                />
                            )
                        }} 
                        multiline={true}
                        rows='5'
                    />

                    <Field 
                        name="telephone" 
                        component={input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    props={ input }
                                    label='Telephone'
                                    defaultValue= "Department's telephone number..."
                                    // value={ stakeholder !== null && stakeholder.contacts.telephone }
                                    name="telephone"
                                    type="text"
                                />
                            )
                        }} 
                    />

                    <Field 
                        name="website" 
                        component={input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    props={ input }
                                    label='Website'
                                    defaultValue= "Department's website..."
                                    // value={ stakeholder !== null && stakeholder.contacts.website }
                                    name="website"
                                    type="text"
                                />
                            )
                        }} 
                    />

                    <Field
                        name='summary'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label={ 'About' }
                                    defaultValue="Edit department's contact about..."
                                    // value={ stakeholder !== null && stakeholder.about }
                                    name="summary"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                        multiline={true}
                        rows='5'
                    />

                    {/* <br/> */}

                    <Field 
                        name="email" 
                        component={input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    props={ input }
                                    label='Email'
                                    defaultValue= "Department's email address..."
                                    // value={ stakeholder !== null && stakeholder.contacts.email }
                                    name="email"
                                    type="email"
                                />
                            )
                        }} 
                    />
                    
                    {/* <br/> */}

                    <Field
                        name='vision'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label="Vision"
                                    defaultValue="Edit department vision..."
                                    // value={ stakeholder !== null && stakeholder.vision }
                                    name="vision"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                        multiline={true}
                        rows="10"
                    />

                    <Field
                        name='mission'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label='Mission Statement'
                                    defaultValue="Edit mission statement..."
                                    // value={ stakeholder !== null && stakeholder.mission }
                                    name="mission"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                        multiline={true}
                        rows="10"
                    />

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <Button type="submit" disabled={!valid  || pristine || submitting} intent="primary" text="Save" />

                    <Button className={ classes.margin } name="default"  intent="primary" text="Cancel" onClick={ e => handleClick(e) } />
                
                </form>

            </Fragment>
        );

    }

}

EditContactDetails.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createContact',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditContactDetails));