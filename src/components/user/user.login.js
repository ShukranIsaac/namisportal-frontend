import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Button, Card, CardBody, CardImg } from 'reactstrap'

import ParticlesComponent from './particles'

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';
import { redirect } from './user.redirect';
import UserProfile from './user.profile';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

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

        this.setState({ [event.target.name]: event.target.value });

    }

    /**
     * Prevent default form submit events. Get all field values 
     * through redux-form's form reducer, construct user(username and password)
     * login object to contain user credentials.
     */
    handleSubmit = (e) => {
        // Prevent default submit action
        e.preventDefault();
        // define user login credentials object
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password
        }

        if (user && username && password) {

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
        return user ? UserProfile.isAuthenticated(user) : false;

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

        const { general } = this.props;
        const { password, username } = this.state;

        // Get the user from local storage or session storage
        // making sure their token is available.
        const user = UserProfile.get();
        const auth = this.authenticate({ user });

        // if user is successfully logged in or authenticated
        // then redirect to cms
        if (auth && user) {

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
                                    <div style={{ textAlign: 'center' }}>
                                        <CardImg src={require("../../../src/assets/img/malawi.png")} />
                                        <p>
                                            Department of Energy Affairs, Ministry of Energy and Natural Resources
                                        </p>
                                    </div>

                                    <form className={{ style: 'center' }} onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                                        <div className='margin-fix'>
                                            {/* <div className="container"> */}
                                            <div className="form-group">
                                                <BootsrapTextField
                                                    type="text"
                                                    name="username"
                                                    label="Username*"
                                                    helper={false}
                                                    placeholder="Your username..."
                                                    handleChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='margin-fix'>

                                            <div className="form-group">
                                                <BootsrapTextField
                                                    type="password"
                                                    name="password"
                                                    label="Password*"
                                                    placeholder="Your password..."
                                                    handleChange={this.handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="margin-fix">

                                            <Button
                                                type="submit"
                                                disabled={password && username ? false : true}
                                                color="success">
                                                {
                                                    general ? (
                                                        general.isLoading ? (
                                                            <>Authenticating...</>
                                                        ) : <>Login</>
                                                    ) : <>Login</>
                                                }
                                            </Button>
                                        </div>

                                        <div className="margin-fix">
                                            {
                                                (general) && (
                                                    general.hasErrored && (
                                                        <div className="alert alert-danger alert-dismissible fade show">
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
                                        <p style={{ textAlign: 'center', marginBottom: 'unset' }}>
                                            Don't have an account?
                                            <span>
                                                <Link
                                                    to="/register"
                                                    // onClick={redirect.to({ url: '/register' })}
                                                > <i>Register</i>
                                                </Link> |
                                                <Link
                                                    to="/"
                                                    onClick={() => redirect.to({ url: '/' })}
                                                > <i>Home</i>
                                                </Link>
                                            </span>
                                        </p>

                                        <p style={{ textAlign: 'center', marginBottom: 'unset' }}>
                                            <Link
                                                to="/forgotpassword"
                                                // onClick={redirect.to({ url: '/forgotpassword' })}
                                            > <i>Forgot password?</i>
                                            </Link>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserLogin));
