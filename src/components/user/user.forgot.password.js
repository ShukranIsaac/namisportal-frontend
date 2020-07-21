import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@blueprintjs/core';
import * as UserAuthActions from '../../actions/user.action';

import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { connect } from 'react-redux';
import { redirect } from './user.redirect';

/**
 * Allow users be able to retrieve their passwords/change using their emails
 * if and when they forget their credentials.
 */
export const ForgotPassword = ({
    accountRecovery,
    accountReset,
    user,
    general
}) => {
    const [passwordSent, setPasswordSent] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [comfirmPassword, setComfirmPassword] = useState()
    const [token, setToken] = useState();

    const handleSubmit = e => {
        /**
         * Prevent default behavior
         */
        e.preventDefault();
        /**
         * If email successfully sent, set passwordSent to true
         */
        if (email.trim()) {
            accountRecovery({
                email: email
            }, setPasswordSent)
        }
    }

    const handleResetPassword = e => {
        e.preventDefault()
        if (password && comfirmPassword) {
            if (password === comfirmPassword) {
                accountReset({
                    password: password
                }, token);
            }
        }
    }
    
    const handleChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleCPasswordChange = e => setComfirmPassword(e.target.value);
    const handleTokenChange = e => setToken(e.target.value);

    if (general) {
        if (!general.isLoading) {
            if(user) {
                if (user.success === "Success! Password changed") {
                    return redirect.to({ url: '/login' })
                }
            }
        }
    }

    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404"></div>
                { !passwordSent && <h2>To Retrieve Your Account?</h2> }
                {
                    !passwordSent && !user ?
                        <div>
                            <form className={{ style: 'center' }} 
                                onSubmit={(e) => handleSubmit(e)} 
                                autoComplete="off"
                            >
                                <div className='margin-fix form-row'>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={email}
                                            name='email'
                                            label='Please Enter Your Email*'
                                            type='text'
                                            placeholder='The email used to open the account...'
                                            handleChange={handleChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>

                                <Button
                                    type="submit"
                                    color="primary"
                                    text="Reset Password"
                                    disabled={!email}
                                />
                            </form>
                        </div>

                        : <div>
                            <form className={{ style: 'center' }} 
                                onSubmit={(e) => handleResetPassword(e)} 
                                autoComplete="off"
                            >
                                <div className='margin-fix form-row'>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={password}
                                            name='password'
                                            label='New Password*'
                                            type='password'
                                            placeholder='New password...'
                                            handleChange={handlePasswordChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>
                                <div className='margin-fix form-row'>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={comfirmPassword}
                                            name='comfirmPassword'
                                            label='Comfirm New Password*'
                                            type='password'
                                            placeholder='Comfirm New password...'
                                            handleChange={handleCPasswordChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>
                                <div className='margin-fix form-row'>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={token}
                                            name='token'
                                            label='Auth Token*'
                                            type='text'
                                            placeholder='Please paste token sent through email...'
                                            handleChange={handleTokenChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>
                                
                                <Button
                                    type="submit"
                                    color="primary"
                                    text="Change Password"
                                    disabled={!password && password === comfirmPassword}
                                />
                            </form>
                        </div>
                }
                <span>
                    <Link to="/login">Login</Link>
                    <>|<Link to="/register">Register</Link></>
                </span>

                {
                    general && 
                        general.isLoading ? (<div style={{ alignContent: `center` }} 
                                className="loader" />) : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    general: state.general.general,
    user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
    accountRecovery: (user, callback) => { 
        dispatch(UserAuthActions.accountRecovery(user, callback)) 
    },
    accountReset: (user, token) => { 
        dispatch(UserAuthActions.accountReset(user, token)) 
    },
})

export default connect(mapStateToProps, 
    mapDispatchToProps)(ForgotPassword);