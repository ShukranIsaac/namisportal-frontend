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
 * Add a new home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class CreateHomeSubcategory extends Component {

    constructor() {
        super();
        
        this.state = {
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
        // category under which this subcategory should 
        // be uploaded to
        const { category, props } = this.props;
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

                this.props.createCategory(category._id, sub_category , user.token);
                // then change state to default
                // so that the page redirects and list all home items
                props.defaultItem();
            }

        } 
        
    }

    render() {

        // const { document } = this.state;

        const { 
            classes, handleClick, handleSubmit,
            valid, pristine, submitting
        } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List SubCategories"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <Field
                        name='subcategory'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    id="subcategory"
                                    label='Name'
                                    defaultValue="New sub-category name..."
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
                                    id="about"
                                    label='Summary'
                                    defaultValue="New sub-category about..."
                                    name="about"
                                    type="text"
                                    multiline="true"
                                    rows="10"
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

                    <Button type="submit" disabled={!valid  || pristine || submitting} intent="success" text="Save" />

                    <ButtonControl 
                        intent={Intent.SUCCESS} 
                        value="Publish" 
                        name="publish"
                        handleClick={e => handleClick(e) } 
                    />
                
                </form>

            </Fragment>
        );

    }

}

CreateHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createSubcategory',
    Validate,
    AsyncValidate
})(withStyles(styles)(CreateHomeSubcategory));