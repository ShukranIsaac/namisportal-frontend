import * as GeneralAction from './general.action';
import { get, post, patch, _delete } from './api.service';
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

            dispatch(GeneralAction.createSuccess(NewsType.REQUEST_CREATE_ARTICLE, response, false))

            // fetch all articles
            dispatch(fetchAllArticles())
            
        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        });
        
    }

}

/**
 * Edit a single article
 * 
 * @param {String} id 
 * @param {Object} article 
 * @param {String} token 
 */
export const editArticle = (id, article, token) => {

    // url resource
    const url = `news/` + id + `?token=` + token;

    // fetch
    return async dispatch => {

        // status is loading
        dispatch(GeneralAction.isLoading(true));

        // make patch request
        return await patch(dispatch, url, article)

        // success then return response from server
        .then(response => {

            // dispatch response
            dispatch(GeneralAction.updateSuccess(NewsType.REQUEST_EDIT_ARTICLE, response, false))

            dispatch(fetchAllArticles())
        })

        // if error, dispatch corresponding functions and data
        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        })

    }

}

/**
 * Fetch single article
 * 
 * @param {String} id 
 */
export const fetchArticleById = (id) => {

    // url resource
    const url = `news/` + id;

    // fetch
    return async dispatch => {

        // show loading status
        dispatch(GeneralAction.isLoading(true));

        // make request
        return await get(dispatch, url)

        .then(response => {

            // dispatch
            dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_SINGLE_ARTICLE, response, false))

        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        });

    }

}

/**
 * Delete single article
 * 
 * @param {String} id 
 */
export const deleteArticle = (id, token) => {

    // url resource
    const url = `news/` + id + `?token=` + token;

    // fetch
    return async dispatch => {

        // show loading status
        dispatch(GeneralAction.isLoading(true));

        // make request
        return await _delete(dispatch, url)

        .then(response => {

            // dispatch
            dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_DELETE_ARTICLE, response, false))

            dispatch(fetchAllArticles())

        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        });

    }

}