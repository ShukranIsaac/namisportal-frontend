import * as GeneralAction from './general.action';
import { get } from './api.service';
import { NewsType } from '../action_type';

export const fetchAllArticles = () => {

    // resource
    const url = `/news`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_ALL_ARTICLES, response, false))
            
        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        })
    }

}