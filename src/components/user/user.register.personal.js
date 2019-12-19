import React, { Fragment } from 'react';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

/**
 * Create user personal account
 * 
 * @author Isaac S. Mwakabira
 */
export const PersonalProfile = ({
    email,
    username,
    password,
    firstName,
    lastName,
    confirmPassword,
    handleChange
}) => {

    return (
        <Fragment>

            <div className='margin-fix form-row'>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="firstName"
                            value={firstName}
                            placeholder="Your firstname..."
                            label='Firstname*' type='text'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="lastName"
                            value={lastName}
                            placeholder="Your lastname..."
                            label='Lastname*' type='text'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>
            <div className='margin-fix form-row'>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="username"
                            value={username}
                            placeholder="Your username..."
                            label='Username*' type='text'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="email"
                            value={email}
                            placeholder="Your email address..."
                            label='Email*' type='email'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>
            <div className='margin-fix form-row'>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="password"
                            value={password}
                            placeholder="Your password(at least 6 characters)..."
                            label='Password*' type='password'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        <BootsrapTextField
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password..."
                            label='ConfirmPassword*' type='password'
                            handleChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>

        </Fragment>
    );

}