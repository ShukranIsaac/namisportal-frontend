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
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import { UserProfile } from '../user/user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';
// import FormSelectMultiple from '../forms/form.multiple.options.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class CreateLibraryItem extends Component {

    constructor() {
        super();
        
        this.state = {
            document,
            name: []
        }

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

    handleChangeMultiple = event => {

        const { options } = event.target;

        const value = [];

        for (let index = 0, optLength = options.length; index < optLength; index += 1) {

            if (options[index].selected) {

                value.push(options[index].value);
                
            }

        }

        this.setState({ [event.target.name]: value });

    };

    handleSubmit = (values) => {
        
        // get category
        const { subcategory } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            if(values !== null && values !== undefined) {
                // define sub-category structure
                const data = {
                    name: values.name,
                    about: values.summary,
                    file: values.supporting_document
                }

                if (subcategory !== null && subcategory !== undefined) {
                    // console.log(data)
                    this.props.uploadFile(subcategory._id, data, user.token);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();

                }
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
            submitting
        } = this.props;
        // console.log(this.props)
        return (
            <Fragment>

                <form onSubmit = { handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Documents"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <FormTextInputField 
                        classes={ classes }
                        name='name'
                        label="Name"
                        placeholder="Edit document name..."
                        type="text"
                    />

                    <FormTextInputField 
                        classes={ classes }
                        name='summary' 
                        label="Summary"
                        placeholder="Edit document summary..."
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

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <Button type="submit" disabled={!valid || pristine || submitting} intent="success" text="Save" />
                    
                    <Button className={ classes.margin } name="default" intent="primary" text="Cancel" onClick={ e => handleClick(e) } /> 
                
                </form>

            </Fragment>
        );

    }

}

CreateLibraryItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createNewLibraryItem',
    Validate,
    AsyncValidate
})(withStyles(styles)(CreateLibraryItem));