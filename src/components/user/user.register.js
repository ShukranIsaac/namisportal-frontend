import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { redirect } from './user.redirect';
import { CompanyProfile } from './user.register.company';
import { PersonalProfile } from './user.register.personal';
import { InputLabel } from '@material-ui/core';

class UserRegistration extends Component {

    constructor() {
      super();
      this.state = {
         email: '',
         username: '',
         password: '',
         firstName: '',
         lastName: '',
         confirmPassword: '',
         website: '',
         telephone: '',
         fax: '',
         companyName: '',
         companyEmail: '',
         physicalAddress: '',
         stakeholderType: [],
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (event) => {
      // console.log(event.target.name)
      this.setState({
        [event.target.name]: event.target !== 'checked' ? event.target.value : event.target.checked 
      });

    }

    handleClick = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

    handleSubmit = (values) => {
      // Prevent default submit action
      // event.preventDefault();
      // define user structure
      const user = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      }
      // console.log(user);
      // define company structure
      const company = {
        companyName: values.companyName,
        physicalAddress: values.physicalAddress,
        telephone: values.telephone,
        fax: values.fax,
        companyEmail: values.companyEmail,
        website: values.website,
      }
      console.log(company);
      if (user !== undefined && user.username !== undefined && user !== null) {

        const { register } = this.props;
        // register this user
        register(user);

      }

    }

    render() {

      const { 
        pristine, user,
        submitting, classes,
        handleSubmit, valid
      } = this.props;

      // check if user is successfully logged in or authenticated
      if (user !== undefined && user !== null) {

          // check if token defined
          return redirect.to({ url: '/login', from: this.context })

      }

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

            <Card elevation={Elevation.ONE}>

              <Flex align='top' justify='center' w={1}>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                  <h2>Create Account</h2>
                </InputLabel>
              </Flex>
              <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                <Flex align='left' justify='left' w={1/2}>
                  <Box p={1}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                      <h3>Personal Account</h3>
                    </InputLabel>
                    <PersonalProfile props={ this.props } />
                  </Box>
                  <Box p={1}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                      <h3>Stakeholder Account</h3>
                    </InputLabel>
                    <CompanyProfile props={this.props} state={this.state} handleChange={ this.handleChange } />
                  </Box>
                </Flex>

                <div className={classes.margin}>

                  <Button type="submit" disabled={!valid || pristine || submitting} intent="success" text="Register" />
                
                </div>

              </form>

            </Card>

          </Flex>

        </>
      );

    }
}

const mapStateToProps = (state) => {

  return {
    user: state.user.user,
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    register: (values) => { dispatch(UserAuthActions.register(values)) },
    login: (user) => { dispatch(UserAuthActions.login(user)) },
  }

}

UserRegistration.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({
  form: "registration",
  Validate, 
  AsyncValidate
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserRegistration)));
