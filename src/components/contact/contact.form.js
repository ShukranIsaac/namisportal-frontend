import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { Button } from '@blueprintjs/core';

import AsyncValidate from './form.async-validate';
import Validate from './email.validate';

import styles from './form.styles';
import { redirect } from '../user/user.redirect';
import { FormTextInputField } from '../forms/form.textinput.field';

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
            fullName: values.fullname,
            email: values.email,
            subject: values.subject,
            message: values.message
        }

        // send message
        this.props.contactUs(contact_us);
      }

    }

    render() {

        const { handleSubmit, pristine, submitting, contact_us } = this.props;
        
        // contact.log(contact);
        if (contact_us !== undefined && contact_us !== null) {
          const { success } = contact_us;
          // then redirect user accordingly
          if (success) {
            console.log(contact_us);
            return redirect.to({ url: `/faq` });
          }

        }

        return (
          
          <form 
            className={{style: 'center'}} 
            onSubmit={ handleSubmit(values => this.handleSubmit(values)) } 
            autoComplete="off"
          >
            <Container>
              <Row>
                <Col>
                  <FormTextInputField name='fullname' label='Fullname' type='text' placeholder='Your fullname...' {...this.props} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormTextInputField name='email' label='Email' type='email' placeholder='Your email...' {...this.props} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormTextInputField name='subject' label='Subject' type='text' placeholder='Your message subject...' {...this.props} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormTextInputField 
                    name='message' 
                    label='Message' 
                    type='text' 
                    placeholder='Your message...' 
                    {...this.props} 
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
