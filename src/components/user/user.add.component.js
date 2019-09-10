import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { PersonalProfile } from './user.register.personal';
import CustomizedSnackbars from '../cms/snackbar.feedback';

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

    handleSubmit = (event) => {
        // Prevent default submit action
        event.preventDefault();
        // define user structure
        const {
            email,
            username,
            password,
            firstName,
            lastName,
            confirmPassword
        } = this.state;
        // user object
        const user = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            roles: {
                writer: false,
                publisher: false,
                admin: false
            }
        }

        if (user !== undefined && username !== undefined && user !== null) {

            const { register } = this.props;
            // register this user if password confirmed is the same
            if (user.password === confirmPassword && password > 6) {
                // register new account
                register(user);
                // list users
                this.props.defaultItem();
            }

        }

    }

    render() {

        const { classes, handleClick, general, user } = this.props;

        const {
            email,
            username,
            password,
            firstName,
            lastName,
            confirmPassword
        } = this.state;

        const fieldsValid = email && username && password && firstName && lastName && confirmPassword ? false : true;

        // list all users if user just registered is defined
        if (user !== null && general) {
            if (!general.isLoading) {
                // list all user if no error returned
                if (general.hasErrored) {
                    return <CustomizedSnackbars type="error" />
                } 
            }
        }

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <PersonalProfile {...this.state} handleChange={this.handleChange} />

                    <Button
                        type="submit"
                        disabled={fieldsValid}
                        color="success">
                        {
                            general ? (
                                general.isLoading ? (
                                    <>Creating Account...</>
                                ) : <>Create Account</>
                            ) : <>Create Account</>
                        }
                    </Button>

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

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddUserAccount)));
