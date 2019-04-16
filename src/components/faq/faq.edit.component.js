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

    constructor() {
        super();
        this.state = {}
    }

    handleChange = (e) => {

        console.log(e.target.value);

    }

    handleSubmit = (values) => {

        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

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

EditQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'editQuestion',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditQuestion));