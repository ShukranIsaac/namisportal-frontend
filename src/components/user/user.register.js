import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { Container, Button, Card, CardBody, CardImg } from 'reactstrap'

import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { redirect } from './user.redirect';
// import { StakeholderProfile } from './user.register.company';
import { PersonalProfile } from './user.register.personal';
import ParticlesComponent from './particles';

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
         physicalAddress: '',
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
      if (user !== undefined && user.username !== undefined && user !== null) {

        const { register } = this.props;
        // register this user if password confirmed is the same
        if (user.password === values.confirmPassword) {
          register(user);
        }

      }

    }

    render() {

      const { 
        pristine, user,
        submitting,
        handleSubmit, valid
      } = this.props;

      // check if user is successfully logged in or authenticated
      if (user !== undefined && user !== null) {

          // check if token defined
          return redirect.to({ url: '/login', from: this.context })

      }

      return (
        <Fragment>
          
          <div className='page-content'>
            
              <ParticlesComponent />

              <Container>

                <div style={{ width: '60%', margin: '0 auto' }}>
                  
                    <Card>

                      <CardBody>

                        <div style={{textAlign: 'center'}}>
                          <CardImg src={require("../../../src/assets/img/malawi.png")}/>
                          <p>
                            Department of Energy Affairs, Ministry of Energy and Natural Resources
                          </p>
                        </div>

                        <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                          <PersonalProfile props={ this.props } />

                          <div className="margin-fix">

                            <Button type="submit" disabled={!valid  || pristine || submitting} color="success">Register</Button>

                          </div>

                        </form>

                      </CardBody>

                    </Card>

                  </div>

              </Container>

          </div>

        </Fragment>
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
