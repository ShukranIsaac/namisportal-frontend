import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Button } from 'reactstrap';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

import styles from '../contact/form.styles';

import * as NewsAction from '../../actions/news.action';

import { Divider } from '@material-ui/core';
import UserProfile from '../user/user.profile';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import CustomCKEditor from '../ckeditor/editor.component';
import ButtonControls from '../cms/cms.controls';

class CreateNewsItem extends Component {

    constructor() {
        super();
        this.state = {
            title: ''
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
        const { 
            articles: category // News category under which all items will b created
        } = this.props;
        // user logged
        const user = UserProfile.get();
        if (user !== null) {

            if (user.token !== null && user.token !== undefined) {
                // define article object
                const article = {
                    name: title,
                    shortName: title,
                    about: editorText
                }

                if (title && editorText && category) {
                    // then make post request to the api
                    this.props.createArticle(category._id, article, user);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            }

        }

    }

    render() {

        const { 
            classes, 
            handleClick,
        } = this.props;

        return (<Fragment>
            <ButtonControls 
                keys={['default']}
                user={ UserProfile.get() }
                handleClick={handleClick}
            />

            <div className={classes.margin} />
            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />

            <form onSubmit={(e) => this.handleSubmit(e)} 
                autoComplete="off">

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

                <CustomCKEditor
                    {...this.state}
                    label="Article Contents"
                    setEditorText={this.setEditorText}
                />

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <Button
                    type="submit"
                    disabled={!(this.state.title && this.state.editorText)}
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

        </Fragment>);
    }
}

CreateNewsItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errored: state.news.errored,
    general: state.general.general,
    article: state.news.article,
})

const mapDispatchToProps = (dispatch) => ({
    createArticle: (id, article, user) => dispatch(NewsAction.createArticle(id, article, user)),
})

export default (withStyles(styles)(connect(mapStateToProps, 
    mapDispatchToProps)(CreateNewsItem)));