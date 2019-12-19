import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { Divider, Paper, FormControl } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';
import Toast from '../../toastfy';

/**
 * Add new question sections(general categories)
 * Add new questions under a section
 * 
 * @author Isaac S. Mwakabira
 */
class CreateQuestion extends Component {

    constructor() {
        super();
        this.state = {
            add_section: false,
            edit_section: false,
            add_category: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    /**
     * On event change, get field name and value, set state
     */
    handleTextChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    // choosen section
    handleChange = (e) => {

        // if chosen section
        if (e.target.name) {
            const sectionName = e.target.value;
            const sections = this.props.maincategory;

            // if sections not null
            if (sections !== null) {

                // then iterate through the subcategories
                // and filter the chosen section
                const filteredSection = sections.subCategories.length !== 0 && sections.subCategories.filter(section => {

                    if (sectionName !== null && section !== null) {
                        // check if the chosen section from the drop down list
                        // equals one of the sections/subCategories
                        // in the Frequently asked questions
                        if (section.name === sectionName) {
                            return section;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }

                });

                // was anything returned
                if (filteredSection) {

                    this.setState({ [e.target.name]: filteredSection[0], add_category: false });

                }

            }

        }

    }

    handleAddSection = (event) => {
        // prevent default events
        event.preventDefault();
        // if add_section if false
        // then set it to true else false
        this.setState({ add_section: true, edit_section: false })
    }

    handleEditSection = (event) => {
        // prevent default events
        event.preventDefault();
        // if edit_resource if false
        // then set it to true else false
        this.setState({ edit_section: true, add_section: false })
    }

    handleDeleteSection = (event) => {
        // prevent default events
        event.preventDefault();
        // get authenticated user token
        const user = UserProfile.get();
        // if section to delete is selected
        if (event.currentTarget.name === 'delete_section') {
            if (this.state.section !== null && user !== null) {
                // ids the same: chosen and what is in state
                if (this.state.section._id === event.currentTarget.value) {
                    // proceeed to delete the selected section or category
                    this.props.archiveResourceCategory(
                        this.state.section,
                        user.token,
                        this.props.capitalize(this.props.link)
                    );
                }
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // section under which this question should 
        // be uploaded to
        const { section } = this.state;
        const {
            _question, answer, shortname,
            section_name, section_short_name, section_summary,
            resource_name, resource_short_name, resource_summary
        } = this.state;

        const emptyQFields = _question && answer && shortname ? false : true;
        const emptySFields = section_name && section_short_name && section_summary ? false : true;

        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            let edited_question;
            // check if resource or file if being added
            if (this.state.add_section) {
                // we are adding a section category: sub-category essentially
                // define object structure
                const add_section = {
                    name: section_name,
                    shortName: section_short_name,
                    about: section_summary,
                }

                // category to add sections to: Faqs
                const { maincategory } = this.props;
                // then check if null and undefined, then proceed otherwise
                if (maincategory !== null && maincategory !== undefined && !emptySFields) {
                    // create new section category
                    this.props.addResourceCategory(
                        maincategory._id,
                        add_section,
                        user.token,
                        this.props.capitalize(this.props.link)
                    );
                    // then change state.add_section to false
                    // so that the page shows form fileds to add questions
                    this.setState({ add_section: false, add_category: true });
                }

            } else if (this.state.edit_section) {
                // we are editing a resource category: sub-category essentially
                // define file structure
                const edited_section = {
                    name: resource_name,
                    shortName: resource_short_name,
                    about: resource_summary,
                }

                // category to add sections to: Faqs
                const { maincategory } = this.props;

                if (maincategory !== null && maincategory !== undefined) {
                    // make request
                    this.props.editResourceCategory(
                        section._id, // resource to be edited
                        edited_section, // edited params
                        user.token, // authenticated account
                        this.props.capitalize(this.props.link)
                    );
                    // then change state.edit_resource to false
                    // so that the page shows form fields to add files and 
                    // supporting documents
                    this.setState({ edit_resource: false, add_category: true });
                }
            } else {
                // define edited_question structure
                edited_question = {
                    name: _question,
                    shortName: shortname,
                    about: answer
                }

                if (section) {
                    if (!emptyQFields) {
                        // create new question under section selected
                        this.props.createCategory(
                            section._id,
                            edited_question,
                            user.token,
                            this.props.capitalize(this.props.link)
                        );
                    }
                } else {
                    // toast message for user feedback
                    Toast.emit({
                        type: Toast.TYPES.WARN,
                        message: `  Please make sure all fields are filled!!`
                    })
                }
            }

        }

    }

    addSection = () => {

        const { classes } = this.props;
        const {
            section_name, section_short_name, section_summary
        } = this.state;

        const emptySFields = section_name && section_short_name && section_summary ? false : true;

        return (
            <Fragment>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={this.state.section_name}
                            name='section_name'
                            label="Section*"
                            placeholder="Enter section name..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name="section_short_name"
                            label="Shortname*"
                            placeholder="Enter section shortname..."
                            type="text"
                            value={this.state.shortName}
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>
                <div className="form-group">
                    <BootsrapTextareaField
                        name='section_summary'
                        value={this.state.section_summary}
                        label="Summary*"
                        placeholder="Enter section summary..."
                        type="text"
                        rows={10}
                        handleChange={this.handleTextChange}
                    />
                </div>

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <Button
                    type="submit" disabled={emptySFields}
                    intent="success" text="Save"
                />

                <Button
                    className={classes.margin} intent="primary"
                    text="Cancel" onClick={() => {
                        if (this.state.add_section) {
                            this.setState({ add_section: false, add_category: true })
                        }
                    }}
                />
            </Fragment>
        );

    }

    editSection = () => {

        const { classes } = this.props;

        const { section, resource_name, resource_short_name, resource_summary } = this.state;

        return (
            <Fragment>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={section ? (resource_name ? resource_name : section.name) : null}
                            name='resource_name'
                            label="Resource*"
                            placeholder="Edit resource name..."
                            type="text"
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            name="resource_short_name"
                            placeholder="Edit document shortname..."
                            type="text"
                            label="Shortname*"
                            value={section ? (resource_short_name ? resource_short_name : section.shortName) : null}
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>

                <div className="form-group">
                    <BootsrapTextareaField
                        value={section ? (resource_summary ? resource_summary : section.about) : null}
                        name='resource_summary'
                        label="Summary*"
                        placeholder="Edit resource summary..."
                        type="text"
                        rows={10}
                        handleChange={this.handleTextChange}
                    />
                </div>

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <Button
                    type="submit"
                    disabled={!(resource_name || resource_short_name || resource_summary)}
                    intent="success"
                    text="Save"
                />

                <Button
                    className={classes.margin} intent="primary"
                    text="Cancel" onClick={() => {
                        if (this.state.edit_section) {
                            this.setState({ edit_section: false, add_category: true })
                        }
                    }}
                />
            </Fragment>
        );

    }

    render() {

        const { classes, handleClick } = this.props;
        const {
            _question, answer, shortname,
        } = this.state;

        const emptyQFields = _question && answer && shortname ? false : true;
        // Frequently asked question sections
        const sections = this.props.maincategory;

        return (
            <Fragment>

                <ButtonControl
                    intent={Intent.NONE}
                    value="List Questions"
                    name="default"
                    handleClick={e => handleClick(e)}
                />

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <Divider />

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    {
                        (!this.state.add_section && !this.state.edit_section) ? (
                            <Fragment>
                                { /** filter sections here */}
                                <FormControl>

                                    <Paper elevation={0}>

                                        <SelectInputControl
                                            name="section"
                                            {...this.state}
                                            // value={this.state.section}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="">{`Choose section`}</option>
                                            {
                                                (sections !== null && sections !== undefined) && (
                                                    sections.subCategories.length !== 0 && sections.subCategories.map(({ _id, name }, index) => {

                                                        // section
                                                        return <option id={_id} key={`${index}`} value={name}>{name}</option>

                                                    })
                                                )
                                            }
                                        </SelectInputControl>

                                    </Paper>

                                </FormControl>

                                { /** New frequently asked questions section */}
                                <Button
                                    className={classes.margin}
                                    name="add_section"
                                    value={this.state.add_section}
                                    intent="primary" text="Add Section"
                                    onClick={e => this.handleAddSection(e)}
                                />

                                {
                                    (this.state.section !== null
                                        && this.state.section !== undefined) && (
                                        // show these buttons only when
                                        // an item is selected.
                                        !this.state.add_category && (
                                            <>
                                                <Button
                                                    className={classes.margin}
                                                    name="edit_section"
                                                    value={this.state.edit_section}
                                                    intent="primary" text="Edit Selected"
                                                    onClick={e => this.handleEditSection(e)}
                                                />
                                                <Button
                                                    className={classes.margin}
                                                    name="delete_section"
                                                    value={this.state.section._id}
                                                    intent="danger" text="Delete Selected"
                                                    onClick={e => this.handleDeleteSection(e)}
                                                />
                                            </>
                                        )
                                    )
                                }

                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                {
                                    (sections !== null && sections !== undefined) && (
                                        sections.subCategories.length !== 0 && (
                                            <>
                                                <div className='margin-fix form-row'>
                                                    <BootstrapGridColumn>
                                                        <BootsrapTextField
                                                            name="_question"
                                                            value={this.state._question}
                                                            label="Question*"
                                                            type="text"
                                                            placeholder="Enter new question here..."
                                                            handleChange={this.handleTextChange}
                                                        />
                                                    </BootstrapGridColumn>
                                                    <BootstrapGridColumn>
                                                        <BootsrapTextField
                                                            name="shortname"
                                                            type="text"
                                                            placeholder="Enter question shortname..."
                                                            label="Shortname*"
                                                            value={this.state.question}
                                                            handleChange={this.handleTextChange}
                                                        />
                                                    </BootstrapGridColumn>
                                                </div>
                                                <div className="form-group">
                                                    <BootsrapTextareaField
                                                        name="answer"
                                                        value={this.state.question}
                                                        placeholder="Enter answer to the question..."
                                                        label="Answer*"
                                                        type="text"
                                                        rows={10}
                                                        handleChange={this.handleTextChange}
                                                    />
                                                </div>
                                            </>
                                        )
                                    )
                                }

                                <div className={classes.margin} />
                                <div className={classes.margin} />

                                <Button
                                    type="submit" disabled={emptyQFields}
                                    intent="success" text="Save"
                                />

                                <Button
                                    className={classes.margin}
                                    name="default"
                                    intent="primary" text="Cancel"
                                    onClick={e => handleClick(e)}
                                />
                            </Fragment>
                        ) : (
                                <Fragment>
                                    {
                                        this.state.add_section && this.addSection()
                                    }

                                    {
                                        this.state.edit_section && this.editSection()
                                    }
                                </Fragment>
                            )
                    }

                </form>

            </Fragment>
        );

    }

}

CreateQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(CreateQuestion));