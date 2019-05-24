import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm, } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import { UserProfile } from '../user/user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditLibraryItem extends Component {

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
        
        this.setState({
            [event.target.name]: event.target === 'files' ? event.target.files[0] : event.target.value
        });
  
    }

    handleSubmit = (values) => {
        
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            if(values !== null && values !== undefined) {
                // define sub-category structure
                const data = {
                    name: values.name,
                    shortName: values.shortName,
                    about: values.summary,
                    file: values.supporting_document
                }

                console.log(data);
                // this.props.createStakeholder(data, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                // this.props.defaultItem();
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
        } = this.props;

        console.log(subcategory)
        
        if (subcategory !== null && subcategory !== undefined) {
            
            

        } else {

            return <div className="loader" />

        }
        return (
            <Fragment>

                <form onSubmit = { handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Documents"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Document"
                        name="create"
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
                                <Fragment>
                                    <FormTextInputField
                                        { ...this.props }
                                        name="category"
                                        label='Category'
                                        placeholder="Edit document category..."
                                        value={ subcategory.name }
                                        type="text"
                                        disabled="true"
                                    />

                                    <FormTextInputField
                                        { ...this.props }
                                        name="name"
                                        label='Name'
                                        placeholder="Edit document name..."
                                        value={ subcategory.name }
                                        type="text"
                                    />

                                    <FormTextInputField 
                                        classes={ classes }
                                        name='shortName'
                                        label="Short Name"
                                        placeholder="Enter document short name..."
                                        type="text"
                                    />

                                    <FormTextInputField
                                        { ...this.props }
                                        name="summary"
                                        label='Summary'
                                        placeholder="Edit document summary..."
                                        value={ subcategory.about }
                                        type="text"
                                        multiline={true}
                                        rows="10"
                                    />

                                    <br />

                                    <MuiFormFileinputField
                                        // { ...this.state }
                                        id="pdf_document"
                                        placeholder="Upload PDF Document"
                                        classes={ classes }
                                        name='supporting_document'
                                        handleFileChange = { this.handleChange }
                                    />
                                </Fragment>
                            ) : <div style={{ marginTop: `50px` }} className="loader" />
                        )
                    }

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <Button type="submit" disabled={!valid || pristine || submitting} intent="success" text="Save" />
                    
                    <Button className={ classes.margin } name="default" intent="primary" text="Cancel" onClick={ e => handleClick(e) } /> 

                    <ButtonControl intent={Intent.DANGER} value="Archive" name="archive" handleClick={e => handleClick(e) } />
                
                </form>

            </Fragment>
        );

    }

}

EditLibraryItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editLibraryItem',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditLibraryItem));