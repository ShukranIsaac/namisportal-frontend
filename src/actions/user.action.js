import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';
import { post } from './api.service';

/**
 * Save user details to the local store/persist
 * 
 * @param {Object} user 
 */
const save = (user) => {
    // save user to local storage
    const storage = null
    const loggedIn = null;

    try {

        storage = localStorage.setItem('cms_current_user', JSON.stringify(user));

    } catch (error) {

        return error;

    }

    try {

        loggedIn = storage.getItem('cms_current_user');
        if(JSON.parse(loggedIn).hash !== null) {

            return JSON.parse(loggedIn);

        } else {

            return null;

        }

    } catch (error) {

        return error;

    }
    
}

/**
 * Authenticate user with API and return authenticated user with token
 * 
 * @param {Object} loginCredentials 
 * @returns {Object} user
 */
export const login = (credentials) => {
    // users login resource url
    const url = `users/authenticate`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, credentials)
        
        .then((response) => {

            console.log(response);
            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGIN, response, false))

        })
        
        .catch((error) => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true))

        });

    };

}

/**
 * End user session
 * 
 * @param {Object} user 
 */
export const logout = (user) => {

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetch(`/logout`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;

        }).then((response) => {

            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGOUT, user, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

/**
 * Register this user
 * 
 * @param {Object} body 
 * @returns {Function} dispatch
 */
export const register = (user) => {
    
    const url = `users/register`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, user)
        
        .then((response) => {

            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_REGISTER, response, false))

        })
        
        .catch((error) => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true))

        });
    };

}
