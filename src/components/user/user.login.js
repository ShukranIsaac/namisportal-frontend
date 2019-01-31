import React, { Component, Fragment } from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';
import { redirect } from './user.redirect';
import { UserProfile } from './user.profile';

/**
 * User login
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class UserLogin extends Component {

    constructor() {
      super();
      this.state = {
         username: '',
         password: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    /**
     * On event change, get field name and value, set state
     */
    handleChange = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

    /**
     * Prevent default form submit events. Get all field values 
     * through redux-form's form reducer, construct user(username and password)
     * login object to contain user credentials.
     */
    handleSubmit = (event, values) => {

      // Prevent default submit action
      event.preventDefault();
      // define user login credentials
      const user = {
        username: values.state.username,
        password: values.state.password
      }

      if (user !== undefined && user.username !== undefined && user !== null) {

        // Athenticate this user
        const { login } = this.props;
        login(user);

      }

    }

    /**
     * Check if the user's token is still valid
     *  else refresh or request new token with the API,
     * If token valid load or show username only in the username
     * field.
     * 
     * @param {String} token
     * @returns {Boolean} boolean 
     */
    authenticate = ({ user }) => {

      // if user, then check if token still valid
      // else return false and render loggin form
      return user !== undefined && user !== null ? UserProfile.isAuthenticated(user) : false;

    }

    render() {

        const { pristine, submitting, classes } = this.props;
        
        // Get the user from local storage or session storage
        // making sure their token is available.
        const user = UserProfile.get();
        const auth = this.authenticate({ user });
        
        // if user is successfully logged in or authenticated
        // then redirect to cms
        if (auth && user !== undefined && user !== null) {

            // check if token defined and authenticated i.e. not expired
            // then redirect to cms index page
            // or else wait for user to enter login password and username in the 
            // form provided.
            return redirect.to({ url: '/cms', from: this.context })

        }
        
        return (
          <Fragment>
            <div>
              <Flex
                wrap
                align='top'
                justify='center'
                m={1}
                w={1}
                p={3}
                className='landing-info'>
                <Box w={1/2} p={1}>

                  <Card elevation={Elevation.TWO}>

                    <form className={{style: 'center'}} onSubmit={ (e) => this.handleSubmit(e, this)} autoComplete="off">
                      <div>
                        <RenderBootstrapField
                          { ...this.props }
                          label='Username'
                          defaultValue= "Your username or email..."
                          name="username"
                          type="text"
                          component="input"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div>
                        <RenderBootstrapField
                          { ...this.props }
                          label='Password'
                          defaultValue= "Your password..."
                          name="password"
                          type="password"
                          component="input"
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className={classes.margin}>

                        <Button type="submit" disabled={pristine || submitting} intent="success" text="Login" />

                        <Link to="/register"><div>Register? </div></Link>

                      </div>
                    </form>

                  </Card>

                </Box>
              </Flex>
            </div>
          </Fragment>
        );

    }

}

UserLogin.propTypes = {
   classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {

  return {
    user: state.user.user,
  }

}

const mapDispatchToProps = dispatch => {

  return {
    login: (user) => { dispatch(UserAuthActions.login(user)) },
  }

}

export default reduxForm({
  form: "login",
  Validate,
  AsyncValidate
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserLogin)));
