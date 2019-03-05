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
class EditDirectoryInstitution extends Component {

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
        const { stakeholder } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {
            
            let edited_stakeholder;
            if(values !== null && values !== undefined) {
                
                // stakeholder structure
                edited_stakeholder = {
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
                
                // then edit this stakeholder
                this.props.editStakeholder(stakeholder._id, edited_stakeholder, user.token);
                // then change state to default
                // so that the page redirects and list all diretory stakeholders
                this.props.defaultItem();
            }

        } 

    }

    render() {

        const { 
            classes, stakeholder, handleClick, handleSubmit,
            valid, pristine, submitting
        } = this.props;

        console.log(this.props.stakeholder)
        /**
         * If the stakeholder is not defined and has no data just return loader.
         */
        if(stakeholder !== null && stakeholder !== undefined)  {

            return (
                <Fragment>
    
                    <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off" >
                        
                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="List Stakeholders"
                            name="default"
                            handleClick={e => handleClick(e) }
                        />
                        
                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="New Stakeholder"
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
                            name='stakeholder_name'
                            component={ input => {
                                return (
                                    <RenderBootstrapField
                                        classes={ classes }
                                        label='Stakeholders or Department Name (Legal)'
                                        defaultValue="Edit stakeholder name..."
                                        value={ stakeholder.name }
                                        name="stakeholder_name"
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
                                        defaultValue= "Stakeholder's physical address..."
                                        value={ stakeholder.contacts.address }
                                        name="physical_address"
                                        type="text"
                                    />
                                )
                            }} 
                            multiline={true}
                        />
    
                        <Field 
                            name="telephone" 
                            component={input => {
                                return (
                                    <RenderBootstrapField
                                        classes={ classes }
                                        props={ input }
                                        label='Telephone'
                                        defaultValue= "Stakeholder's or department's telephone number..."
                                        value={ stakeholder.contacts.telephone }
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
                                        defaultValue= "Stakeholder's or department's website..."
                                        value={ stakeholder.contacts.website }
                                        name="webite"
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
                                        label={ `${ stakeholder.name + '-Background' }` }
                                        defaultValue="Edit stakeholders summary..."
                                        value={ stakeholder.about }
                                        name="summary"
                                        type="text"
                                        props={ input }
                                    />
                                );
                            }}
                            multiline={true}
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
                                        defaultValue= "Stakeholder's or department's email address..."
                                        value={ stakeholder.contacts.email }
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
                                        defaultValue="Edit stakeholders vision..."
                                        value={ stakeholder.vision }
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
                                        value={ stakeholder.mission }
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
    
                        <Button className={ classes.margin } name="default"  intent="danger" text="Archive" onClick={ e => this.handleClick } />
                    
                    </form>
    
                </Fragment>
            );
    
        } else {

            return <div className="loader" />;

        }
    }

}

EditDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editStakeholder',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditDirectoryInstitution));