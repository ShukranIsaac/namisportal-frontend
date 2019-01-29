import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';
import { fetchResponse } from './fetch.service';
import Config from '../config';

/**
 * Save user details to the local store/persist
 * 
 * @param {Object} user 
 */
const save = (user) => {
    // save user

    return user;
}

/**
 * Authenticate user with API and return authenticated user with token
 * 
 * @param {Object} loginCredentials 
 * @returns {Object} user
 */
export const login = (loginCredentials) => {

    const url = Config.APIUrl + 'users/authenticate';

    const headers = {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        //creadentials: {},
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(url, new Headers(headers))
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGIN, response, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

/**
 * End user session
 * 
 * @param {Object} user 
 */
export const logout = (user) => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/logout`).then((response) => {

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
export const register = (body) => {
    
    const url = Config.APIUrl + 'users/register';
console.log(url);
    const headers = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //creadentials: {},
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(url, new Headers(headers))
        
        .then((response) => {
console.log(response);
          dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_REGISTER, response, false))

        })
        
        .catch(() => {
            console.log("Erred here...");
            dispatch(GeneralAction.hasErrored(true))

        });
    };

}
