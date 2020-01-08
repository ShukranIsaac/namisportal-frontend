import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import UserProfile, { profile } from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import CustomCKEditor from '../ckeditor/editor.component';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for financing support or edit an already placed request.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class EditFinancingRequestSupport extends Component {

    constructor(props) {
        super(props);
        this.state = {}

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
        // prevent default behaviour
        event.preventDefault();
        // category under which this subcategory should 
        // be uploaded to
        const { maincategory } = this.props;
        const { subcategory, shortname, editorText } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            let sub_category;
            if (subcategory || shortname || editorText) {
                // define sub-category structure
                sub_category = {
                    name: subcategory,
                    shortName: shortname,
                    about: editorText
                }

                this.props.editCategory(
                    this.props.subcategory._id, 
                    sub_category, 
                    user.token,
                    maincategory,
                    this.props.capitalize(this.props.link)
                );
            }

        }

    }

    /**
     * Delete category
     */
    archiveCategory = (event) => {
        event.preventDefault();
        // props holds state functions like defaultItem(), saveItem() etc 
        const { subcategory } = this.props;
        // if subcategory exists then delete
        if (subcategory !== null && subcategory._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(
                    subcategory, 
                    user.token, 
                    this.props.capitalize(this.props.link)
                );
            }
        }

    }

    render() {

        const { classes, handleClick, general } = this.props;

        // state
        const { subcategory, shortname, editorText } = this.state;

        // authenticated user
        const user = UserProfile.get();

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Subcategories"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    {
                        general && (
                            !general.isLoading ? (
                                this.props.subcategory !== null ? (
                                    <Fragment>
                                        <div className='margin-fix form-row'>
                                            <BootstrapGridColumn>
                                                <BootsrapTextField
                                                    value={
                                                        this.props.subcategory 
                                                        ? (subcategory 
                                                            ? subcategory : this.props.subcategory.name) : ''
                                                    }
                                                    name='subcategory'
                                                    id="subcategory"
                                                    disabled={ true }
                                                    label='Name'
                                                    placeholder="Edit sub-category name..."
                                                    handleChange={this.handleChange}
                                                />
                                            </BootstrapGridColumn>
                                            <BootstrapGridColumn>
                                                <BootsrapTextField
                                                    name="shortname"
                                                    label="Shortname"
                                                    placeholder="Edit sub-category shortname..."
                                                    value={
                                                        this.props.subcategory 
                                                        ? (shortname 
                                                            ? shortname : this.props.subcategory.shortName) : ''
                                                    }
                                                    type="text"
                                                    handleChange={this.handleChange}
                                                />
                                            </BootstrapGridColumn>
                                        </div>

                                        <CustomCKEditor
                                            label="Summary"
                                            editorText={
                                                this.props.subcategory 
                                                ? (editorText ? editorText :  this.props.subcategory.about) : ''
                                            }
                                            setEditorText={this.setEditorText}
                                        />
                                    </Fragment>
                                ) : null
                            ) : <div className="loader" />
                        )
                    }

                    <Button
                        type="submit"
                        disabled={!(subcategory || shortname || editorText)}
                        intent="success"
                        text="Save"
                    />

                    <Button
                        className={classes.margin}
                        intent="danger" text="Delete"
                        onClick={(e) => this.archiveCategory(e)}
                        disabled={!profile.canDelete({ user })}
                    />

                    <Button
                        name="default"
                        intent="primary"
                        text="Cancel"
                        onClick={e => handleClick(e)}
                    />

                </form>

            </Fragment>
        );

    }

}

EditFinancingRequestSupport.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editFinansingSupport',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditFinancingRequestSupport));