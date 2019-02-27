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
 * Edit a home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class EditHomeSubcategory extends Component {

    constructor() {
        super();
        this.state = {
            subcategory: null
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

    handleSubmit = (values) => {
        // category under which this subcategory should 
        // be uploaded to
        const { subcategory } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {
            
            let edited_sub_category;
            if(values !== null && values !== undefined) {
                // console.log(values)
                // get sub-category structure
                edited_sub_category = {
                    name: values.subcategory,
                    about: values.about
                }

                // then edit this sub category
                this.props.editCategory(subcategory._id, edited_sub_category, user.token);
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
        const { subcategory, props } = this.props;
        // if subcategory exists then delete
        if(subcategory !== null && subcategory._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(subcategory, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                props.defaultItem();
            }
        }

    }

    render() {
        
        const { 
            classes, handleClick, handleSubmit,
            subcategory, valid, pristine, submitting 
        } = this.props;
        
        if(subcategory !== null) {

            return (
                <Fragment>
    
                    <form onSubmit = { handleSubmit(values => this.handleSubmit(values)) }>
    
                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="New SubCategory"
                            name="create"
                            handleClick={e => handleClick(e) }
                        />
    
                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="List SubCategories"
                            name="list"
                            handleClick={e => handleClick(e) }
                        />
    
                        <div className={ classes.margin }/>
                        <div className={ classes.margin }/>
    
                        <Divider />
    
                        <Field
                            name='subcategory'
                            component={ input => {
                                return (
                                    <RenderBootstrapField
                                        classes={ classes }
                                        id={ subcategory._id }
                                        label='Name'
                                        defaultValue="Edit sub-category name..."
                                        value={ subcategory.name }
                                        name="subcategory"
                                        type="text"
                                        props={ input }
                                    />
                                );
                            }}
                        />
    
                        <Field
                            name='about'
                            component={ input => {
                                return (
                                    <RenderBootstrapField
                                        classes={ classes }
                                        label='Summary'
                                        defaultValue="Edit sub-category about..."
                                        value={ subcategory.about }
                                        name="about"
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
                        <Button className={ classes.margin } intent="danger" text="Archive" onClick={ (e) => this.archiveCategory(e) } />
                    
                    </form>
    
                </Fragment>
            );
    
        } else {

            return <div className="loader" />
            
        }
        
    }

}

EditHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editSubcategory',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditHomeSubcategory));