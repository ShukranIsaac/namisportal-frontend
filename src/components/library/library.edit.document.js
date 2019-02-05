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
import { MuiFormFileinputField } from '../forms/form.fileinput.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditLibraryItem extends Component {

    constructor() {
        super();
        this.state = {
            document
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

    handleSubmit = (event, values) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { 
            classes, 
            handleClick,
            handleSubmit, 
            docs: { resource_plan } 
        } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { (e) => handleSubmit(values => this.handleSubmit(e, values)) }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Library Document"
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
                        name='category'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    id={ resource_plan.name }
                                    label='Category'
                                    defaultValue="Edit document category..."
                                    value={ `${ "Tarrifs" }` }
                                    name="category"
                                    type="text"
                                    onChange={ this.handleChange }
                                    props={ input }
                                />
                            );
                        }}
                    />

                    <Field
                        name='title'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    id={ resource_plan.name }
                                    label='Title'
                                    defaultValue="Edit document title..."
                                    value={ resource_plan.name }
                                    name="title"
                                    type="text"
                                    onChange={ this.handleChange }
                                    props={ input }
                                />
                            );
                        }}
                    />

                    <Field
                        name='summary'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label='Summary'
                                    defaultValue="Edit document summary..."
                                    value={ resource_plan.summary }
                                    name="summary"
                                    type="textarea"
                                    multiline={true}
                                    rows="10"
                                    props={ input }
                                />
                            );
                        }}
                    />

                    <MuiFormFileinputField
                        id="pdf_document"
                        placeholder="Upload pdf document"
                        handleInputChange={ (e) => this.handleChange(e) }
                        classes={ classes }
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

                    <ButtonControl 
                        intent={Intent.WARNING} 
                        value="Unpublish" 
                        name="unpublish"
                        handleClick={e => handleClick(e) } 
                    />

                    <ButtonControl 
                        intent={Intent.DANGER} 
                        value="Archive"
                        name="archive"
                        handleClick={e => handleClick(e) } 
                    />
                
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