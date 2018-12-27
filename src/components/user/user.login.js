import React, { Component } from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import RenderBootstrapField from '../contact/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import styles from '../contact/form.styles';

class UserLogin extends Component {

    constructor() {
      super();
      this.state = {
         user_name: '',
         password: ''
      }

      this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (event) => {
      console.log(event.target.name);
      this.setState({[event.target.name]: event.target.value});

    }

    render() {

        const { handleSubmit, pristine, submitting, classes } = this.props;

        return (
          <>
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


                    <form className={{style: 'center'}} onSubmit={handleSubmit}>
                      <div>
                        <RenderBootstrapField
                          { ...this.props }
                          label='Username'
                          defaultValue= "Your username or email..."
                          name="user_name"
                          type="text"
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
                          onChange={ this.handleChange }
                        />
                      </div>
                      <div className={classes.margin}>

                        <Button type="submit" disabled={pristine || submitting} intent="success" text="Login" />

                        <Link to="/register">
                          <div>Register? </div>
                        </Link>

                      </div>
                    </form>

                  </Card>

                </Box>
              </Flex>
            </div>
          </>
        );

    }

}

UserLogin.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({
  form: "UserLoginForm",
  Validate,
  AsyncValidate
})(withStyles(styles)(UserLogin));
