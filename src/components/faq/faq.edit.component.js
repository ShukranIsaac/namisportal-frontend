import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { Divider, Paper, FormControl } from '@material-ui/core';
import styles from '../contact/form.styles';
import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';
import { UserProfile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Edit a particular question 
 * regardless of which section it belongs to
 * 
 * @author Isaac S. Mwaakabira
 */
class EditQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            question: props.question 
        }
    }

    // choosen section
    handleChange = (e) => {

        // if chosen section
        if(e.target.name) {
            const sectionName = e.target.value;
            const sections = this.props.subcategory;
            
            // if sections not null
            if (sections !== null) {
                
                // then iterate through the subcategories
                // and filter the chosen section
                const filteredSection = sections.subCategories.length !== 0 && sections.subCategories.filter(section => {

                    if (sectionName !== null && section !== null) {
                        // check if the chosen section from the drop down list
                        // equals one of the sections/subCategories
                        // in the Frequently asked questions
                        if(section.name === sectionName) {
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

                    this.setState({ [e.target.name]: filteredSection[0] });

                }

            }

        }

    }

    handleAddSection = (event) => {
        // prevent default events
        event.preventDefault();
        // if add_section if false
        // then set it to true else false
        this.setState({ add_section: true })
    }

    handleDeleteSection = (event) => {
        // prevent default events
        event.preventDefault();
        // get authenticated user token
        const user = UserProfile.get();
        // if section to delete is selected
        if(event.currentTarget.name === 'delete_section') {
            if(this.state.section !== null && user !== null) {
                // ids the same: chosen and what is in state
                if (this.state.section._id === event.currentTarget.value) {
                    // proceeed to delete the selected section or category
                    this.props.archiveCategory(this.state.section, user.token);
                    // then change state to default
                    // so that the page redirects and list all home items
                    this.props.defaultItem();
                }
            }
        }
    }

    handleSubmit = (values) => {
        // question
        const { question } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {
            let edited_question;
            if(values !== null && values !== undefined) {
                // check if resource or file if being added
                if(values.question !== undefined && values.answer !== null) {
                    // get edited_question structure
                    edited_question = {
                        name: values.question,
                        about: values.answer
                    }

                    // question defined
                    if (question !== null) {
                        // then edit this edited_question
                        this.props.editCategory(question._id, edited_question, user.token);
                        // then change state to default
                        // so that the page redirects and list all FAQs
                        this.props.defaultItem();
                    }
                } else {
                    // we are adding a section category: sub-category essentially
                    // define file structure
                    const section = {
                        name: values.section_name,
                        about: values.section_summary,
                    }

                    // category to add sections to: Faqs
                    const { subcategory } = this.props;
                    // then check if null and undefined, then proceed otherwise
                    if (subcategory !== null && subcategory !== undefined) {
                        // create new section category
                        this.props.createCategory(subcategory._id, section, user.token);
                        // then change state.add_section to false
                        // so that the page shows form fileds to add questions
                        this.setState({ add_section: false });
                    }
                }
            }

        } 
        
    }

    /**
     * Delete question
     */
    archiveCategory = (event) => {

        event.preventDefault();
        // question to be edited
        const { question } = this.props;
        // if question exists then delete
        if(question !== null && question._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(question, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }
        }

    }

    render() {

        const { classes, handleClick, handleSubmit, valid, pristine, submitting, general } = this.props;

        // Frequently asked question sections
        const sections = this.props.subcategory;

        return (
            <Fragment>

                <ButtonControl 
                    intent={Intent.NONE} 
                    value="List Questions"
                    name="default"
                    handleClick={e => handleClick(e) }
                />

                <ButtonControl 
                    intent={Intent.NONE} 
                    value="New Question"
                    name="create"
                    handleClick={e => handleClick(e) }
                />

                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>

                <Divider />

                <form onSubmit= { handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    {
                        !this.state.add_section ? (
                            <Fragment>
                                { /** filter sections here */}
                                <FormControl>

                                    <Paper elevation={0}>
                                        
                                        <SelectInputControl 
                                            name="section"
                                            { ...this.state }
                                            // value={ this.state.section }
                                            onChange={ e => this.handleChange(e) }
                                        >
                                            <option value="">{ `Choose section` }</option>
                                            {
                                                (sections !== null && sections !== undefined) && (
                                                    sections.subCategories.length !== 0 && sections.subCategories.map(({ _id, name }, index) => {
                                
                                                        // section
                                                        return <option id={ _id } key={ `${ index }`} value={ name }>{ name }</option>
                                                    
                                                    })
                                                )
                                            }
                                        </SelectInputControl>

                                    </Paper>

                                </FormControl>

                                { /** New frequently asked questions section */}
                                <Button 
                                    className={ classes.margin } 
                                    name="add_section"
                                    value={ this.state.add_section }
                                    intent="primary" text="Add Section"
                                    onClick={ e => this.handleAddSection(e) } 
                                />

                                {
                                    (this.state.section !== null 
                                    && this.state.section !== undefined) && (
                                        <Button 
                                            className={ classes.margin } 
                                            name="delete_section"
                                            value={ this.state.section._id }
                                            intent="danger" text="Delete Selected"
                                            onClick={ e => this.handleDeleteSection(e) } 
                                        />
                                    )
                                }

                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>

                                {
                                    this.state.question !== null && (
                                        <Fragment>
                                            <FormTextInputField 
                                                { ...this.props }
                                                name="question"
                                                value={ this.state.question.name }
                                                placeholder="Edit question here..."
                                                label="Question"
                                                type="text"
                                            />

                                            <FormTextInputField 
                                                { ...this.props }
                                                name="answer"
                                                value={ this.state.question.about }
                                                placeholder="Edit the answer to the question..."
                                                label="Answer"
                                                type="text"
                                                multiline={true}
                                                rows={8}
                                            />

                                            {
                                                general !== undefined && general.isLoading ? (<div className="loader" />) : null
                                            }

                                        </Fragment>
                                    )
                                }

                                <div className={ classes.margin }/>
                                <div className={ classes.margin }/>

                                <Button 
                                    className={ classes.margin }
                                    type="submit" disabled={!valid  || pristine || submitting} 
                                    intent="success" text="Save" 
                                />
                                
                                <Button 
                                    className={ classes.margin } 
                                    name="default" 
                                    intent="primary" text="Cancel" 
                                    onClick={ e => handleClick(e) } 
                                />

                                {
                                    this.state.question !== null && (
                                        <Button 
                                            id={ this.state.question._id }
                                            className={ classes.margin } 
                                            name="archive" 
                                            intent="primary" text="Delete" 
                                            onClick={ e => this.archiveCategory(e) } 
                                        />
                                    )
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                <FormTextInputField 
                                    classes={ classes }
                                    name='section_name'
                                    label="Section"
                                    placeholder="Enter section name..."
                                    type="text"
                                />

                                <FormTextInputField 
                                    classes={ classes }
                                    name='section_summary' 
                                    label="Summary"
                                    placeholder="Enter section summary..."
                                    type="text"
                                    multiline={true}
                                    rows="3"
                                />

                                <div className={ classes.margin } />
                                <div className={ classes.margin } />
                                <div className={ classes.margin } />

                                <Button 
                                    type="submit" disabled={!valid || pristine || submitting}
                                    intent="success" text="Save" 
                                />
                                
                                <Button 
                                    className={ classes.margin } intent="primary" 
                                    text="Cancel" onClick={ () => {
                                        if (this.state.add_section) {
                                            this.setState({ add_section: false })
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

EditQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editQuestion',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditQuestion));