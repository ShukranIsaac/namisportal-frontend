import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form';

import { Button } from '@blueprintjs/core';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from './form.async-validate';
import Validate from './email.validate';

import styles from './form.styles';

class ContactForm extends Component {

    constructor() {
      super();
      this.state = {
         email: '',
         message: '',
         fullname: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

    handleSubmit = (event, values) => {

      // event.preventDefault();
      console.log(values);

    }

    render() {

        const { handleSubmit, pristine, submitting, classes } = this.props;

        return (
          <form 
            className={{style: 'center'}} 
            onSubmit={ (e) => handleSubmit(values => this.handleSubmit(e, values)) } 
            autoComplete="off"
          >
            <div>
              <Field
                name='fullname'
                component={ input => {
                  return (
                    <RenderBootstrapField
                      { ...this.props }
                      label='Full name'
                      defaultValue= "Your full name..."
                      name="fullname"
                      type="text"
                      onChange={ this.handleChange }
                      props={ input }
                    />
                  );
                }}
              />
            </div>
            <div>
              <Field
                name='email'
                component={ input => {
                  return (
                    <RenderBootstrapField
                      { ...this.props }
                      label='Email'
                      defaultValue= "Your email..."
                      name="email"
                      type="email"
                      onChange={ this.handleChange }
                      props={ input }
                    />
                  );
                }}
              />
            </div>
            <div>
              <Field
                name='message'
                component={ input => {
                  return (
                    <RenderBootstrapField
                      { ...this.props }
                      label='Message'
                      defaultValue= "Your message..."
                      name="message"
                      type="text"
                      onChange={ this.handleChange }
                      props={ input }
                    />
                  );
                }}
                multiline={true}
                rows={10}
              />
            </div>
            <div className={classes.margin}>
              <Button type="submit" disabled={pristine || submitting} intent="success" text="Send" />
            </div>
          </form>
        );

    }

}

ContactForm.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({
  form: "contact",
  Validate,
  AsyncValidate
})(withStyles(styles)(ContactForm));
