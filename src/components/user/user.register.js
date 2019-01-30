import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { DirectoryStakeholderTypes } from '../directory/directory.stakeholder.type';
import { redirect } from './user.redirect';

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

      this.setState({
        [event.target.name]: event.target !== 'checked' ? event.target.value : event.target.checked 
      });

    }

    handleClick = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

    handleSubmit = (event, values) => {
      // Prevent default submit action
      event.preventDefault();
      // define user structure
      const user = {
        username: values.state.username,
        firstName: values.state.firstName,
        lastName: values.state.lastName,
        email: values.state.email,
        password: values.state.password
      }

      // define company structure
      // const company = {
      //   companyName: values.state.companyName,
      //   physicalAddress: values.state.physicalAddress,
      //   telephone: values.state.telephone,
      //   fax: values.state.fax,
      //   companyEmail: values.state.companyEmail,
      //   website: values.state.website,
      // }

      if (user !== undefined && user.username !== undefined && user !== null) {

        const { register } = this.props;
        // register this user
        register(user);

      }

    }

    personal = (props) => {

        return (
          <Fragment>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Username'
                defaultValue= "Your username..."
                name="username"
                type="text"
                component="input"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Firstname'
                defaultValue= "Your firstname..."
                name="firstName"
                type="text"
                component="input"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Lastname'
                defaultValue= "Your lastname..."
                name="lastName"
                type="text"
                component="input"
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
                component="input"
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
                component="input"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...props }
                label='Confirm Password'
                defaultValue= "Confirm your password..."
                name="confirmPassword"
                type="password"
                component="input"
                onChange={ this.handleChange }
              />
            </div>
          </Fragment>
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
              name="companyName"
              type="text"
              component="input"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Address'
              defaultValue= "Physical address..."
              name="physicalAddress"
              type="text"
              component="input"
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
              component="input"
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
              component="input"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <RenderBootstrapField
              { ...props }
              label='Email'
              defaultValue= "Campany email address..."
              name="companyEmail"
              type="email"
              component="input"
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
              component="input"
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <DirectoryStakeholderTypes 
              classes={props.classes}
              handleChange={ this.handleChange }
              { ...this.state }
            />
          </div>
        </>
      );
    }

    render() {

      const { 
        pristine, user,
        submitting, classes 
      } = this.props;

      // check if user is successfully logged in or authenticated
      if (user !== undefined && user !== null) {

          // check if token defined
          return redirect.to({ user, url: '/login' })

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

              <form onSubmit={ (e) => this.handleSubmit(e, this)} autoComplete="off">

                <Flex align='left' justify='left' w={1/2}>
                  <Box p={1}>
                    <FormLabel component="legend">Personal Account</FormLabel>
                    { this.personal(this.props) }
                    <div>

                    </div>
                  </Box>
                  <Box p={1}>
                    <FormLabel component="legend">Company Account</FormLabel>
                    { this.company(this.props) }
                  </Box>
                </Flex>

                {/* <Flex align='right' justify='right' w={1/2}>
                  <Box p={1}>
                    <FormLabel component="legend">Company Account</FormLabel>
                    { this.company(this.props) }
                  </Box>
                </Flex> */}

                <div className={classes.margin}>

                  <Button type="submit" disabled={pristine || submitting} intent="success" text="Register" />
                
                </div>

              </form>

            </Card>

          </Flex>

        </>
      );

    }
}

const mapStateToProps = (state) => {
console.log(state.user.user);

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
