import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider, Paper, FormControl } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import { SelectInputControl } from '../forms/form.selectinput.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditDirectoryInstitution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stakeholder: props.stakeholder
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
                    this.props.createCategory(stakeholder_type._id, stakeholder, user.token);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
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

    uploadLogo = (values) => {
        // stakeholder to be edited
        const { stakeholder } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            // logo object
            let logo;
            if (values !== null && values !== undefined) {
                // stakeholder structure
                logo = {
                    image: values.image,
                }

                // then upload logo for this stakeholder
                this.props.uploadStakeholderLogo(stakeholder._id, logo, user.token);
                // then change state to default
                // so that the page redirects and list all diretory stakeholders
                this.props.defaultItem();
            }

        }
    }

    render() {

        const {
            classes, handleClick, handleSubmit,
            valid, pristine, submitting, general
        } = this.props;

        // List of Stakeholder types/categories
        const stakeholderTypes = this.props.subcategory;

        /**
         * If the stakeholder is not defined and has no data just return loader.
         */
        return (
            <Fragment>

                <ButtonControl
                    intent={Intent.NONE}
                    value="List Stakeholders"
                    name="default"
                    handleClick={e => handleClick(e)}
                />

                <ButtonControl
                    intent={Intent.NONE}
                    value="New Stakeholder"
                    name="create"
                    handleClick={e => handleClick(e)}
                />

                <ul class="nav nav-tabs" role="tablist" style={{ marginTop: `5px` }}>
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#stakeholder">Stakeholder</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#logo">AddLogo</a>
                    </li>
                </ul>

                <div class="tab-content">

                    <div id="stakeholder" class="tab-pane active"><br />

                        <form onSubmit={handleSubmit(values => this.handleSubmit(values))} autoComplete="off">

                            {/* <div className={classes.margin} /> */}

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
                                            this.state.stakeholder !== null && (
                                                <>
                                                    <Divider />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='stakeholder_name'
                                                        value={this.state.stakeholder.name}
                                                        label="Stakeholder's Name (Legal)"
                                                        placeholder="Edit stakeholder name..."
                                                        type="text"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='physical_address'
                                                        value={this.state.stakeholder.address}
                                                        label="Physical Address"
                                                        placeholder="Stakeholder's physical address..."
                                                        type="text"
                                                        multiline={true}
                                                        rows="3"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='telephone'
                                                        value={this.state.stakeholder.contacts.telephone}
                                                        label="Telephone"
                                                        placeholder="Stakeholder's telephone number..."
                                                        type="text"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='website'
                                                        value={this.state.Intentstakeholder.contacts.website}
                                                        label="Website"
                                                        placeholder="Stakeholder's website..."
                                                        type="text"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='summary'
                                                        value={this.state.stakeholder.about}
                                                        label={`${this.state.stakeholder.name + ' - Summary Background'}`}
                                                        placeholder="Edit stakeholders summary..."
                                                        type="text"
                                                        multiline={true}
                                                        rows="5"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='email'
                                                        value={this.state.stakeholder.contacts.email}
                                                        label="Email"
                                                        placeholder="Stakeholder's email address..."
                                                        type="text"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='vision'
                                                        value={this.state.stakeholder.vision}
                                                        label="Vision"
                                                        placeholder="Edit stakeholders vision..."
                                                        type="text"
                                                        multiline={true}
                                                        rows="10"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='mission'
                                                        value={this.state.stakeholder.mission}
                                                        label="Mission Statement"
                                                        placeholder="Edit stakeholder's mission..."
                                                        type="text"
                                                        multiline={true}
                                                        rows="10"
                                                    />

                                                    <FormTextInputField
                                                        classes={classes}
                                                        name='image'
                                                        value={this.state.stakeholder.image}
                                                        label="Image Url"
                                                        placeholder="Edit stakeholder's image..."
                                                        type="text"
                                                    />

                                                    {
                                                        general !== undefined && general.isLoading 
                                                        ? (<div className="loader" />) : null
                                                    }
                                                </>
                                            )
                                        }

                                        <Button
                                            type="submit" disabled={!valid || pristine || submitting}
                                            intent="primary" text="Save"
                                        />

                                        <Button
                                            className={classes.margin} name="default"
                                            intent="danger" text="Archive"
                                            onClick={e => this.handleClick}
                                        />

                                        <Button
                                            name="default" intent="primary"
                                            text="Cancel" onClick={e => handleClick(e)}
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
                    </div>

                    <div id="logo" class="tab-pane fade"><br />

                        <form onSubmit={handleSubmit(values => this.uploadLogo(values))}>

                            <MuiFormFileinputField
                                placeholder="Upload Image"
                                classes={classes}
                                name='image'
                                handleFileChange={this.handleChange}
                                type='image'
                            />

                            <div className={classes.margin} />
                            <div className={classes.margin} />
                            <div className={classes.margin} />

                            <Button
                                type="submit" disabled={!valid || pristine || submitting}
                                intent="primary" text="Upload"
                            />

                            <Button
                                className={classes.margin} name="default" intent="primary"
                                text="Cancel" onClick={e => handleClick(e)}
                            />
                        </form>
                    </div>

                </div>

            </Fragment>
        );
    }

}

EditDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editStakeholder',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditDirectoryInstitution));