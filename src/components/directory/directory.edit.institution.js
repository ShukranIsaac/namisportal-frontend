import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm, Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditDirectoryInstitution extends Component {

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
        
        const target = event.target;
        // console.log(target);
        this.setState({ [target.name]: target === 'checked' ? target.checked : target.value });
  
    }

    handleSubmit = (values) => {
        // stakeholder to be edited
        const { stakeholder } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {
            
            let edited_stakeholder;
            if(values !== null && values !== undefined) {
                
                // stakeholder structure
                edited_stakeholder = {
                    name: values.subcategory,
                    about: values.about
                }
                console.log(stakeholder)
                console.log(edited_stakeholder)
                // then edit this stakeholder
                // this.props.editStakeholder(stakeholder._id, edited_stakeholder, user.token);
                // then change state to default
                // so that the page redirects and list all diretory stakeholders
                // this.props.defaultItem();
            }

        } 

    }

    render() {

        const { 
            classes, stakeholder, handleClick, handleSubmit,
            valid, pristine, submitting
        } = this.props;
        console.log(stakeholder)
        /**
         * If the stakeholder is not defined and has no data just return.
         */
        if(stakeholder === null && stakeholder.name === undefined) {
            return <Fragment/>;
        }
        
        return (
            <Fragment>

                <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } >

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Stakeholder"
                        name="create"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <Field
                        name='stakeholder_name'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label='Stakeholders Name'
                                    defaultValue="Edit stakeholder name..."
                                    value={ stakeholder.name }
                                    name="stakeholder_name"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                    />
                    <br/>

                    <Field
                        name='mission'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label='Mission Statement'
                                    defaultValue="Edit mission statement..."
                                    value={ stakeholder.mission }
                                    name="mission"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                        multiline={true}
                        rows="15"
                    />
                    {/* <br/> */}

                    <Field
                        name='summary'
                        component={ input => {
                            return (
                                <RenderBootstrapField
                                    classes={ classes }
                                    label={ stakeholder.name }
                                    defaultValue="Edit stakeholders summary..."
                                    value={ stakeholder.mission }
                                    name="summary"
                                    type="text"
                                    props={ input }
                                />
                            );
                        }}
                        multiline={true}
                        rows="15"
                    />

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    {/* <ButtonControl 
                        intent={Intent.PRIMARY} 
                        value="Save"
                        name="save"
                        handleClick={e => this.handleSubmit(e) }
                    /> */}
                    <Button type="submit" disabled={!valid  || pristine || submitting} intent="primary" text="Save" />

                    {/* <ButtonControl 
                        intent={Intent.SUCCESS} 
                        value="Publish" 
                        name="publish"
                        handleClick={e => handleClick(e) } 
                    /> */}

                    {/* <ButtonControl 
                        intent={Intent.WARNING} 
                        value="Unpublish" 
                        name="unpublish"
                        handleClick={e => handleClick(e) } 
                    /> */}

                    {/* <ButtonControl 
                        intent={Intent.DANGER} 
                        value="Archive"
                        name="archive"
                        handleClick={e => handleClick(e) } 
                    /> */}
                    <Button className={ classes.margin } name="default"  intent="danger" text="Archive" onClick={ e => this.handleClick } />
                
                </form>

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