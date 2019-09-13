import React, { Component, Fragment } from 'react';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from '../contact/form.styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import { SelectInputControl } from '../forms/form.selectinput.field';
import { UserProfile, profile } from './user.profile';
import CustomizedSnackbars from '../cms/snackbar.feedback';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';

/**
 * Edit user account details
 * 
 * @author Isaac S. Mwakabira
 */
class EditUserAccount extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                roles: {}
            },
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

    handleTextChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (id, event) => {
        // Prevent default submit action
        event.preventDefault();
        const {
            username,
            firstname,
            lastname,
            myRoles,
            old_password,
            new_password
        } = this.state;

        // check previous values of user and update if roles changed
        if (username || firstname || lastname || myRoles || (new_password && old_password)) {
            // if (this.state.user.roles !== undefined) {

            // user roles changed reassign new ones
            if (this.isAssigned('writer')) {
                Object.assign(this.state.user.roles, { writer: true })
            }

            // user roles changed reassign new ones
            if (this.isAssigned('publisher')) {
                Object.assign(this.state.user.roles, { publisher: true });
            }

            // user roles changed reassign new ones
            if (this.isAssigned('admin')) {
                Object.assign(this.state.user.roles, { admin: true });
            }

            // get auth user
            let authUser = UserProfile.get();
            let roles = this.state.user.roles;
            // edited user
            // const { user } = this.state;
            const user = {
                username: username,
                firstName: firstname,
                lastName: lastname,
                roles: roles,
                password: new_password && old_password ? new_password : undefined
            }

            if (authUser !== null) {
                if (authUser.token !== undefined && authUser.token !== null) {
                    // if anything was edited then make put request to the API
                    // console.log(user)
                    this.props.updateUser(id, user, authUser);
                    // list users
                    const { general } = this.props;
                    if (general) {
                        if (!general.isLoading) {
                            if (!general.hasErrored) {
                                this.props.defaultItem();
                            }
                        }
                    }
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
        if ([role][0][0] === 'writer' || [role][0][0] === 'publisher' || [role][0][0] === 'admin') {
            Object.assign(propertiesEdited.roles, { [role]: false });
        }

        // authenticated user
        const auth = UserProfile.get();
        if (auth !== null) {

            if (auth.token !== undefined && auth.token !== null) {
                // if anything was edited then make put request to the API
                // console.log(propertiesEdited)
                this.props.updateUser(user._id, propertiesEdited, auth);
                // list users if no error
                const { general } = this.props;
                if (general) {
                    if (!general.isLoading) {
                        if (!general.hasErrored) {
                            this.props.defaultItem();
                        }
                    }
                }
            }

        }

    }

    formFields = ({ user }) => {

        return (
            <div>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={user !== null ? (this.state.firstname ? this.state.firstname : user.firstName) : ''}
                            name='firstname'
                            label='Firstname'
                            type='text'
                            placeholder='Your firstname...'
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={user !== null ? (this.state.lastname ? this.state.lastname : user.lastName) : ''}
                            name='lastname'
                            label='Lastname'
                            type='text'
                            placeholder='Your lastname...'
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <BootsrapTextField
                            value={user !== null ? (this.state.username ? this.state.username : user.username) : ''}
                            name='username'
                            label='Username'
                            type='text'
                            placeholder='Your username...'
                            handleChange={this.handleTextChange}
                        />
                    </BootstrapGridColumn>
                </div>
            </div>
        );

    }

    changePassword = () => {

        return (
            <div className='margin-fix form-row'>
                <BootstrapGridColumn>
                    <BootsrapTextField
                        value={this.state.old_password}
                        name='old_password'
                        label='Old Password*'
                        type='password'
                        placeholder='Your old password...'
                        handleChange={this.handleTextChange}
                    />
                </BootstrapGridColumn>
                <BootstrapGridColumn>
                    <BootsrapTextField
                        value={this.state.new_password}
                        name='new_password'
                        label='New Password*'
                        type='password'
                        placeholder='Your new password...'
                        handleChange={this.handleTextChange}
                    />
                </BootstrapGridColumn>
            </div>
        );

    }

    render() {

        const {
            /*user,*/
            myRoles,
            username, firstname, lastname,
            new_password, old_password
        } = this.state;
        const { handleClick, classes, general } = this.props;

        // logged in user
        const current = UserProfile.get();
        const userAuth = this.props.user;
        // console.log(this.props)

        // access levels
        const accessLevels = profile.showActions();

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
                    {
                        // if logged in account is not an admin
                        // do not show Add Role(s) tab, since they cannot assign or revoke user roles to and 
                        // from their accounts or others accounts
                        current && (
                            current.roles.admin && (
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#roles">Add Role(s)</a>
                                </li>
                            )
                        )
                    }
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#changePassword">Change Password</a>
                    </li>
                </ul>

                {
                    general !== null && (

                        !general.isLoading ? (

                            <form
                                onSubmit={(e) => this.handleSubmit(current.roles.admin ? userAuth._id : current._id, e)}
                                autoComplete="off"
                                noValidate
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
                                                        disabled={!(firstname || username || lastname)}
                                                    />

                                                    <Button
                                                        name="default" className={classes.margin}
                                                        text="Cancel" onClick={e => handleClick(e)}
                                                    />

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
                                                                userAuth !== null && ((this.assignedRoles({ user: userAuth })).length !== 0
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

                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        text="Update"
                                                        disabled={myRoles.length === 0}
                                                    />
                                                    <Button
                                                        name="default" className={classes.margin}
                                                        text="Cancel" onClick={e => handleClick(e)}
                                                    />

                                                </div>
                                                <div id="changePassword" className="tab-pane fade"><br />

                                                    <h4>{`Change password for `}<b>{`${userAuth.username}`}</b></h4>
                                                    {/* <br /> */}

                                                    {
                                                        this.changePassword()
                                                    }

                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        text="Change"
                                                        disabled={!(old_password && new_password)}
                                                    />

                                                    <Button
                                                        name="default" className={classes.margin}
                                                        text="Cancel" onClick={e => handleClick(e)}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                                <>
                                                    <div id="general" className="tab-pane active"><br />

                                                        {
                                                            this.formFields({ user: userAuth })
                                                        }

                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            text="Update"
                                                            disabled={!(firstname || username || lastname)}
                                                        />

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
                                                            userAuth !== null && (this.assignedRoles({ user: userAuth })).map(role => {

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
                                                            type="submit"
                                                            color="primary"
                                                            text="Update"
                                                            disabled={myRoles.length === 0}
                                                        />

                                                        <Button
                                                            name="default"
                                                            className={classes.margin}
                                                            text="Cancel" onClick={e => handleClick(e)}
                                                        />
                                                    </div>
                                                    <div id="changePassword" className="tab-pane fade"><br />

                                                        <h4>{`Change password for `}<b>{`${userAuth.username}`}</b></h4>
                                                        {/* <br /> */}

                                                        {
                                                            this.changePassword()
                                                        }

                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            text="Change"
                                                            disabled={!(old_password && new_password)}
                                                        />

                                                        <Button
                                                            name="default" className={classes.margin}
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

                {
                    (general) && (
                        (!general.isLoading) && (
                            (general.hasErrored) ? <CustomizedSnackbars type={`error`} /> : null
                        )
                    )
                }

            </Fragment>
        );

    }

}

EditUserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(EditUserAccount));