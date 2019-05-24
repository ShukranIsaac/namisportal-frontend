import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider, } from '@material-ui/core';
import { TextEditor } from '../forms/editor';
import { editor as EditorUtils } from '../forms/editor/text.editor.utils';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
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

    constructor() {
        super();
        this.state = {
            article: '',
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
            const { article } = this.props;
            // console.log(article)
            if (article !== null) {
                Object.assign(this.state, { article: article.article });
            }
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
    handleEditorChange = (content) => {
        
        if(content !== null) {
            const { value } = content;
            Object.assign(this.state.article, { article: value });
        }

    }

    handleSubmit = (values) => {
        // user logged
        const user = UserProfile.get();
        if (user !== null) {
            
            if (user.token !== null && user.token !== undefined) {
                /**
                 * serialize content
                 */
                let content = editor.html.serialize(this.state.article);
                // define article object
                const article = {
                    title: values.title,
                    article: content.article
                }
                console.log(article)
                if (article.title !== undefined || article.article !== undefined) {
                    // then make post request to the api
                    this.props.editArticle(this.state.article._id, article, user.token);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            }

        }
        
    }

    /**
     * Delete category
     */
    archiveCategory = (event) => {
        event.preventDefault();
        // props holds state functions like defaultItem(), saveItem() etc 
        const { article } = this.props;
        // if article exists then delete
        if(article !== null && article._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.deleteArticle(article._id, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }
        }

    }

    render() {

        const { classes, handleClick, handleSubmit, general, article, } = this.props;

        // serialize the article text
        if(article !== null) {
            Object.assign(article, { article: EditorUtils.html.deserialize(article.article) })
        }

        return (
            <Fragment>

                <form onSubmit = { handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

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
                                        (article !== null && article !== undefined) && (
                                            <>
                                                <FormTextInputField
                                                    classes={ classes }
                                                    name='title'
                                                    value={article.title}
                                                    label='Article Title'
                                                    placeholder='Edit article title...'
                                                    type='text'
                                                />

                                                <TextEditor 
                                                    name="content" 
                                                    content={article.article} 
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

                    <Button 
                        type="submit" 
                        // disabled={!valid  || pristine || submitting} 
                        color="primary"
                    >
                        Save
                    </Button>

                    <ButtonControl 
                        className={classes.margin}
                        intent={Intent.PRIMARY} 
                        value="Cancel"
                        name="default"
                        handleClick={e => handleClick(e) }
                    />

                    {
                        this.props.article !== null && (
                            <Button 
                                id={ this.props.article._id }
                                className={ classes.margin } 
                                name="archive" 
                                intent="danger" text="Delete" 
                                onClick={ e => this.archiveCategory(e) } 
                            />
                        )
                    }
                
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