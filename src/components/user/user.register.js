import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import RenderBootstrapField from '../contact/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';
import UserFormCheckbox from './form.checkbox';

import styles from '../contact/form.styles';

class UserRegistration extends Component {

    constructor() {
      super();
      this.state = {
         email: '',
         user_name: '',
         password: '',
         confirmPassword: '',
         website: '',
         telephone: '',
         fax: '',
         company_name: '',
         physical_address: '',
         stakeholder_type: [],
      }

      this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

    personal = (props) => {

        return (
          <>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Username'
                defaultValue= "Your username..."
                name="user_name"
                type="text"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Email'
                defaultValue= "Your email..."
                name="email"
                type="email"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Password'
                defaultValue= "Your password..."
                name="password"
                type="password"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Confirm Password'
                defaultValue= "Confirm your password..."
                name="password"
                type="password"
                onChange={ this.handleChange }
              />
            </div>
          </>
        );

    }

    company = (props) => {

      return (
        <>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Company name(Legal)'
              defaultValue= "Campany name..."
              name="company_name"
              type="text"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Address'
              defaultValue= "Physical address..."
              name="physical_address"
              type="text"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Telephone'
              defaultValue= "Campany telephone number..."
              name="telephone"
              type="text"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Fax'
              defaultValue= "Campany fax number..."
              name="fax"
              type="text"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Email'
              defaultValue= "Campany email address..."
              name="email"
              type="email"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Website URL'
              defaultValue= "Campany website..."
              name="website"
              type="text"
              onChange={ this.handleChange }
            />
          </div>
        </>
      );
    }

    render() {

      const { handleSubmit, pristine, submitting, classes } = this.props;

      return (
        <>

          <Flex
            wrap
            align='center'
            justify='center'
            m={1}
            w={1}
            p={3}
            className='landing-info'>

            <form onSubmit={handleSubmit} autoComplete="off">

              <Card elevation={Elevation.TWO}>

                <Box w={1/2} p={1}>
                  <FormLabel component="legend">Personal Account</FormLabel>
                  { this.personal(this.props) }
                </Box>

                <Box w={1/2} p={1}>
                  <FormLabel component="legend">Company Account</FormLabel>
                  { this.company(this.props) }
                </Box>
                <div className={classes.margin}>

                  <Button type="submit" disabled={pristine || submitting} intent="success" text="Register" />

                </div>
              </Card>

            </form>

          </Flex>

        </>
      );

    }
}

UserRegistration.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({
  form: "UserRegistrationForm",
  Validate,
  AsyncValidate
})(withStyles(styles)(UserRegistration));