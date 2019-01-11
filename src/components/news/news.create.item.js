import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import { TextEditor } from '../forms/editor';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

import styles from '../contact/form.styles';

import InitialSchema from '../forms/utils/initial.schema';

class CreateNewsItem extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            content: InitialSchema,
        }

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);

    }

	/**
	 * On component did mount, update the app's React state/props with new values.
	 *
	 * @param {Props} props
	 */
    componentDidMount() {

        this.setState( () => {
            return { 
                content: InitialSchema
            }
        });

    }

	/**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange = (event) => {
        
        this.setState({[event.target.name]: event.target.value});
  
    }

	/**
	 * On change, update the app's React state with the new editor value.
	 *
	 * @param {Editor} editor
	 */
    handleEditorChange = ({ value }) => {
        
        this.setState({ content: value});

    }

    handleClick = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        console.log(event.target.name);
        
    }

    handleSubmit = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { classes } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { this.handleSubmit }>

                    <RenderBootstrapField
                        classes={ classes }
                        label='Article Title'
                        defaultValue="Enter article title..."
                        value={ this.state.title }
                        name="title"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <TextEditor name="content" content={ this.state.content } editorChange={ this.handleEditorChange } />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <ButtonControl intent={Intent.PRIMARY} value="Save" handleClick={e => this.handleSubmit(e) } />

                    <ButtonControl intent={Intent.SUCCESS} value="Publish" handleClick={e => this.handleChange(e) } />
                
                </form>

            </Fragment>
        );

    }

}

CreateNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateNewsItem);