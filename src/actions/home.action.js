import { REQUECT_HOME_DATA } from '../action_type/index';
import { isLoading, hasErrored, fetchSuccess } from './general.actions';

import Config from '../config';

export const fetchHomeData = () => {

    return (dispatch) => {

        dispatch(isLoading(true));

        return fetch(`/home`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));

            return response;
        })
        .then((response) => {
          dispatch(fetchSuccess(REQUECT_HOME_DATA, ["home huhu"], false))
        })
        .catch(() => dispatch(hasErrored(true)));
    };

}
