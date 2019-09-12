import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider, Paper, FormControl } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

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
    handleTextChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });

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
                    this.props.archiveCategory(
                        this.state.stakeholder_type,
                        user.token,
                        this.props.capitalize(this.props.link)
                    );
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            }
        }
    }

    handleSubmit = (event) => {
        // prevent default behaviour
        event.preventDefault();
        // category under which this stakeholder should 
        // be uploaded to
        const {
            add_stakeholder_type, stakeholder_type,
            stakeholder_type_name, stakeholder_type_shortname, stakeholder_type_summary,
            telephone, stakeholder_name,
            website, email, physical_address,
            mission, vision, summary,
        } = this.state;

        const empty = (telephone && stakeholder_name && website && email && physical_address && mission && vision && summary);

        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (!add_stakeholder_type) {
                // define sub-category structure
                const stakeholder = {
                    name: stakeholder_name,
                    about: physical_address,
                    mission: mission,
                    vision: vision,
                    contacts: {
                        email: email,
                        telephone: telephone,
                        website: website,
                        address: physical_address
                    }
                }

                // this.props.createStakeholder(stakeholder, user.token);
                /**
                 * create new stakeholder under category selected
                 */
                if (empty) {
                    this.props.createCategory(
                        stakeholder_type._id,
                        stakeholder,
                        user.token,
                        this.props.capitalize(this.props.link)
                    );
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            } else {
                // we are adding a stakeholder category: sub-category essentially
                // define object structure
                const stakeholderType = {
                    name: stakeholder_type_name,
                    shortName: stakeholder_type_shortname,
                    about: stakeholder_type_summary,
                }

                // category to add stakeholders to: Directory
                const { maincategory } = this.props;
                // then check if null and undefined, then proceed otherwise
                if (maincategory !== null && maincategory !== undefined) {
                    // create new stakeholderType category
                    this.props.createCategory(
                        maincategory._id,
                        stakeholderType,
                        user.token,
                        this.props.capitalize(this.props.link)
                    );
                    // then change state.add_stakeholder_type to false
                    // so that the page shows form fileds to add stakeholder types
                    this.setState({ add_stakeholder_type: false });
                }
            }

        }

    }

    addStakeholderType = () => {

        return (
            <>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={this.state.stakeholder_type_name}
                            name='stakeholder_type_name'
                            label="Type*"
                            placeholder="Enter stakeholder type name..."
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name="stakeholder_type_shortname"
                            type="text"
                            placeholder="Enter stakeholder type shortname..."
                            label="Shortname*"
                            value={this.state.stakeholder_type_shortname}
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>

                <div className="form-group">
                    <BootsrapTextareaField
                        name="stakeholder_type_summary"
                        value={this.state.stakeholder_type_summary}
                        placeholder="Enter stakeholder type summary..."
                        label="Summary Text*"
                        type="text"
                        rows={10}
                        handleChange={this.handleTextChange}
                    />
                </div>
            </>
        );

    }

    render() {

        const { classes, handleClick } = this.props;

        // state
        const {
            stakeholder_type_name, stakeholder_type_shortname, stakeholder_type_summary,
            telephone, stakeholder_name,
            website, email, physical_address,
            mission, vision, summary,
        } = this.state;

        const isRequired = stakeholder_name && website && email && mission && vision && summary && telephone && physical_address;

        // List of Stakeholder types/categories
        const stakeholderTypes = this.props.maincategory;

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

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
                                    this.addStakeholder()
                                }

                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                <Button
                                    type="submit"
                                    disabled={!isRequired}
                                    intent="success"
                                    text="Save"
                                />

                                <Button
                                    className={classes.margin}
                                    name="default" intent="primary" text="Cancel"
                                    onClick={e => handleClick(e)}
                                />

                            </>
                        ) : (
                                <>
                                    {
                                        this.addStakeholderType()
                                    }

                                    <div className={classes.margin} />
                                    <div className={classes.margin} />
                                    <div className={classes.margin} />

                                    <Button
                                        type="submit"
                                        disabled={!(stakeholder_type_name && stakeholder_type_shortname && stakeholder_type_summary)}
                                        intent="success"
                                        text="Save"
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

                </form>

            </Fragment>
        );

    }

    addStakeholder = () => {

        // state 
        const {
            telephone, stakeholder_name,
            website, image, email, physical_address,
            mission, vision, summary,
        } = this.state;

        return (
            <>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name='stakeholder_name'
                            value={stakeholder_name}
                            label="Stakeholder's Name (Legal)*"
                            placeholder="Stakeholder name..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name='website'
                            value={website}
                            label="Website*"
                            placeholder="Stakeholder's website..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name='email'
                            value={email}
                            label="Email*"
                            placeholder="Stakeholder's email address..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name='telephone'
                            value={telephone}
                            label="Telephone*"
                            placeholder="Stakeholder's telephone number..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name='image'
                            value={image}
                            label="Image Url"
                            placeholder="Stakeholder's image..."
                            type="text"
                            handleChange={this.handleTextChange}
                            disabled={true}
                        />
                    </BootstrapGridColumn>
                </div>
                <div className="form-group">
                    <BootsrapTextareaField
                        name="physical_address"
                        value={physical_address}
                        placeholder="Stakeholder's physical address..."
                        label="Physical Address*"
                        type="text"
                        rows={1}
                        handleChange={this.handleTextChange}
                    />
                </div>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <div className="form-group">
                            <BootsrapTextareaField
                                name='mission'
                                value={mission}
                                label="Mission Statement*"
                                placeholder="Enter stakeholder's mission..."
                                type="text"
                                rows={6}
                                handleChange={this.handleTextChange}
                            />
                        </div>
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <div className="form-group">
                            <BootsrapTextareaField
                                name='vision'
                                value={vision}
                                label="Vision*"
                                placeholder="Enter stakeholders vision..."
                                type="text"
                                rows={6}
                                handleChange={this.handleTextChange}
                            />
                        </div>
                    </BootstrapGridColumn>
                </div>
                <div className="form-group">
                    <BootsrapTextareaField
                        name="summary"
                        value={summary}
                        placeholder="Stakeholder's physical address..."
                        label="Summary Background*"
                        type="text"
                        rows={8}
                        handleChange={this.handleTextChange}
                    />
                </div>
            </>
        );

    }

}

CreateDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(CreateDirectoryInstitution));