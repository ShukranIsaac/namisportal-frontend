import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
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

    handleSubmit = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { document } = this.state;

        const { classes, handleClick, handleChange, docs: { resource_plan } } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { this.handleSubmit }>

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

                    <RenderBootstrapField
                        classes={ classes }
                        id={ resource_plan.name }
                        label='Category'
                        defaultValue="Edit document category..."
                        value={ `${ "Tarrifs" }` }
                        name="category"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id={ resource_plan.name }
                        label='Title'
                        defaultValue="Edit document title..."
                        value={ resource_plan.name }
                        name="title"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id={ resource_plan.name }
                        label='Summary'
                        defaultValue="Edit document summary..."
                        value={ resource_plan.summary }
                        name="summary"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    {/* <FormFileinputField
                        handleInputChange={ (e) => handleChange(e) }
                        text="Choose pdf document..."   
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

export default withStyles(styles)(EditLibraryItem);