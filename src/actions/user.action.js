import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';

export const login = (user) => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/login`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(UserType.REQUEST_USER_LOGIN, user, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

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
