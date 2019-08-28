import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import { Container, Button, Card, CardBody, CardImg } from 'reactstrap'

import ParticlesComponent from './particles'
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';
import { redirect } from './user.redirect';
import { UserProfile } from './user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';

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
    handleSubmit = (values) => {
      // console.log(values);
      // Prevent default submit action
      // event.preventDefault();
      // define user login credentials
      const user = {
        username: values.username,
        password: values.password
      }
      // console.log(values);
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

    newField = ({
      input,
      type,
      placeholder,
      id,
      meta: { touched, error }
    }) => {
      return (
        <div>
          <input {...input} placeholder={placeholder} type={type} id={id} />
          {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      );
    };

    render() {

        const { valid , pristine, submitting, handleSubmit, general } = this.props;
        // console.log(this.props);
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
            <div
              // className='page-content'
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: '#15B371'
              }}>

              <ParticlesComponent />

              <Container>
                <div
                  style={{
                    width: '50%',
                    margin: '0 auto',
                    marginTop: '5%'
                  }}>
                    <Card>
                      <CardBody>
                        <div style={{textAlign: 'center'}}>
                          <CardImg src={require("../../../src/assets/img/malawi.png")}/>
                          <p>
                            Department of Energy Affairs, Ministry of Energy and Natural Resources
                          </p>
                        </div>
                        
                        <form className={{style: 'center'}} onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">
                          
                          <div className='margin-fix'>

                            <FormTextInputField 
                              name='username' 
                              label='Username' 
                              type='text' 
                              placeholder='Your username or email...' 
                              {...this.props}
                            />

                          </div>
                          <div className='margin-fix'>

                            <FormTextInputField 
                              name='password' 
                              label='Password' 
                              type='password' 
                              placeholder='Your password...' 
                              {...this.props}
                            />

                        </div>
                        <div className="margin-fix">

                          <Button type="submit" disabled={!valid  || pristine || submitting} color="success">Login</Button>

                        </div>
                        
                        <div className="margin-fix">
                          {
                            (general && !submitting) && (
                              general.hasErrored && (
                                <div class="alert alert-danger alert-dismissible fade show">
                                    <strong>Error!</strong> Username or password is incorrect
                                </div>
                              )
                            )
                          }
                        </div>
                      </form>

                      </CardBody>

                      </Card>
                    
                    <div className='info-card-wrapper'>
                        <Card>
                          <CardBody>

                            <p style={{textAlign: 'center', marginBottom: 'unset'}}>
                              Don't have an account? 
                              <span>
                                <Link 
                                  to="/register" 
                                  // onClick={ () => redirect.to({ url: '/register' }) }
                                  > Register
                                </Link>
                              </span>
                            </p>
                            
                          </CardBody>
                        </Card>
                    </div>

                      
                  </div>
                
              </Container>
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
    general: state.general.general,
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
