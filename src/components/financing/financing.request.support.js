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
 * placing a request for financing support.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class FinancingRequestSupport extends Component {

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
                    shortName: values.shortName,
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

    render() {

        const { classes, handleClick, handleSubmit, valid, pristine, submitting } = this.props;
        // console.log(this.props)
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

                    <FormTextInputField
                        { ...this.props } 
                        name="subcategory"
                        label="Name"
                        placeholder="New sub-category name..."
                        type="text"
                    />
                    <br />

                    <FormTextInputField
                        { ...this.props } 
                        name="shortName"
                        label="Shortname"
                        placeholder="New sub-category shortname..."
                        type="text"
                    />
                    <br />

                    <FormTextInputField
                        { ...this.props } 
                        name="about"
                        label="Summary"
                        placeholder="New sub-category about..."
                        type="text"
                        multiline={true}
                        rows="10"
                    />
                    <br />

                    <Button type="submit" disabled={!valid  || pristine || submitting} intent="success" text="Save" />
                    
                    <Button className={ classes.margin } name="default" intent="primary" text="Cancel" onClick={ e => handleClick(e) } /> 
                
                </form>
    
            </Fragment>
        );

    }

}

FinancingRequestSupport.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'finansingRequestSupport',
    Validate,
    AsyncValidate
})(withStyles(styles)(FinancingRequestSupport));