import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import { TextEditor } from '../forms/editor';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';

import { FormTextInputField } from '../forms/form.textinput.field';
import InitialSchema from '../forms/utils/initial.schema';
import { editor } from '../forms/editor/text.editor.utils';
import { UserProfile } from '../user/user.profile';

/**
 * Edit a single news article
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class EditNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: props.article,
            value: InitialSchema
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

        if (this.state.article !== undefined) {
            const { article } = this.state;
            Object.assign(article, { article: editor.html.deserialize(article.article) });
        }

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
        
        Object.assign(this.state.article, { article: value });

    }

    handleSubmit = (event, values) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
        event.preventDefault();
        
        // user logged
        const user = UserProfile.get();
        if (user !== null) {
            
            if (user.token !== null && user.token !== undefined) {
                /**
                 * serialize content
                 */
                let content = editor.html.serialize(this.state.content);
                // define article object
                const article = {
                    title: values.title,
                    article: content
                }

                // then make post request to the api
                this.props.editArticle(this.state.article._id, article, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }

        }
        
    }

    render() {

        const { classes, handleClick, handleSubmit, general } = this.props;
        console.log(this.props);
        return (
            <Fragment>

                <form onSubmit = { (e) => handleSubmit(values => this.handleSubmit(e, values)) }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Article"
                        name="create"
                        handleClick={e => handleClick(e) }
                    />

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="List All Articles"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    {
                        general && (
                            !general.isLoading ? (
                                <>
                                    {
                                        this.state.article !== null && (
                                            <>
                                                <FormTextInputField
                                                    classes={ classes }
                                                    name='title'
                                                    value={ this.state.article.title }
                                                    label='Article Title'
                                                    placeholder='Edit article title...'
                                                    type='text'
                                                />

                                                <TextEditor 
                                                    name="content" 
                                                    content={ this.state.article.article } 
                                                    editorChange={ this.handleEditorChange } 
                                                />
                                            </>
                                        )
                                    }
                                </>
                            ) : <div className="loader" />
                        )
                    }

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <ButtonControl 
                        intent={Intent.PRIMARY} 
                        value="Save"
                        name="save"
                        handleClick={e => this.handleSubmit(e) }
                    />

                    {/* <ButtonControl 
                        intent={Intent.SUCCESS} 
                        value="Publish" 
                        name="publish"
                        className={classes.margin}
                        handleClick={e => handleClick(e) } 
                    />

                    <ButtonControl 
                        intent={Intent.WARNING} 
                        value="Unpublish" 
                        name="unpublish"
                        className={classes.margin}
                        handleClick={e => handleClick(e) } 
                    /> */}

                    <ButtonControl 
                        className={classes.margin}
                        intent={Intent.DANGER} 
                        value="Archive"
                        name="archive"
                        handleClick={e => handleClick(e) } 
                    />

                    <ButtonControl 
                        className={classes.margin}
                        intent={Intent.PRIMARY} 
                        value="Save"
                        name="save"
                        handleClick={e => this.handleSubmit(e) }
                    />
                
                </form>

            </Fragment>
        );

    }

}

EditNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editNewsItem',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditNewsItem));