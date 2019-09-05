import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm, Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider, Paper, FormControl } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { ErrorField } from '../forms/form.error.field';
import { UserProfile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class CreateDirectoryInstitution extends Component {

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

        // if chosen stakeholder
        if (event.target.name) {
            const stakeholderName = event.target.value;
            const stakeholders = this.props.subcategory;

            // if stakeholders not null
            if (stakeholders !== null) {

                // then iterate through the subcategories
                // and filter the chosen stakeholder
                const filteredStakeholder = stakeholders.subCategories.length !== 0 && stakeholders.subCategories.filter(stakeholder => {

                    if (stakeholderName !== null && stakeholder !== null) {
                        // check if the chosen stakeholder from the drop down list
                        // equals one of the stakeholders/subCategories
                        // in the Frequently asked questions
                        if (stakeholder.name === stakeholderName) {
                            return stakeholder;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }

                });

                // was anything returned
                if (filteredStakeholder) {

                    this.setState({ [event.target.name]: filteredStakeholder[0] });

                }

            }

        }

    }

    /**
     * Add Stakeholder Type/Category
     */
    handleAddStakeholderType = (event) => {
        // prevent default events
        event.preventDefault();
        // if add_stakeholder_type if false
        // then set it to true else false
        this.setState({ add_stakeholder_type: true })
    }

    handleDeleteStakeholderType = (event) => {
        // prevent default events
        event.preventDefault();
        // get authenticated user token
        const user = UserProfile.get();
        // if stakeholder_type to delete is selected
        if (event.currentTarget.name === 'delete_stakeholder_type') {
            if (this.state.stakeholder_type !== null && user !== null) {
                // ids the same: chosen and what is in state
                if (this.state.stakeholder_type._id === event.currentTarget.value) {
                    // proceeed to delete the selected stakeholder_type
                    this.props.archiveCategory(this.state.stakeholder_type, user.token);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            }
        }
    }

    handleSubmit = (values) => {
        // category under which this stakeholder should 
        // be uploaded to
        const { stakeholder_type } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (values !== null && values !== undefined) {

                if (values.stakeholder_name !== undefined && values.stakeholder_name !== null) {
                    // define sub-category structure
                    const stakeholder = {
                        name: values.stakeholder_name,
                        about: values.physical_address,
                        mission: values.physical_address,
                        vision: values.stakeholder_name,
                        contacts: {
                            email: values.email,
                            telephone: values.telephone,
                            website: values.website,
                            address: values.physical_address
                        },
                        image: values.website
                    }

                    // console.log(stakeholder);
                    // this.props.createStakeholder(stakeholder, user.token);
                    /**
                     * create new stakeholder under category selected
                     */
                    if (stakeholder_type !== undefined && stakeholder_type !== null) {
                        this.props.createCategory(stakeholder_type._id, stakeholder, user.token);
                        // then change state to default
                        // so that the page redirects and list all home items
                        this.props.defaultItem();
                    }
                } else {
                    // we are adding a stakeholder category: sub-category essentially
                    // define object structure
                    const stakeholderType = {
                        name: values.stakeholder_type_name,
                        shortName: values.stakeholder_type_shortname,
                        about: values.stakeholder_type_summary,
                    }

                    // category to add stakeholders to: Directory
                    const { subcategory } = this.props;
                    console.log(subcategory)
                    // then check if null and undefined, then proceed otherwise
                    if (subcategory !== null && subcategory !== undefined) {
                        // create new stakeholderType category
                        this.props.createCategory(subcategory._id, stakeholderType, user.token);
                        // then change state.add_stakeholder_type to false
                        // so that the page shows form fileds to add stakeholder types
                        this.setState({ add_stakeholder_type: false });
                    }
                }

            }

        }

    }

    render() {

        const {
            classes, handleClick, handleSubmit, valid, pristine, submitting
        } = this.props;

        // List of Stakeholder types/categories
        const stakeholderTypes = this.props.subcategory;

        return (
            <Fragment>

                <form onSubmit={handleSubmit(values => this.handleSubmit(values))}>

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Stakeholders"
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
                        !this.state.add_stakeholder_type ? (
                            <>
                                { /** filter stakeholderTypes here */}
                                <FormControl>

                                    <Paper elevation={0}>

                                        <SelectInputControl
                                            name="stakeholder_type"
                                            {...this.state}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="">{`Choose Stakeholder Type`}</option>
                                            {
                                                (stakeholderTypes !== null && stakeholderTypes !== undefined) && (
                                                    stakeholderTypes.subCategories.length !== 0 && stakeholderTypes.subCategories.map(({ _id, name }, index) => {

                                                        // stakeholderTypes
                                                        return <option id={_id} key={`${index}`} value={name}>{name}</option>

                                                    })
                                                )
                                            }
                                        </SelectInputControl>

                                    </Paper>

                                </FormControl>

                                { /** New Stakeholder Type */}
                                <Button
                                    className={classes.margin}
                                    name="add_stakeholder_type"
                                    value={this.state.add_stakeholder_type}
                                    intent="primary" text="Add Stakeholder Type"
                                    onClick={e => this.handleAddStakeholderType(e)}
                                />

                                {
                                    (this.state.stakeholder_type !== null
                                        && this.state.stakeholder_type !== undefined) && (
                                        <Button
                                            className={classes.margin}
                                            name="delete_stakeholder_type"
                                            value={this.state.stakeholder_type._id}
                                            intent="danger" text="Delete Selected"
                                            onClick={e => this.handleDeleteStakeholderType(e)}
                                        />
                                    )
                                }

                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                {
                                    (stakeholderTypes !== null && stakeholderTypes !== undefined) && (
                                        stakeholderTypes.subCategories.length !== 0 && (
                                            <>
                                                <Field
                                                    name="stakeholder_name"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Stakeholders or Department Name (Legal)'
                                                                    defaultValue="Legal stakeholder or department name..."
                                                                    name="stakeholder_name"
                                                                    type="text"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                />

                                                <Field
                                                    name="physical_address"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Physical Address'
                                                                    defaultValue="Stakeholder's physical address..."
                                                                    name="physical_address"
                                                                    type="text"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                    multiline={true}
                                                    rows="6"
                                                />

                                                <Field
                                                    name="telephone"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Telephone'
                                                                    defaultValue="Stakeholder's or department's telephone number..."
                                                                    name="telephone"
                                                                    type="text"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                />

                                                <Field
                                                    name="fax"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Fax'
                                                                    defaultValue="Stakeholder's or department's fax number..."
                                                                    name="fax"
                                                                    type="text"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                />

                                                <Field
                                                    name="email"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Email'
                                                                    defaultValue="Stakeholder's or department's email address..."
                                                                    name="email"
                                                                    type="email"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                />

                                                <Field
                                                    name="website"
                                                    component={props => {
                                                        return (
                                                            <div>
                                                                <RenderBootstrapField
                                                                    {...this.props}
                                                                    props={props}
                                                                    label='Website'
                                                                    defaultValue="Stakeholder's or department's website..."
                                                                    name="webite"
                                                                    type="text"
                                                                />
                                                                <ErrorField props={props} />
                                                            </div>
                                                        )
                                                    }}
                                                />
                                            </>
                                        )
                                    )
                                }

                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                <Button
                                    type="submit" disabled={!valid || pristine || submitting}
                                    intent="success" text="Save"
                                />

                                <Button
                                    className={classes.margin}
                                    name="default" intent="primary" text="Cancel"
                                    onClick={e => handleClick(e)}
                                />

                            </>
                        ) : (
                                <>
                                    <FormTextInputField
                                        classes={classes}
                                        name='stakeholder_type_name'
                                        label="Name"
                                        placeholder="Enter stakeholder type name..."
                                        type="text"
                                    />

                                    <FormTextInputField
                                        classes={classes}
                                        name="stakeholder_type_shortname"
                                        label="Shortname"
                                        placeholder="Enter stakeholder type shortname..."
                                        type="text"
                                    />

                                    <FormTextInputField
                                        classes={classes}
                                        name='stakeholder_type_summary'
                                        label="Summary"
                                        placeholder="Enter stakeholder type summary..."
                                        type="text"
                                        multiline={true}
                                        rows="3"
                                    />

                                    <div className={classes.margin} />
                                    <div className={classes.margin} />
                                    <div className={classes.margin} />

                                    <Button
                                        type="submit" disabled={!valid || pristine || submitting}
                                        intent="success" text="Save"
                                    />

                                    <Button
                                        className={classes.margin} intent="primary"
                                        text="Cancel" onClick={() => {
                                            if (this.state.add_stakeholder_type) {
                                                this.setState({ add_stakeholder_type: false })
                                            }
                                        }}
                                    />
                                </>
                            )
                    }

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                </form>

            </Fragment>
        );

    }

}

CreateDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createInstitution',
    Validate,
    AsyncValidate
})(withStyles(styles)(CreateDirectoryInstitution));