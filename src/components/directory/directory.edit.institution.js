import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';

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
                    image: values.image,
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
                
                // console.log(edited_stakeholder);
                // then edit this stakeholder
                this.props.editStakeholder(stakeholder._id, edited_stakeholder, user.token);
                // then change state to default
                // so that the page redirects and list all diretory stakeholders
                this.props.defaultItem();
            }

        } 

    }

    uploadLogo = (values) => {
        // stakeholder to be edited
        const { stakeholder } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            // logo object
            let logo;
            if(values !== null && values !== undefined) {
                // stakeholder structure
                logo = {
                    image: values.image,
                }

                // then upload logo for this stakeholder
                this.props.uploadStakeholderLogo(stakeholder._id, logo, user.token);
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

        /**
         * If the stakeholder is not defined and has no data just return loader.
         */
        if(stakeholder !== null && stakeholder !== undefined)  {

            return (
                <Fragment>

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

                    <ul class="nav nav-tabs" role="tablist" style={{ marginTop: `5px` }}>
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#stakeholder">Stakeholder</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#logo">AddLogo</a>
                        </li>
                    </ul>

                    <div class="tab-content">

                        <div id="stakeholder" class="tab-pane active"><br />

                            <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">
    
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>

                                <Divider />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='stakeholder_name' 
                                    value={ stakeholder.name }
                                    label="Stakeholder's Name (Legal)"
                                    placeholder="Edit stakeholder name..."
                                    type="text"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='physical_address' 
                                    value={ stakeholder.address }
                                    label="Physical Address"
                                    placeholder="Stakeholder's physical address..."
                                    type="text"
                                    multiline={true}
                                    rows="3"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='telephone' 
                                    value={ stakeholder.contacts.telephone }
                                    label="Telephone"
                                    placeholder="Stakeholder's telephone number..."
                                    type="text"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='website' 
                                    value={ stakeholder.contacts.website }
                                    label="Website"
                                    placeholder="Stakeholder's website..."
                                    type="text"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='summary' 
                                    value={ stakeholder.about }
                                    label={ `${ stakeholder.name + ' - Summary Background' }` }
                                    placeholder="Edit stakeholders summary..."
                                    type="text"
                                    multiline={true}
                                    rows="5"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='email' 
                                    value={ stakeholder.contacts.email }
                                    label="Email"
                                    placeholder="Stakeholder's email address..."
                                    type="text"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='vision' 
                                    value={ stakeholder.vision }
                                    label="Vision"
                                    placeholder="Edit stakeholders vision..."
                                    type="text"
                                    multiline={true}
                                    rows="10"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='mission' 
                                    value={ stakeholder.mission }
                                    label="Mission Statement"
                                    placeholder="Edit stakeholder's mission..."
                                    type="text"
                                    multiline={true}
                                    rows="10"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='image' 
                                    value={ stakeholder.image }
                                    label="Image Url"
                                    placeholder="Edit stakeholder's image..."
                                    type="text"
                                />

                                <div className={ classes.margin } />
                                <div className={ classes.margin } />
                                <div className={ classes.margin } />

                                <Button type="submit" disabled={!valid  || pristine || submitting} intent="primary" text="Save" />

                                <Button className={ classes.margin } name="default"  intent="danger" text="Archive" onClick={ e => this.handleClick } />

                            </form>
                        </div>

                        <div id="logo" class="tab-pane fade"><br />
                            
                            <form onSubmit={ handleSubmit(values => this.uploadLogo(values)) }>

                                <MuiFormFileinputField
                                    placeholder="Upload Image"
                                    classes={ classes }
                                    name='image'
                                    handleFileChange = { this.handleChange }
                                    type='image'
                                />

                                <div className={ classes.margin } />
                                <div className={ classes.margin } />
                                <div className={ classes.margin } />

                                <Button type="submit" disabled={!valid  || pristine || submitting} intent="primary" text="Upload" />

                            </form>
                        </div>

                    </div>
    
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