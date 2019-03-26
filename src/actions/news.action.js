import * as GeneralAction from './general.action';
import { get, post } from './api.service';
import { NewsType } from '../action_type';

/**
 * Fetch all news articles
 */
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


/**
 * Create a single article
 */
export const createArticle = (article, token) => {

    // url resource
    const url = `/news?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, article)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_CREATE_ARTICLE, response, false))
            
        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        });
        
    }

}