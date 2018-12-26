import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import purple from '@material-ui/core/colors/purple';

import asyncValidate from './async-validate';

const validate = values => {

    const errors = {};
    const requiredFields = ['name', 'email', 'message'];

    requiredFields.forEach(field => {

        if (!values[field]) {

            errors[field] = 'Required';

        }

    });

    if (values.email && /!^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = 'Invalid email';

    }

    return errors;
}

const renderBootstrapField = ({classes, label, defaultValue, name}) => {

    return (
      <>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            {label}
          </InputLabel>
          <InputBase
            id="text-input"
            name={name}
            placeholder={defaultValue}
            type={name}
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
          />
        </FormControl>
      </>
    );
}

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

const renderCheckbox = ({ input, label }) => {

    return (
      <>
        <Checkbox
          label={label}
          checked={input.value ? true : false}
          onCheck={input.onChange}
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

    state = {
       email: 'email',
       text: 'text',
       message: 'message',
       name: 'fullname'
    }

    render() {

        const { handleSubmit, pristine, submitting, classes } = this.props;

        const { name, email, message } = this.state;

        return (
          <form className={{style: 'center'}} onSubmit={handleSubmit}>
            <div>
              {
                renderBootstrapField({
                  classes, label:'Full name', defaultValue: "Your full name...", name
                })
              }
            </div>
            <div>
              {
                renderBootstrapField({classes, label:'Email', defaultValue: "Your email...", name: email})
              }
            </div>
            <div>
              {
                renderBootstrapField({classes, label:'Message', defaultValue: "Your message...", name: message})
              }
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
          </form>
        );

    }

}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    width: theme.spacing.unit * 50,
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

ContactForm.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default reduxForm({ form: "ContactForm", validate, asyncValidate})(withStyles(styles)(ContactForm));
