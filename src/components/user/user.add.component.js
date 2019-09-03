import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { PersonalProfile } from './user.register.personal';

class AddUserAccount extends Component {

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

        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit = (values) => {
        // Prevent default submit action
        // event.preventDefault();
        // define user structure
        const user = {
            username: values.username,
            firstName: values.firstname,
            lastName: values.lastname,
            email: values.email,
            password: values.password,
            roles: {
                writer: false,
                publisher: false,
                admin: false
            }
        }

        if (user !== undefined && user.username !== undefined && user !== null) {

            const { register } = this.props;
            // register this user if password confirmed is the same
            if (user.password === values.confirmPassword) {
                // register new account
                register(user);
                // list all users
                this.props.defaultItem();
            }

        }

    }

    render() {

        const {
            pristine, classes,
            submitting, handleClick,
            handleSubmit, valid
        } = this.props;

        return (
            <Fragment>

                <form onSubmit={handleSubmit(values => this.handleSubmit(values))} autoComplete="off">

                    <PersonalProfile action="Create Account" props={this.props} />

                    <Button disabled={!valid || pristine || submitting} type="submit" color="success" text="Create Account" />

                    <Button
                        name="default"
                        className={classes.margin}
                        text="Cancel"
                        onClick={e => handleClick(e)}
                    />

                </form>

            </Fragment>
        );

    }
}

const mapStateToProps = (state) => {

    return {
        general: state.general.general,
        user: state.user.user,
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
        register: (values) => { dispatch(UserAuthActions.register(values)) },
    }

}

AddUserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: "addUser",
    Validate,
    AsyncValidate
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddUserAccount)));
