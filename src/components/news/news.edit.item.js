import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider, } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';

import UserProfile, { profile } from '../user/user.profile';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import CustomCKEditor from '../ckeditor/editor.component';
import ButtonControls from '../cms/cms.controls';

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
            text: ''
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

        this.setState({ [event.target.name]: event.target.value });

    }

    setEditorText = (editor) => {
        this.setState({ editorText: editor.getData() });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // state
        const { title, editorText } = this.state;
        // user logged
        const user = UserProfile.get();
        if (user !== null) {

            if (user.token !== null && user.token !== undefined) {
                // define article object
                const article = {
                    title: title,
                    article: editorText
                }
                
                // then make post request to the api
                this.props.editArticle(this.props.article._id, article, user.token);
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
        if (article !== null && article._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.deleteArticle(article._id, user.token);
            }
        }

    }

    render() {

        const { classes, handleClick, general, article, } = this.props;

        /**
         * serialize content
         */
        const { title, editorText } = this.state;

        if (article && !editorText) {
            Object.assign(this.state, { editorText: article.article })
        }

        const user = UserProfile.get();

        return (
            <Fragment>
                <form onSubmit={(e) => this.handleSubmit(e)} 
                    autoComplete="off">
                    <ButtonControls 
                        keys={['default', 'create']}
                        user={ user }
                        handleClick={handleClick}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    {
                        general && (!general.isLoading ? (article && (
                                <Fragment>
                                    <div className="margin-fix form-row">
                                        <BootsrapTextField
                                            name="title"
                                            value={article ? (title ? title : article.title) : ''}
                                            placeholder="Edit article title..."
                                            label="Article Title"
                                            type="text"
                                            handleChange={this.handleChange}
                                        />
                                    </div>

                                    <CustomCKEditor
                                        {...this.state}
                                        label="Article Contents"
                                        setEditorText={this.setEditorText}
                                    />
                                </Fragment>
                            )) : <div className="loader" 
                                style={{ marginTop: `40px` }}
                            />
                        )
                    }

                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Button
                        type="submit"
                        // should be disabled until some form field has been edited
                        // but for now default it to false
                        // because the editor's text is not managed by state thus currently no way to track
                        // if anything was edited i.e !(title || article)
                        // disabled={ !(title || article) }
                        color="primary"
                    >
                        Save
                    </Button>

                    {
                        this.props.article !== null && (
                            <Button
                                id={this.props.article._id}
                                className={classes.margin}
                                name="archive"
                                intent="danger" text="Delete"
                                onClick={e => this.archiveCategory(e)}
                                disabled={!profile.canDelete({ user })}
                            />
                        )
                    }

                    <ButtonControl
                        className={classes.margin}
                        intent={Intent.PRIMARY}
                        value="Cancel"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                </form>

            </Fragment>
        );

    }

}

EditNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(EditNewsItem));