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

import MultiStepForm from '../forms/form.multistep';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for a license.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class LicensingProcess extends Component {

    /**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange = (event) => {
        
        this.setState({[event.target.name]: event.target.value});
  
    }

    handleSubmit = (values) => {
        // category under which this subcategory should 
        // be uploaded to
        const { category } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if(user !== null && user.token !== undefined) {

            let sub_category;
            if(values !== null && values !== undefined) {
                // define sub-category structure
                sub_category = {
                    name: values.subcategory,
                    about: values.about
                }

                console.log(sub_category)
                console.log(category)
                // this.props.createCategory(category._id, sub_category , user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }

        } 
        
    }

    render() {

        const { classes, handleClick, handleSubmit, valid, pristine, submitting } = this.props;

        return (
            <Fragment>
                <div >

                    <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) }>

                        <ButtonControl 
                            intent={Intent.NONE} 
                            value="New SubCategory"
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
                            name='about'
                            component={ input => {
                                return (
                                    <RenderBootstrapField
                                        classes={ classes }
                                        id="about"
                                        label='Summary'
                                        defaultValue="New sub-category about..."
                                        name="about"
                                        type="text"
                                        props={ input }
                                    />
                                );
                            }}
                            multiline={true}
                            rows="10"
                        />

                        <MultiStepForm steps={ steps }/>

                        <div className={ classes.margin } />
                        <div className={ classes.margin } />
                        <div className={ classes.margin } />

                        <Button type="submit" disabled={!valid  || pristine || submitting} intent="success" text="Save" />
                        
                        <Button className={ classes.margin } name="default" intent="primary" text="Cancel" onClick={ e => handleClick(e) } /> 

                    </form>
    
                    <div className="container app-footer">
                        <h6>Press 'Enter' or click on progress bar for next step.</h6>
                    </div>
    
                </div>
            </Fragment>
        );

    }

}

const steps = [
    {name: 'Concept Note', },
    {name: 'Note Appraisal', },
    {name: 'Prefeasibility Study and draft Business Plan', },
    {name: 'Application for Grant', },
    {name: 'Preliminary Evaluation of Grant Application', }
];

LicensingProcess.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'createLicensing',
    Validate,
    AsyncValidate
})(withStyles(styles)(LicensingProcess));