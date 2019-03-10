import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';
import { post, get } from './api.service';
import { UserProfile } from '../components/user/user.profile';

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

        dispatch(GeneralAction.isLoading(true))

        return await post(dispatch, url, credentials)
        
        .then((response) => {

            // Save the authenticated user to local storage
            // And dispatch a success action to the store.
            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGIN, UserProfile.save(response), false))

        })
        
        .catch(() => {

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

        if(user !== null) {

            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGOUT, UserProfile.logout(user), false))

        }

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

            dispatch(GeneralAction.hasErrored(true))

        });
    };

}

/**
 * Send contact message to the admin
 * 
 * @param {Object} contact 
 * @returns {Function} dispatch
 */
export const contact = (contact, user) => {
    
    const url = `users/contact`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));
        
        return await post(dispatch, url, contact)
        
        .then((response) => {

            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_CONTACT_US, response, false))

        })
        
        .catch((error) => {

            dispatch(GeneralAction.hasErrored(true))

        });
    };

}

/**
 * Fetch contacts
 * 
 * @param {Object} contact 
 * @returns {Function} dispatch
 */
export const fetchContact = (name) => {
    
    const url = `users/contact?name=${name}`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

            dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_CONTACT, response, false))

        })
        
        .catch((error) => {

            dispatch(GeneralAction.hasErrored(true))

        });
    };

}
