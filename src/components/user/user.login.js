import React, { Component } from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import UserRegistration from './user.register';

import RenderBootstrapField from '../contact/form.bootstrap.field';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import styles from '../contact/form.styles';

class ContactForm extends Component {

    state = {
       email: 'email',
       text: 'text',
       name: 'username',
       password: 'password',
    }

    render() {

        const { handleSubmit, pristine, submitting, classes } = this.props;

        const { name, password } = this.state;

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
                        {
                          RenderBootstrapField({
                            classes, label:'Username', defaultValue: "Your username or email...", name
                          })
                        }
                      </div>
                      <div>
                        {
                          RenderBootstrapField({classes, label:'Password', defaultValue: "Your password...", name: password})
                        }
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

ContactForm.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({ form: "ContactForm", Validate, AsyncValidate})(withStyles(styles)(ContactForm));
