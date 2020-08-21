import * as GeneralAction from './general.action';
import { get, post, patch, _delete } from './api.service';
import { NewsType } from '../action_type';
import Toast from '../toastfy';
import { initial } from './event.action';

/**
 * Fetch all news articles
 */
export const fetchAllArticles = (category) => {

    // resource
    const url = `/categories?name=${category}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then(response => {

                dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_ALL_ARTICLES, response, false))

            })

            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download all articles. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true));

            })
    }

}


/**
 * Create a single article
 */
export const createArticle = (category, article, user) => {

    // resource to post data to
    const url = `/categories/${category}/sub-categories?token=${user.token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, article)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `New article successfully created.`
                })

                dispatch(GeneralAction.createSuccess(NewsType.REQUEST_CREATE_ARTICLE, response, false))

                // fetch all articles
                dispatch(fetchAllArticles('News'))

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to  create new article. Please try again. ${error}`
                })

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
    const url = `categories/${id}?token=${token}`;

    // fetch
    return async dispatch => {

        // status is loading
        dispatch(GeneralAction.isLoading(true));

        // make patch request
        return await patch(dispatch, url, article)

            // success then return response from server
            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Article successfully updated.`
                })

                // dispatch response
                dispatch(GeneralAction.updateSuccess(NewsType.REQUEST_EDIT_ARTICLE, response, false))

                dispatch(fetchAllArticles('News'))

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            // if error, dispatch corresponding functions and data
            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to update article. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true));

            })

    }

}

/**
 * Fetch single article
 * 
 * @param {String} id 
 */
export const fetchArticleById = (id, token) => {

    // url resource
    const url = `/categories/${id}?token=${token}`;

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
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download article. Please try again. ${error}`
                })

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
    const url = `categories/${id}?token=${token}`;

    // fetch
    return async dispatch => {

        // show loading status
        dispatch(GeneralAction.isLoading(true));

        // make request
        return await _delete(dispatch, url)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Article successfully deleted.`
                })

                // dispatch
                dispatch(GeneralAction.fetchSuccess(NewsType.REQUEST_DELETE_ARTICLE, response, false))

                dispatch(fetchAllArticles('News'))

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to delete article. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true));

            });

    }

}