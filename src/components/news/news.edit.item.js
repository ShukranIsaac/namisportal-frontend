import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import { Divider } from '@material-ui/core';
import { TextEditor } from '../forms/editor';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';

import initialValue from '../forms/utils/initial.value';

class EditNewsItem extends Component {

    constructor() {
        super();
        this.state = {
            item: {
                article: {
                    article_id: 'e8g9tyjGh',
                    article_url: require('../../assets/docs/resource-plan/Malawi IRP - Vol I - Main Report - Appendices.pdf'),
                    title: 'Information clearing house, Department of Energy',
                    content: "The Project Developer should submit a Concept Note to the Rural Energy Agency (REA) in order to get a preliminary assessment of whether the planned project is eligible for support from the REA. The Concept note should, inter alia, include: An information portal is a customized website that immerses information from a wide range of sources in a consistent and uniform manner. For this purpose, UNDP and Department of Energy Affairs (DoEA) seek to establish an information clearing house portal to make available information that includes: current electricity grid network, planned and known rural electrification efforts of Malawi Rural Electrification Project (MAREP); existing off-grid systems; population centres; renewable energy resource information; infrastructure; location of government public service institutions; location of other rural infrastructure, land use, environmental and social issues."
                },
                author: {
                    author_id: 'e8gtyujG',
                    name: 'John Doe',
                    email: 'newseditor@grid.mw',
                    thumbnail: '',
                    roles: ['edit', 'publish', 'unpublish', 'create', 'delete']
                }
            },
            title: '',
            content: initialValue,
        }

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);

    }

	/**
	 * On component did mount, update the app's React state/props with new values.
	 *
	 * @param {Props} props
	 */
    componentDidMount() {

        this.setState(
            { 
                title: this.state.item.article.title,
            }
        );

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

    handleSubmit = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { item: { author: { author_id } } } = this.state;

        const { classes, handleClick } = this.props;
        
        return (
            <Fragment>

                <form onSubmit = { this.handleSubmit }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Article"
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
                        id={ author_id }
                        label='Article Title'
                        defaultValue="Edit article title..."
                        value={this.state.title}
                        name="title"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <TextEditor 
                        name="content" 
                        content={ this.state.content } 
                        editorChange={ this.handleEditorChange } 
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

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

EditNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditNewsItem);