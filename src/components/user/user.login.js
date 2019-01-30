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

    handleChange = (event) => {

      this.setState({[event.target.name]: event.target.value});

    }

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

    getLoggedInUser = () => {

      return null;

    }

    authenticate = ({ token }) => {

      return true;

    }

    render() {

        const { pristine, submitting, classes, user } = this.props;

        const userr = this.getLoggedInUser();
        const auth = this.authenticate({ token: '' });

        // check if user is successfully logged in or authenticated
        if (user !== undefined && user !== null) {

            // check if token defined and authenticated i.e. not expired
            // or else wait for user to enter login password and username
            if(auth) {

                return redirect.to({ user, url: '/cms' });

            }

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
