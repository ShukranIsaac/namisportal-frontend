import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { TextEditor } from '../forms/editor';
import { Button } from 'reactstrap';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

import styles from '../contact/form.styles';

import * as NewsAction from '../../actions/news.action';

import InitialSchema from '../forms/utils/initial.schema';
import { Divider } from '@material-ui/core';
import { editor } from '../forms/editor/text.editor.utils';
import { UserProfile } from '../user/user.profile';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

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
        this.handleEditorChange = this.handleEditorChange.bind(this);

    }

	/**
	 * On component did mount, update the app's React state/props with newvalues.
	 *
	 * @param {Props} props
	 */
    componentDidMount() {

        this.setState(() => {
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

        this.setState({ [event.target.name]: event.target.value });

    }

	/**
	 * On change, update the app's React state with the new editor value.
	 *
	 * @param {Editor} editor
	 */
    handleEditorChange = ({ value }) => {
        // console.log(value)
        if (value !== undefined) {
            this.setState({ content: value });
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        // state
        const { title } = this.state;
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
                    title: title,
                    article: content
                }

                // then make post request to the api
                this.props.createArticle(article, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }

        }

    }

    render() {

        const { classes, handleClick } = this.props;

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Articles"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <div className="margin-fix form-row">
                        <BootsrapTextField
                            name="title"
                            value={this.state.title}
                            placeholder="Enter article title..."
                            label="Article Title"
                            type="text"
                            handleChange={this.handleChange}
                        />
                    </div>

                    <div style={{ margin: `1.1em` }}>
                        <TextEditor
                            name="content"
                            content={this.state.content}
                            editorChange={this.handleEditorChange}
                        />
                    </div>

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Button
                        type="submit"
                        disabled={!(this.state.title)}
                        color="primary"
                    >
                        Save
                    </Button>

                    <ButtonControl
                        name="default"
                        className={classes.margin}
                        intent={Intent.PRIMARY}
                        value="Cancel"
                        handleClick={e => handleClick(e)}
                    />

                </form>

            </Fragment>
        );

    }

}

CreateNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {

    return {
        errored: state.news.errored,
        general: state.general.general,
        article: state.news.article,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        createArticle: (article, user) => dispatch(NewsAction.createArticle(article, user)),
    };

}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateNewsItem)));