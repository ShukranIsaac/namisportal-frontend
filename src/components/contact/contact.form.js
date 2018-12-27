import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

import { Button } from '@blueprintjs/core';

import RenderBootstrapField from './form.bootstrap.field';
import AsyncValidate from './form.async-validate';
import Validate from './email.validate';
import UserFormCheckbox from '../user/form.checkbox';

import styles from './form.styles';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {

    return (
      <>
        <TextField
          hintText={label}
          floatingLabelText={label}
          errorText={touched && error}
          {...input}
          {...custom}
        />
      </>
    );

}

// const renderRadioGroup = ({ input, ...rest }) => {
//
//     return (
//       <>
//         <RadioButtonGroup
//           {...rest}
//           {...input}
//           valueSelected={input.value}
//           onChange={(event, value) => input.onChange(value)}
//         />
//       </>
//     );
// }

// const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
//
//     return (
//       <>
//         <SelectField
//           floatingLabelText={label}
//           errorText={touched && error}
//           {...input}
//           onChange={(event, index, value) => input.onChange(value)}
//           children={children}
//           {...custom}
//         />
//       </>
//     );
//
// }

class ContactForm extends Component {

    constructor() {
      super();
      this.state = {
         email: '',
         message: '',
         fullname: ''
      }

      this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (event) => {
      
      this.setState({[event.target.name]: event.target.value});

    }

    render() {

        const { handleSubmit, pristine, submitting, classes } = this.props;

        return (
          <form className={{style: 'center'}} onSubmit={handleSubmit}>
            <div>
              <RenderBootstrapField
                { ...this.props }
                label='Full name'
                defaultValue= "Your full name..."
                name="fullname"
                type="text"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...this.props }
                label='Email'
                defaultValue= "Your email..."
                name="email"
                type="email"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <RenderBootstrapField
                { ...this.props }
                label='Message'
                defaultValue= "Your message..."
                name="message"
                type="text"
                onChange={ this.handleChange }
              />
            </div>
            <div className={classes.margin}>
              <Button type="submit" disabled={pristine || submitting} intent="success" text="Send" />
            </div>
          </form>
        );

    }

}

ContactForm.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({
  form: "ContactForm",
  Validate, AsyncValidate
})(withStyles(styles)(ContactForm));
