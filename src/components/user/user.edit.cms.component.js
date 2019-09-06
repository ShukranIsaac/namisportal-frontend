import React, { Component, Fragment } from 'react';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import styles from '../contact/form.styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import { SelectInputControl } from '../forms/form.selectinput.field';
import { UserProfile, profile } from './user.profile';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Edit user account details
 * 
 * @author Isaac S. Mwakabira
 */
class EditUserAccount extends Component {

    constructor() {
        super();
        this.state = {
            user: { roles: null },
            roles: null,
            myRoles: [],
        }
    }

    // already assigned  roles
    assignedRoles = ({ user }) => {

        // get all assigned roles to this account
        return (Object.keys(user.roles)).map(key => {

            return user.roles !== undefined && user.roles[key] ? [key] : null;

        });

    }

    handleSubmit = (id, values) => {

        // check previous values of user and update if roles changed
        //this.state.user
        if (values !== null) {
            // if (this.state.user.roles !== undefined) {

                // user roles changed reassign new ones
                if (this.isAssigned('writer')) {
                    Object.assign(this.state.user.roles, { writer: true, admin: true })
                }

                // user roles changed reassign new ones
                if (this.isAssigned('publisher')) {
                    Object.assign(this.state.user.roles, { publisher: true, admin: true });
                }

                // user roles changed reassign new ones
                if (this.isAssigned('admin')) {
                    Object.assign(this.state.user.roles, { admin: true });
                }

                // Form has been edited, edit user fields
                // if (values !== null) {

                //     // if key exist then user has been edited
                //     Object.keys(this.state.user).map(key => {

                //         // check which key exist
                //         Object.keys(values).map(which => {

                //             if (key === which) {
                //                 Object.assign(this.state.user, { [which]: values[which] });
                //             }

                //         });

                //     });

                // }

                // get auth user
                let authUser = UserProfile.get();
                let roles = this.state.user.roles;
                // edited user
                // const { user } = this.state;
                const user = {
                    "username": values.username,
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "roles": roles !== null ? roles : undefined,
                }

                if (authUser !== null) {
                    if (authUser.token !== undefined && authUser.token !== null) {
                        // if anything was edited then make put request to the API
                        // console.log(user)
                        this.props.updateUser(id, user, authUser);
                        // list users
                        this.props.defaultItem();
                    }
                }
            // }
        }

    }

    // if role is assigned
    isAssigned = (role) => {
        return this.state.myRoles.includes(role);
    }

    handleChange = (event) => {

        // only add role if not exists
        if (!this.state.myRoles.includes(event.target.value)) {
            // add this roles
            this.state.myRoles.push(event.target.value);
        }
        // console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });

    }

    /**
     * Re-assign user roles or delete already given user roles
     */
    deleteUserRole = (role, user) => {

        // user object to be edited
        const propertiesEdited = {
            // get previously assigned roles
            roles: user.roles
        }
        // edit roles, or update roles
        // console.log([role][0][0])
        if([role][0][0] === 'writer' || [role][0][0] === 'publisher') {
            Object.assign(propertiesEdited.roles, { [role]: false, admin: false });
        } else {
            Object.assign(propertiesEdited.roles, { [role]: false });
        }
        
        // authenticated user
        const auth = UserProfile.get();
        if (auth !== null) {

            if (auth.token !== undefined && auth.token !== null) {
                // if anything was edited then make put request to the API
                // console.log(propertiesEdited)
                this.props.updateUser(user._id, propertiesEdited, auth);
                // list users
                this.props.defaultItem();
            }

        }

    }

    formFields = ({ user }) => {

        return (
            <div>
                <div className='margin-fix'>
                    <FormTextInputField
                        value={user !== null ? user.username : ''}
                        name='username' label='Username' type='text'
                        placeholder='Your username...' {...this.props}
                    />
                </div>
                <div className='margin-fix'>
                    <FormTextInputField
                        value={user !== null ? user.firstName : ''}
                        name='firstName' label='Firstname' type='text'
                        placeholder='Your firstname...' {...this.props}
                    />
                </div>
                <div className='margin-fix'>
                    <FormTextInputField
                        value={user !== null ? user.lastName : ''}
                        name='lastName' label='Lastname' type='text'
                        placeholder='Your lastname...' {...this.props}
                    />
                </div>
            </div>
        );

    }

    render() {

        const { user, myRoles } = this.state;
        const { handleClick, classes, handleSubmit, general, dirty } = this.props;

        // logged in user
        const current = UserProfile.get();
        const userAuth = this.props.user;
        // console.log(this.props)

        // access levels
        const accessLevels = profile.showActions();
        // console.log(current)
        return (
            <Fragment>

                {
                    current.roles.admin && (
                        <ButtonControl
                            intent={Intent.NONE}
                            value="List Accounts"
                            name="default"
                            handleClick={e => handleClick(e)}
                        />
                    )
                }

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#general">General</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#roles">Roles</a>
                    </li>
                </ul>

                {
                    general !== null && (

                        !general.isLoading ? (

                            <form
                                onSubmit={handleSubmit(values => {
                                    this.handleSubmit(current.roles.admin ? userAuth._id : current._id, values)
                                }
                                )}
                                autoComplete="off"
                            >

                                <div className="tab-content">

                                    {
                                        userAuth !== null && ((userAuth._id === current._id) ? (
                                            <>
                                                <div id="general" className="tab-pane active"><br />

                                                    {
                                                        this.formFields({ user: current })
                                                    }

                                                    <Button 
                                                        type="submit" 
                                                        color="primary" 
                                                        text="Update" 
                                                        disabled={ !dirty }
                                                    />

                                                    {
                                                        current.roles.admin && (
                                                            <Button
                                                                name="default" className={classes.margin}
                                                                text="Cancel" onClick={e => handleClick(e)}
                                                            />
                                                        )
                                                    }

                                                </div>
                                                <div id="roles" className="tab-pane fade"><br />

                                                    <FormControl>

                                                        <Paper elevation={0}>

                                                            <SelectInputControl
                                                                name="roles"
                                                                {...this.state}
                                                                value={this.state.roles}
                                                                onChange={e => this.handleChange(e)}
                                                                disabled={!accessLevels({ user: current })}
                                                            >
                                                                <option value="">{`Assign new role(s)`}</option>
                                                                <option value={`writer`}>Writer</option>
                                                                <option value={`publisher`}>Publisher</option>
                                                                <option value={`admin`}>Admin</option>
                                                            </SelectInputControl>

                                                        </Paper>

                                                    </FormControl>

                                                    <div className="row"><p> </p></div>
                                                    <div className="row">
                                                        <div>
                                                            {
                                                                myRoles.length !== 0 && (
                                                                    <p>The following role(s) will be assigned to <b>{userAuth.username}</b>:</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    {
                                                        myRoles && myRoles.map(role => {

                                                            if (role === '') return null;

                                                            return (
                                                                <Chip
                                                                    key={role}
                                                                    tabIndex={-1}
                                                                    label={role}
                                                                    // cannot delete role not yet assigned
                                                                    // however defining an undo action is in order
                                                                    // onDelete={ () => this.deleteUserRole(user) }
                                                                    deleteIcon={<CancelIcon />}
                                                                />
                                                            );

                                                        })
                                                    }

                                                    <div className="row">
                                                        <div>
                                                            {
                                                                userAuth !== null && ((this.assignedRoles({ user:userAuth })).length !== 0
                                                                    && accessLevels({ user: UserProfile.get() }) ? (
                                                                        <p>The following role(s) are assigned to <b>{userAuth.username}</b>:</p>
                                                                    ) : <p></p>)
                                                            }
                                                        </div>
                                                    </div>

                                                    {
                                                        userAuth !== null && (this.assignedRoles({ user: userAuth })).map(role => {

                                                            if (role !== null) {

                                                                return (
                                                                    <Chip
                                                                        key={role}
                                                                        tabIndex={-1}
                                                                        label={role}
                                                                        onDelete={() => this.deleteUserRole(role, current)}
                                                                        deleteIcon={<CancelIcon />}
                                                                    />
                                                                );

                                                            }

                                                            return null;

                                                        })
                                                    }

                                                    <div className={classes.margin} />
                                                    <div className={classes.margin} />
                                                    <div className={classes.margin} />
                                                    <div className={classes.margin} />

                                                    {
                                                        current.roles.admin && (
                                                            <Button
                                                                name="default" className={classes.margin}
                                                                text="Cancel" onClick={e => handleClick(e)}
                                                            />
                                                        )
                                                    }

                                                </div>
                                            </>
                                        ) : (
                                                <>
                                                    <div id="general" className="tab-pane active"><br />

                                                        {
                                                            this.formFields({ user: userAuth })
                                                        }

                                                        <Button type="submit" color="primary" text="Update" />

                                                        <Button
                                                            name="default" className={classes.margin}
                                                            text="Cancel" onClick={e => handleClick(e)}
                                                        />

                                                    </div>
                                                    <div id="roles" className="tab-pane fade">
                                                        <br />

                                                        <FormControl>

                                                            <Paper elevation={0}>

                                                                <SelectInputControl
                                                                    name="roles"
                                                                    {...this.state}
                                                                    value={this.state.roles}
                                                                    onChange={e => this.handleChange(e)}
                                                                >
                                                                    <option value="">{`Assign new role(s)`}</option>
                                                                    <option value={`writer`}>Writer</option>
                                                                    <option value={`publisher`}>Publisher</option>
                                                                    <option value={`admin`}>Admin</option>
                                                                </SelectInputControl>

                                                            </Paper>

                                                        </FormControl>

                                                        <div className="row">
                                                            <p> </p>
                                                        </div>

                                                        <div className="row">
                                                            <div>
                                                                {
                                                                    myRoles.length !== 0 && (
                                                                        <p>The following role(s) will be assigned to <b>{userAuth.username}</b>:</p>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                        {
                                                            myRoles && myRoles.map(role => {

                                                                if (role === '') return null;

                                                                return (
                                                                    <Chip
                                                                        key={role}
                                                                        tabIndex={-1}
                                                                        label={role}
                                                                        // cannot delete role not yet assigned
                                                                        // however defining an undo action is in order
                                                                        // onDelete={ () => this.deleteUserRole(user) }
                                                                        deleteIcon={<CancelIcon />}
                                                                    />
                                                                );

                                                            })
                                                        }

                                                        <div className="row">
                                                            <div>
                                                                {
                                                                    userAuth !== null && ((this.assignedRoles({ user: userAuth })).length !== 0 ? (
                                                                        <p>The following role(s) are assigned to <b>{userAuth.username}</b>:</p>
                                                                    ) : <p></p>)
                                                                }
                                                            </div>
                                                        </div>

                                                        {
                                                            userAuth !== null && (this.assignedRoles({ user:userAuth })).map(role => {

                                                                if (role !== null) {

                                                                    return (
                                                                        <Chip
                                                                            key={role}
                                                                            tabIndex={-1}
                                                                            label={role}
                                                                            onDelete={() => this.deleteUserRole(role, userAuth)}
                                                                            deleteIcon={<CancelIcon />}
                                                                        />
                                                                    );

                                                                }

                                                                return null;

                                                            })
                                                        }

                                                        <div className={classes.margin} />
                                                        <div className={classes.margin} />
                                                        <div className={classes.margin} />
                                                        <div className={classes.margin} />

                                                        <Button
                                                            name="default"
                                                            className={classes.margin}
                                                            text="Cancel" onClick={e => handleClick(e)}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        )
                                    }

                                </div>

                            </form>

                        ) : <div className="loader" />
                    )
                }

            </Fragment>
        );

    }

}

EditUserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: "editUser",
    Validate,
    AsyncValidate
})(withStyles(styles)(EditUserAccount));