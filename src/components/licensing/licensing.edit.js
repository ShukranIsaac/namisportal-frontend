import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import { UserProfile, profile } from '../user/user.profile';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { BootsrapTextareaField } from '../forms/form.textarea.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

/**
 * Create new licensing step
 * 
 * @author Isaac S. Mwakabira
 */
class EditLicensingStep extends Component {

    constructor() {
        super();
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
        // get category
        const { subcategory, category } = this.props;
        // authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {
            // get form fields values
            const { name, shortname, summary } = this.state;

            if (name || shortname || summary) {
                // define sub-category structure
                const _sub_category = {
                    name: name,
                    shortName: shortname,
                    about: summary,
                }

                if (subcategory !== null && subcategory !== undefined) {
                    // console.log(sub_category)
                    this.props.editCategory(
                        subcategory._id,
                        _sub_category,
                        user.token,
                        category, 
                        this.props.capitalize(this.props.link)
                    );
                    // then change state to default
                    // so that the page redirects and list all licensing items
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
        const { subcategory } = this.props;
        // if subcategory exists then delete
        if (subcategory !== null && subcategory._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(subcategory, user.token, this.props.capitalize(this.props.link));
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }
        }

    }

    render() {

        // props
        const { classes, handleClick, subcategory, general } = this.props;

        // state
        const { name, shortname, summary } = this.state;

        // authenticated user
        const user = UserProfile.get();

        return (
            <Fragment>
                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Steps"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    {
                        general && (
                            !general.isLoading ? (
                                subcategory !== null ? (
                                    <Fragment>
                                        <div className='margin-fix form-row'>
                                            <BootstrapGridColumn>
                                                <BootsrapTextField
                                                    value={subcategory ? (this.state.name ? this.state.name : subcategory.name) : ''}
                                                    name='name'
                                                    label="Name"
                                                    placeholder="Enter license process step..."
                                                    handleChange={this.handleChange}
                                                />
                                            </BootstrapGridColumn>
                                            <BootstrapGridColumn>
                                                <BootsrapTextField
                                                    name="shortname"
                                                    type="text"
                                                    placeholder="Enter license process step shortname..."
                                                    label="Shortname"
                                                    value={subcategory ? (this.state.shortname ? this.state.shortname : subcategory.shortName) : ''}
                                                    handleChange={this.handleChange}
                                                />
                                            </BootstrapGridColumn>
                                        </div>

                                        <div className="form-group">
                                            <BootsrapTextareaField
                                                name="summary"
                                                value={subcategory ? (this.state.summary ? this.state.summary : subcategory.about) : ''}
                                                placeholder="Enter license process summary..."
                                                label="Summary Text"
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
                        disabled={!(name || shortname || summary)}
                        intent="success"
                        text="Update"
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

EditLicensingStep.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(EditLicensingStep));