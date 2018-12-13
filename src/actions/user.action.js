import { UserType } from '../action_type/index';

import { isLoading, hasErrored, fetchSuccess } from './general.action';

export const login = (user) => {

    return (dispatch) => {

        dispatch(isLoading(true));

        return fetch(`/login`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));

            return response;
        })
        .then((response) => {
          dispatch(fetchSuccess(UserType.REQUEST_USER_LOGIN, user, false))
        })
        .catch(() => dispatch(hasErrored(true)));
    };

}

export const logout = (user) => {

    return (dispatch) => {

        dispatch(isLoading(true));

        return fetch(`/logout`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));

            return response;
        })
        .then((response) => {
          dispatch(fetchSuccess(UserType.REQUEST_USER_LOGOUT, user, false))
        })
        .catch(() => dispatch(hasErrored(true)));
    };

}
