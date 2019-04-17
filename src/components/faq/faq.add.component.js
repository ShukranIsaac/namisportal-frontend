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
import { FormTextInputField } from '../forms/form.textinput.field';
import { UserProfile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';

/**
 * Add new question sections(general categories)
 * Add new questions under a section
 * 
 * @author Isaac S. Mwakabira
 */
class CreateQuestion extends Component {

    constructor() {
        super();
        this.state = {}
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

    handleSubmit = (values) => {
        // section under which this question should 
        // be uploaded to
        const { section } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            let question;
            if(values !== null && values !== undefined) {
                // define question structure
                question = {
                    name: values.question,
                    about: values.answer
                }

                this.props.createCategory(section._id, question , user.token);
                // then change state to default
                // so that the page redirects and list all frequently asked questions
                this.props.defaultItem();
            }

        } 
        
    }

    render() {

        const { classes, handleClick, handleSubmit, valid, pristine, submitting } = this.props;

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
                    <span>
                        {/* <Button className={ classes.margin } intent="primary" text="Add" /> */}
                    </span>

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <FormTextInputField 
                        { ...this.props }
                        name="question"
                        placeholder="Type the new question here..."
                        label="Question"
                        type="text"
                    />

                    <FormTextInputField 
                        { ...this.props }
                        name="answer"
                        placeholder="Type the answer to the question..."
                        label="Answer"
                        type="text"
                        multiline={true}
                        rows={8}
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Button 
                        type="submit" disabled={!valid  || pristine || submitting} 
                        intent="success" text="Save" 
                    />
                    
                    <Button 
                        className={ classes.margin } 
                        name="default" 
                        intent="primary" text="Cancel" 
                        onClick={ e => handleClick(e) } 
                    /> 
                
                </form>

            </Fragment>
        );

    }

}

CreateQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createQuestion',
    Validate,
    AsyncValidate
})(withStyles(styles)(CreateQuestion));