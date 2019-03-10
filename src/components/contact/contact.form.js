import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form';

import { Button } from '@blueprintjs/core';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from './form.async-validate';
import Validate from './email.validate';

import styles from './form.styles';
import { UserProfile } from '../user/user.profile';
import { redirect } from '../user/user.redirect';

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

    handleSubmit = (values) => {

      // console.log(values);
      if(values !== null && values !== undefined) {
        // define sub-category structure
        const contact_us = {
            fullname: values.fullname,
            email: values.email,
            subject: values.subject,
            message: values.message
        }

        console.log(contact_us);
        this.props.contactUs(contact_us , UserProfile.token);
        // then redirect user accordingly
        redirect.to({ url: `/faq` });
      }

    }

    render() {

        const { handleSubmit, pristine, submitting } = this.props;

        return (
          
          <form 
            className={{style: 'center'}} 
            onSubmit={ handleSubmit(values => this.handleSubmit(values)) } 
            autoComplete="off"
          >
            <Container>
              <Row>
                <Col>
                  <Field
                    name='fullname'
                    component={ input => {
                      return (
                        <RenderBootstrapField
                          { ...this.props }
                          label='Fullname'
                          defaultValue= "Your fullname..."
                          name="fullname"
                          type="text"
                          props={ input }
                          className='test-this'
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
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
                          props={ input }
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    name='subject'
                    component={ input => {
                      return (
                        <RenderBootstrapField
                          { ...this.props }
                          label='Subject'
                          defaultValue= "Your message subject..."
                          name="subject"
                          type="text"
                          props={ input }
                          className='test-this'
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
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
                          props={ input }
                        />
                      );
                    }}
                    multiline={true}
                    rows={10}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button style={{alignSelf: 'center'}} type="submit" disabled={pristine || submitting} intent="success" text="Send" />
                </Col>
              </Row>
            </Container>
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
