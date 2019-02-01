import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm, Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { DirectoryStakeholderTypes } from './directory.stakeholder.type';
import { ErrorField } from '../forms/form.error.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class CreateDirectoryInstitution extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            website: '',
            telephone: '',
            fax: '',
            company_name: '',
            physical_address: '',
            stakeholder_type: [],
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

    handleSubmit = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { classes, handleClick } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { this.handleSubmit }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List Directory"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <Field name="institution" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Company or Department Name (Legal)'
                            defaultValue= "Legal company or department name..."
                            name="institution"
                            type="text"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />

                    <Field name="physicalAddress" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Physical Address'
                            defaultValue= "Institution physical address..."
                            name="physicalAddress"
                            type="text"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />


                    <Field name="telephone" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Telephone'
                            defaultValue= "Company's or department's telephone number..."
                            name="telephone"
                            type="text"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />
                    
                    <Field name="fax" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Fax'
                            defaultValue= "Company's or department's fax number..."
                            name="fax"
                            type="text"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />

                    <Field name="email" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Email'
                            defaultValue= "Company's or department's email address..."
                            name="email"
                            type="email"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />
                    
                    <Field name="website" component={props => {
                        return (
                        <div>
                            <RenderBootstrapField
                            { ...this.props }
                            props={ props }
                            label='Website'
                            defaultValue= "Company's or department's website..."
                            name="webite"
                            type="text"
                            />
                            <ErrorField props={ props } />
                        </div>
                        )
                    }} />

                    <DirectoryStakeholderTypes 
                        classes={ classes }
                        handleChange={ this.handleChange }
                        { ...this.state }
                    />

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <ButtonControl 
                        intent={Intent.PRIMARY} 
                        value="Save"
                        name="save"
                        handleClick={e => this.handleSubmit(e) }
                    />

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

CreateDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createInstitution',
    Validate,
    AsyncValidate
})(withStyles(styles)(CreateDirectoryInstitution));