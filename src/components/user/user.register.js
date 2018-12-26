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

    state = {
       email: 'email',
       text: 'text',
       name: 'username',
       password: 'password',
       confirmPassword: 'confirmPassword',
       website: 'website',
       telephone: 'telephone',
       fax: 'fax',
       company_name: 'Legal name',
       physical_address: 'address',
       stakeholder_type: [],
    }

    personal = ({ classes }, { name, password, email, confirmPassword }) => {

        return (
          <>
            <div>
              {
                RenderBootstrapField({
                  classes, label:'Username', defaultValue: "Your username...", name
                })
              }
            </div>
            <div>
              {
                RenderBootstrapField({
                  classes, label:'Email', defaultValue: "Your email...", email: email
                })
              }
            </div>
            <div>
              {
                RenderBootstrapField({classes, label:'Password', defaultValue: "Your password...", name: password})
              }
            </div>
            <div>
              {
                RenderBootstrapField({classes, label:'Confirm Password', defaultValue: "Confirm your password...", name: password})
              }
            </div>
          </>
        );

    }

    company = ({ classes }, state) => {

      const { company_name, physical_address, email, fax, telephone, website, stakeholder_type } = state;

      return (
        <>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Company name(Legal)', defaultValue: "Campany name...", company_name
              })
            }
          </div>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Address', defaultValue: "Physical address...", physical_address
              })
            }
          </div>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Telephone', defaultValue: "Campany telephone number...", telephone
              })
            }
          </div>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Fax', defaultValue: "Campany fax number...", fax
              })
            }
          </div>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Email', defaultValue: "Campany email address...", email
              })
            }
          </div>
          <div>
            {
              RenderBootstrapField({
                classes, label:'Website URL', defaultValue: "Campany website...", website
              })
            }
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

            <form onSubmit={handleSubmit}>

              <Card elevation={Elevation.TWO}>

                <Box w={1} p={2}>
                  <FormLabel component="legend">Personal Account</FormLabel>
                  { this.personal(this.props, this.state) }
                </Box>

                <Box w={1} p={2}>
                  <FormLabel component="legend">Company Account</FormLabel>
                  { this.company(this.props, this.state) }
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

export default reduxForm({ form: "ContactForm", Validate, AsyncValidate})(withStyles(styles)(UserRegistration));
