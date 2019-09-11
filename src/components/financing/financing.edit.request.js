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
import { UserProfile, profile } from '../user/user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

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

    handleSubmit = (event) => {
        // prevent default behaviour
        event.preventDefault();
        // category under which this subcategory should 
        // be uploaded to
        const { maincategory } = this.props;
        const { subcategory, shortname, summary } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            let sub_category;
            if (subcategory || shortname || summary) {
                // define sub-category structure
                sub_category = {
                    name: subcategory,
                    shortName: shortname,
                    about: summary
                }

                this.props.editCategory(
                    this.props.subcategory._id, 
                    sub_category, 
                    user.token,
                    maincategory,
                    this.props.capitalize(this.props.link)
                );
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
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
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }
        }

    }

    render() {

        const { classes, handleClick, general } = this.props;
        console.log(this.props.subcategory)

        // state
        const { subcategory, shortname, summary } = this.state;

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

                                        <div className="form-group">
                                            <BootsrapTextareaField
                                                name='summary'
                                                id="summary"
                                                label='Summary'
                                                placeholder="Edit sub-category about...."
                                                value={
                                                    this.props.subcategory 
                                                    ? (summary ? summary :  this.props.subcategory.about) : ''
                                                }
                                                type="text"
                                                rows={10}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </Fragment>
                                ) : null
                            ) : <div className="loader" />
                        )
                    }

                    <Button
                        type="submit"
                        disabled={!(subcategory || shortname || summary)}
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