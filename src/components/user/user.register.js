import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container, Button, Card, CardBody, CardImg } from 'reactstrap';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { redirect } from './user.redirect';
// import { StakeholderProfile } from './user.register.company';
import { PersonalProfile } from './user.register.personal';
// import ParticlesComponent from './particles';
import BootstrapGridColumn from '../forms/form.grid.column';

import LOGO from '../../../src/assets/img/malawi.png';

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

        this.setState({
            [event.target.name]: event.target !== 'checked' 
            ? event.target.value : event.target.checked
        });

    }

    handleClick = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit = (event) => {
        // Prevent default submit action
        event.preventDefault();
        const {
            email,
            username,
            password,
            firstName,
            lastName,
            confirmPassword
        } = this.state;
        // define user structure
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

        if (user && email && username && password && firstName && lastName && confirmPassword) {

            const { register } = this.props;
            // register this user if password confirmed is the same
            if ((user.password === confirmPassword) && user.password.length > 6) {
                // console.log(user)
                register(user);
            }

        }

    }

    registerForm = ({
        email,
        username,
        password,
        firstName,
        lastName,
        confirmPassword
     }) => {
        const { general } = this.props;

        const fieldsValid = (email && username 
                            && password && firstName 
                            && lastName && confirmPassword 
                            && password.length > 6 ? false : true);

        return (<form
                onSubmit={(e) => this.handleSubmit(e)} 
                autoComplete="off"
            >
                <PersonalProfile 
                    handleChange={this.handleChange} 
                    {...this.state} 
                />

                <div className="margin-fix form-row">
                    <BootstrapGridColumn>
                        <Button
                            type="submit"
                            disabled={fieldsValid}
                            color="success">
                            {
                                general ? (
                                    general.isLoading ? (
                                        <>Registering...</>
                                    ) : <>Register</>
                                ) : <>Register</>
                            }
                        </Button>
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <Link
                            to="/login"    
                        >
                            <button
                                type="button"
                                className="btn btn-default"
                            >Cancel</button>
                        </Link>
                    </BootstrapGridColumn>
                </div>
            </form>
        );
    } 

    render() {

        const { user } = this.props;

        // check if user is successfully registered
        if (user !== null) {
            // force window reload to refresh and clear out the previous state
            // to avoid not redirecting to login 
            // if user object in state is not null
            // especially when user just logged out from the CMS
            window.location.reload();

            if (user.username !== null) {
                return redirect.to({ url: '/login' })
            }

        }

        return (
            <Fragment>
                <div 
                    className="bg-theme"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        // background: '#15B371'
                    }}
                >
                    {/* <ParticlesComponent /> */}

                    <Container>

                        <div 
                            style={{ 
                                width: '60%', 
                                margin: '0 auto',
                                marginTop: '5%'
                            }}
                        >
                            <Card>

                                <CardBody>

                                    <div style={{ textAlign: 'center' }}>
                                        <CardImg src={ LOGO } />
                                        <br />
                                        <p>Ministry of Agriculture</p>
                                    </div>

                                    { this.registerForm(this.state) }

                                </CardBody>

                            </Card>

                        </div>

                    </Container>

                </div>

            </Fragment>
        );

    }
}

const mapStateToProps = (state) => ({
    general: state.general.general,
    user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
    register: (values) => { dispatch(UserAuthActions.register(values)) },
    login: (user) => { dispatch(UserAuthActions.login(user)) },
})

UserRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(connect(mapStateToProps, 
    mapDispatchToProps)(UserRegistration)));
