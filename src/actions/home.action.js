import { HomeType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get } from './api.service';

/**
 * Fetch home details: Components
 * 
 * @param Isaac S. Mwakabira
 * 
 */
export const fetchHomeDetails = () => {

    const url = `categories`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(HomeType.REQUEST_HOME_DATA, response, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}
