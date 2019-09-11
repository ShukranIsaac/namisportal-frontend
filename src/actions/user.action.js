import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';
import { post, get, put, _delete } from './api.service';
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

            .catch(error => {

                console.log(error)
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

        if (user !== null) {

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
                // the list all users
                const auth = UserProfile.get();
                if(auth!==null && (auth.token!==undefined)) {
                    dispatch(fetchUsers({ user:auth }))
                }

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
export const contact = (contact) => {

    const url = `contacts/message`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, contact)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_CONTACT_US, response, false))

            })

            .catch((error) => {

                console.log(error);
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

/**
 * Fetch all registered users
 * 
 * @returns {Function} dispatch
 */
export const fetchUsers = ({ user }) => {

    const url = `users?token=${user.token}`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_ALL, response, false))

            })

            .catch((error) => {

                dispatch(GeneralAction.hasErrored(true))

            });
    };

}

/**
 * Fetch a single registered user
 * 
 * @returns {Function} dispatch
 */
export const fetchUser = (id, token) => {

    const url = `users/${id}?token=${token}`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_SINGLE, response, false))

            })

            .catch((error) => {

                dispatch(GeneralAction.hasErrored(true))

            });
    };

}

/**
 * Update the registered user
 * 
 * @returns {Function} dispatch
 */
export const updateUser = (id, user, auth) => {

    // url to update user
    const url = `users/${id}?token=${auth.token}`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await put(dispatch, url, user)

            .then((response) => {

                /**
                 * 
                 * Compare ids from the edited acount from the api and the already
                 * authenticated user in the local storage.
                 * 
                 * if logged in account was updated, update their account too
                 * with new details.
                 * 
                 */
                if (response.user._id === auth._id) {
                    // update local storage
                    let editedUser = response.user;
                    Object.assign(editedUser, { token: auth.token });
                    // console.log(editedUser)
                    // save account
                    UserProfile.save(editedUser);
                } else {
                    // other account was updated
                    dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_EDIT, response, false))
                    // the list all users
                    dispatch(fetchUsers({ user: UserProfile.get() }))
                }

            })

            .catch((error) => {
                console.log(error)
                dispatch(GeneralAction.hasErrored(true))

            });
    };

}

/**
 * Delete registered user
 * 
 * @returns {Function} dispatch
 */
export const deleteAccount = (id, token) => {

    // url to update user
    const url = `users/${id}?token=${token}`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await _delete(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_DELETE, response, false))
                // the list all users
                dispatch(fetchUsers({ user: UserProfile.get() }))

            })

            .catch((error) => {

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}
