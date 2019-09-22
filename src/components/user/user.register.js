import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container, Button, Card, CardBody, CardImg } from 'reactstrap';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';

import { redirect } from './user.redirect';
// import { StakeholderProfile } from './user.register.company';
import { PersonalProfile } from './user.register.personal';
import ParticlesComponent from './particles';
import CustomizedSnackbars from '../cms/snackbar.feedback';

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
            [event.target.name]: event.target !== 'checked' ? event.target.value : event.target.checked
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

    render() {

        const { user, general } = this.props;

        const {
            email,
            username,
            password,
            firstName,
            lastName,
            confirmPassword
        } = this.state;

        // check if user is successfully logged in or authenticated
        if (user !== null) {

            // check if token defined
            return redirect.to({ url: '/login', from: this.context })

        }

        // check if there was any error
        if (general) {
            if (!general.isLoading) {
                // list all user if no error returned
                if (general.hasErrored) {
                    return <CustomizedSnackbars type="error" />
                }
            }
        }

        const fieldsValid = email && username && password && firstName && lastName && confirmPassword && password.length > 6 ? false : true;

        return (
            <Fragment>

                <div className='page-content'>

                    <ParticlesComponent />

                    <Container>

                        <div style={{ width: '60%', margin: '0 auto' }}>

                            <Card>

                                <CardBody>

                                    <div style={{ textAlign: 'center' }}>
                                        <CardImg src={require("../../../src/assets/img/malawi.png")} />
                                        <br />
                                        <p>
                                            Department of Energy Affairs, Ministry of Energy and Natural Resources
                                        </p>
                                    </div>

                                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                                        <PersonalProfile handleChange={this.handleChange} {...this.state} />

                                        <div className="margin-fix">

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

                                        </div>

                                        {/* <ButtonControl
                                            intent={Intent.NONE}
                                            value="Back"
                                            name="back"
                                            handleClick={ (e) => {}}
                                        /> */}

                                    </form>

                                </CardBody>

                            </Card>

                        </div>

                    </Container>

                    {
                        // check if there was no any error
                        general && (
                            !general.hasErrored && (
                                <CustomizedSnackbars
                                    type="info"
                                    message="Successfully registerd. Please login"
                                />
                            )
                        )
                    }

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

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserRegistration)));
