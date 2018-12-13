import { UserType } from '../action_type/index';

import * as GeneralAction from './general.action';

import Config from '../config';

export const fetchHomeData = () => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/home`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(UserType.REQUECT_HOME_DATA, ["home huhu"], false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}
