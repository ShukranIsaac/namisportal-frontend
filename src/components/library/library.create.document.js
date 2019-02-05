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

    handleSubmit = (event, values) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        // const { document } = this.state;

        const { classes, handleClick, handleChange, handleSubmit } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { (e) => handleSubmit(values => this.handleSubmit(e, values)) }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List All Documents"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    {/* <FormSelectMultiple 
                        classes={classes}
                        handleChangeMultiple={this.handleChangeMultiple}
                        options={options}
                    /> */}

                    <Field 
                        name='category'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    id="category"
                                    label='Category'
                                    defaultValue="Edit document category..."
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
                                    id="title"
                                    label='Title'
                                    defaultValue="Edit document title..."
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
                                    id="summary"
                                    label='Summary'
                                    defaultValue="Edit document summary..."
                                    name="summary"
                                    type="text"
                                    multiline="true"
                                    rows="15"
                                    onChange={ this.handleChange }
                                    props={ input }
                                />
                            );
                        }}
                    />

                    {/* <FormFileinputField
                        id="library_document"
                        name="library_document"
                        handleInputChange={ (e) => handleChange(e) }  
                    /> */}

                    <MuiFormFileinputField
                        id="pdf_document"
                        placeholder="Upload pdf document.."
                        handleInputChange={ (e) => handleChange(e) }
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