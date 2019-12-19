import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@blueprintjs/core';

import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

/**
 * Allow users be able to retrieve their passwords/change using their emails
 * if and when they forget their credentials.
 */
export class ForgotPassword extends Component {

    constructor() {
        super()
        this.state = {
            passwordSent: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        /**
         * Prevent default behavior
         */
        e.preventDefault();
        /**
         * If email successfully sent, set passwordSent to true
         */
        this.setState({ passwordSent: true })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { passwordSent } = this.state;

        return (
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404"></div>
                    {
                        passwordSent && <h1>Email Sent!</h1>
                    }
                    <h2>To Retrieve Your Account?</h2>
                    {
                        !passwordSent ?
                            <div>
                                <form className={{ style: 'center' }} onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                                    <div className='margin-fix form-row'>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                value={this.state.email}
                                                name='email'
                                                label='Please Enter Your Email*'
                                                type='text'
                                                placeholder='The email used to open the account...'
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                    </div>

                                    <Button
                                        type="submit"
                                        color="primary"
                                        text="Send"
                                        disabled={!this.state.email}
                                    />
                                </form>
                            </div>

                            : <p>
                                Check your email account for the system generated default password. Use it to login into your account and immediately create new password.
                            </p>
                    }
                    <span>
                        <Link to="/login">Login</Link>
                        {
                            !passwordSent && <>|<Link to="/register">Register</Link></>
                        }
                    </span>
                </div>
            </div>
        );

    }

}

export default ForgotPassword;