import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import FormFileinputField from '../forms/form.fileinput.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class CreateLibraryItem extends Component {

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

        const { classes, handleClick, handleChange } = this.props;
        
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
                        id="category"
                        label='Category'
                        defaultValue="Edit document category..."
                        name="category"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="title"
                        label='Title'
                        defaultValue="Edit document title..."
                        name="title"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        id="summary"
                        label='Summary'
                        defaultValue="Edit document summary..."
                        name="summary"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <FormFileinputField
                        id="library_document"
                        name="library_document"
                        handleInputChange={ (e) => handleChange(e) }  
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

export default withStyles(styles)(CreateLibraryItem);