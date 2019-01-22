import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { DirectoryStakeholderTypes } from './directory.stakeholder.type';

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

                    <RenderBootstrapField
                        classes={ classes }
                        id="name"
                        label='Company or Department Name (Legal)'
                        defaultValue="Legal company or department name..."
                        name="institution"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="address"
                        label='Address'
                        defaultValue="Physical address..."
                        name="address"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="telephone"
                        label='Telephone'
                        defaultValue="Company's or department's telephone number..."
                        name="telephone"
                        type="phone"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="fax"
                        label='Fax'
                        defaultValue="Company's or department's fax number..."
                        name="fax"
                        type="fax"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="email"
                        label='Email'
                        defaultValue="Company's or department's email address..."
                        name="email"
                        type="email"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="website URL"
                        label='Website'
                        defaultValue="Company's or department's website..."
                        name="website"
                        type="text"
                        onChange={ this.handleChange }
                    />

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

export default withStyles(styles)(CreateDirectoryInstitution);