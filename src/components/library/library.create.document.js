import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider, FormControl, Paper } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import { UserProfile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

/**
 * Create new rosource type,
 * Create a new library document by categoory or resouce type
 * 
 * @author Isaac S. Mwakabira
 */
class CreateLibraryItem extends Component {

    constructor() {
        super();

        this.state = {
            document,
            add_resource: false,
        }

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteResource = this.handleDeleteResource.bind(this);

    }

	/**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange = (event) => {
        // prevent default events
        event.preventDefault();
        // check if library_resource
        if (event.target.name === 'library_resource') {
            const resourceSelected = event.target.value;
            const resources = this.props.maincategory;
            // if resources not null
            if (resources !== null) {

                // then iterate through the subcategories
                // and filter the chosen section
                const filteredResource = resources.subCategories.length !== 0 && resources.subCategories.filter(resource => {

                    if (resourceSelected !== null && resource !== null) {
                        // check if the chosen resource from the drop down list
                        // equals one of the resources/subCategories
                        // in Library
                        if (resource.name === resourceSelected) {
                            return resource;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }

                });

                // was anything returned
                if (filteredResource) {

                    this.setState({ [event.target.name]: filteredResource[0] });

                }
            }
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }

    }

    handleAddResource = (event) => {
        // prevent default events
        event.preventDefault();
        // if add_resource if false
        // then set it to true else false
        this.setState({ add_resource: true })
    }

    handleDeleteResource = (event) => {
        // prevent default events
        event.preventDefault();
        // get authenticated user token
        const user = UserProfile.get();
        // if resource to delete is selected
        if (event.currentTarget.name === 'delete_resource') {
            if (this.state.library_resource !== null && user !== null) {
                // ids the same: chosen and what is in state
                if (this.state.library_resource._id === event.currentTarget.value) {
                    // proceeed to delete the selected resource or category
                    this.props.archiveCategory(this.state.library_resource, user.token);
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
        // get category
        const { maincategory } = this.props;
        const {
            name, shortname, summary, add_resource,
            resource_name, resource_short_name, resource_summary, supporting_document
        } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (name && shortname && summary) {
                // check if resource or file if being added
                if (!add_resource) {
                    // define file structure
                    const data = {
                        name: name,
                        shortName: shortname,
                        about: summary,
                        file: supporting_document
                    }

                    if (maincategory !== null && maincategory !== undefined) {
                        const { library_resource } = this.state;
                        // create new file
                        this.props.uploadFile(library_resource._id, data, user.token);
                        // then change state to default
                        // so that the page redirects and list all home items
                        this.props.defaultItem();
                    }
                } else {
                    // we are adding a resource category: sub-category essentially
                    // define file structure
                    const resource = {
                        name: resource_name,
                        shortName: resource_short_name,
                        about: resource_summary,
                    }

                    if (maincategory !== null && maincategory !== undefined) {
                        // create new resource category
                        // console.log(resource)
                        this.props.createCategory(maincategory._id, resource, user.token);
                        // then change state.add_resource to false
                        // so that the page shows form fileds to add files and 
                        // supporting documents
                        this.setState({ add_resource: false });

                    }
                }
            }

        }

    }

    render() {

        const { classes, handleClick } = this.props;

        // state
        const { 
            name, shortname, summary, 
            resource_name, resource_short_name, resource_summary, supporting_document
        } = this.state;

        // Library filters/subcategories
        const resources = this.props.maincategory;

        return (
            <Fragment>

                <ButtonControl
                    intent={Intent.NONE}
                    value="List Documents"
                    name="default"
                    handleClick={e => handleClick(e)}
                />

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <Divider />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    {
                        !this.state.add_resource ? (
                            <Fragment>
                                { /** filter categories here */}
                                <FormControl>

                                    <Paper elevation={0}>

                                        <SelectInputControl
                                            name="library_resource"
                                            {...this.state}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="">{`Choose library resource`}</option>
                                            {
                                                (resources !== null && resources !== undefined) && (
                                                    resources.subCategories.length !== 0 && resources.subCategories.map(({ _id, name }, index) => {

                                                        // filters
                                                        return <option id={_id} key={`${index}`} value={name}>{name}</option>

                                                    })
                                                )
                                            }
                                        </SelectInputControl>

                                    </Paper>

                                </FormControl>

                                <Button
                                    className={classes.margin}
                                    name="add_resource"
                                    value={this.state.add_resource}
                                    intent="primary" text="Add Resource"
                                    onClick={e => this.handleAddResource(e)}
                                />

                                {
                                    (this.state.library_resource !== null
                                        && this.state.library_resource !== undefined) && (
                                        <Button
                                            className={classes.margin}
                                            name="delete_resource"
                                            value={this.state.library_resource._id}
                                            intent="danger" text="Delete Selected"
                                            onClick={e => this.handleDeleteResource(e)}
                                        />
                                    )
                                }

                                <div className='margin-fix form-row'>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={this.state.name}
                                            name="name"
                                            label="Name*"
                                            placeholder="Enter document name..."
                                            type="text"
                                            handleChange={this.handleChange}
                                        />
                                    </BootstrapGridColumn>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            name="shortname"
                                            placeholder="Enter document short name..."
                                            type="text"
                                            label="Shortname*"
                                            value={this.state.shortname}
                                            handleChange={this.handleChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>

                                <div className="form-group">
                                    <BootsrapTextareaField
                                        name="summary"
                                        value={this.state.summary}
                                        placeholder="Enter document summary..."
                                        type="text"
                                        label="Summary Text*"
                                        rows={10}
                                        handleChange={this.handleChange}
                                    />
                                </div>

                                <br />

                                <div className="margin-fix form-row" style={{ width: `30%`}}>
                                    <BootstrapGridColumn>
                                        <MuiFormFileinputField
                                            id="pdf_document"
                                            placeholder="Upload PDF Document*"
                                            classes={classes}
                                            name='supporting_document'
                                            handleFileChange={this.handleChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>

                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                <Button
                                    type="submit"
                                    disabled={!(name && shortname && summary && supporting_document)}
                                    intent="success"
                                    text="Save"
                                />

                                <Button
                                    className={classes.margin}
                                    name="default" intent="primary"
                                    text="Cancel"
                                    onClick={e => handleClick(e)}
                                />
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <div className='margin-fix form-row'>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                value={this.state.resource_name}
                                                name='resource_name'
                                                label="Resource*"
                                                placeholder="Enter resource name..."
                                                type="text"
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                name="resource_short_name"
                                                placeholder="Enter document shortname..."
                                                type="text"
                                                label="Shortname*"
                                                value={this.state.resource_short_name}
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                    </div>

                                    <div className="form-group">
                                        <BootsrapTextareaField
                                            value={this.state.resource_summary}
                                            name='resource_summary'
                                            label="Summary*"
                                            placeholder="Enter resource summary..."
                                            type="text"
                                            rows={10}
                                            handleChange={this.handleChange}
                                        />
                                    </div>

                                    <div className={classes.margin} />
                                    <div className={classes.margin} />
                                    <div className={classes.margin} />

                                    <Button
                                        type="submit"
                                        disabled={!(resource_name && resource_short_name && resource_summary)}
                                        intent="success"
                                        text="Save"
                                    />

                                    <Button
                                        className={classes.margin} intent="primary"
                                        text="Cancel" onClick={() => {
                                            if (this.state.add_resource) {
                                                this.setState({ add_resource: false })
                                            }
                                        }}
                                    />
                                </Fragment>
                            )
                    }

                </form>

            </Fragment>
        );

    }

}

CreateLibraryItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(CreateLibraryItem));