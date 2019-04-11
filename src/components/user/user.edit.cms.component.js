import React, { Component, Fragment } from 'react';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as UserAuthActions from '../../actions/user.action';

import styles from '../contact/form.styles';
import { PersonalProfile } from './user.register.personal';

/**
 * Edit user account details
 * 
 * @author Isaac S. Mwakabira
 */
class EditUserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }

    handleSubmit = (values) => {

        // define user data object
        const user = {
          username: values.username,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          password: values.password
        }
        console.log(user)
  
    }

    render() {

        const { handleClick, classes, pristine, submitting, handleSubmit, valid } = this.props;

        return (
            <Fragment>

                <ButtonControl intent={Intent.NONE} value="List Accounts" name="default" handleClick={e => handleClick(e) } />
                
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#general">General</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#roles">Roles</a>
                    </li>
                </ul>

                <form onSubmit={ handleSubmit(values => this.handleSubmit(values)) } autoComplete="off">

                    <div className="tab-content">

                        <div id="general" className="tab-pane active"><br />

                            <PersonalProfile { ...this.state } props={ this.props } />

                            <Button 
                                type="submit" disabled={!valid  || pristine || submitting} 
                                color="primary" text="Update" 
                                onClick={ handleSubmit(values => this.handleSubmit(values ))}
                            />
                            
                            <Button 
                                name="default" className={ classes.margin } 
                                text="Cancel" onClick={ e => handleClick(e) } 
                            />

                        </div>
                        <div id="roles" className="tab-pane fade"><br />
                            User roles
                        </div>

                    </div>

                </form>

            </Fragment>
        );
        
    }

}

EditUserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {

    return {
        general: state.general.general,
        user: state.user.user,
    }
  
}
  
const mapDispatchToProps = (dispatch) => {

    return {
        updateUser: (user, token) => { dispatch(UserAuthActions.update(user, token)) },
    }

}

export default reduxForm({
    form: "editUser",
    Validate, 
    AsyncValidate
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditUserAccount)));