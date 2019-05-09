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

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for financing support or edit an already placed request.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class EditFinancingRequestSupport extends Component {

    constructor(props) {
        super(props);
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
        // category under which this subcategory should 
        // be uploaded to
        const { subcategory: { subCategories } } = this.props;
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
                // console.log(subCategories[0])
                this.props.editCategory(subCategories[0]._id, sub_category, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
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

        const { 
            classes, 
            handleClick, 
            handleSubmit, 
            valid, 
            pristine, 
            submitting,
            subcategory,
            general,
            // option
        } = this.props;

        return (
            <Fragment>
                
                <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Category"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <Divider />

                    {
                        general && (
                            !general.isLoading ? (
                                subcategory !== null ? (
                                    <Fragment>
                                        <FormTextInputField
                                            { ...this.props }
                                            name='subcategory'
                                            id="subcategory"
                                            label='Name'
                                            placeholder="New sub-category name..."
                                            value={ subcategory.name }
                                            type="text"
                                        />
                                        <br />
    
                                        <FormTextInputField
                                            { ...this.props }
                                            name='about'
                                            id="about"
                                            label='Summary'
                                            placeholder="New sub-category about...."
                                            value={ subcategory.about }
                                            type="text"
                                            multiline={true}
                                            rows="10"
                                        />
                                        <br />
                                    </Fragment>
                                ) : null
                            ) : <div className="loader" />
                        )
                    }

                    <Button type="submit" disabled={!valid  || pristine || submitting} intent="success" text="Save" />
                    
                    <Button 
                        className={ classes.margin }
                        intent="danger" text="Archive" 
                        onClick={ (e) => this.archiveCategory(e) } 
                    />

                    <Button name="default" intent="primary" text="Cancel" onClick={ e => handleClick(e) } /> 
                
                </form>
    
            </Fragment>
        );

    }

}

EditFinancingRequestSupport.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editFinansingSupport',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditFinancingRequestSupport));