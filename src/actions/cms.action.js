import { CMSType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get, post, patch, _delete } from './api.service';
import Toast from '../toastfy';
import { initial } from './event.action';

/**
 * Get a single category
 * 
 * @param category
 * 
 */
export const fetchCategory = (category) => {

    const url = `categories?name=` + category;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_CATEGORY, response, false))

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download category. Please try again. ${ error }`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Get a single subcategory
 * 
 * @param category_id
 * 
 */
export const fetchSubCategory = (category_id) => {

    const url = `categories/` + category_id;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_SUB_CATEGORY, response, false))

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download sub-category. Please try again. ${ error }`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Get a single subcategory
 * 
 * @param category_id
 * 
 */
export const fetchQuestion = (category_id) => {

    const url = `categories/` + category_id;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_FA_QUESTION, response, false))

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download question. Please try again. ${ error }`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Add a single subcategory to a category
 * 
 * @param category_id
 * @param sub_category
 * @param token
 * 
 */
export const addCategory = (category_id, sub_category, token, link) => {

    // url
    let url;
    if (category_id === null) {
        // create new category
        url = `categories?token=` + token;
    } else {
        // create new sub-category
        url = `categories/` + category_id + `/sub-categories?token=` + token;
    }

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, sub_category)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Category successfully created!`
                })

                if (category_id === null) {
                    dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_CATEGORY, response, false))
                } else {
                    dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_SUB_CATE, response, false))
                }

                // fetch category: main category
                if (link) {
                    dispatch(fetchCategory(link));
                }

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial());

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `${error.message}: failed to create!`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    }

}

/**
 * Add a single subcategory to a category
 * 
 * @param category_id
 * @param sub_category
 * @param token
 * 
 */
export const addResourceCategory = (category_id, sub_category, token, link) => {

    // url
    let url;
    if (category_id === null) {
        // create new category
        url = `categories?token=` + token;
    } else {
        // create new sub-category
        url = `categories/` + category_id + `/sub-categories?token=` + token;
    }

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, sub_category)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Resource successfully created!`
                })

                if (category_id === null) {
                    dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_CATEGORY, response, false))
                } else {
                    dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_SUB_CATE, response, false))
                }

                // fetch category: main category
                if (link) {
                    dispatch(fetchCategory(link));
                }

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `${error.message}: failed to create!`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    }

}

/**
 * Edit a single resource category
 * 
 * @param category_id
 * @param edited_sub_category
 * @param token
 */
export const editResourceCategory = (category_id, edited_sub_category, token, link) => {

    const url = `categories/${category_id}?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await patch(dispatch, url, edited_sub_category)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `${ response.name } successfully updated.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_SUB_CATE, response, false))
                /**
                 * After updating a category
                 * make sure to fetch the main category and all its sub categories
                 */
                if (link) {
                    dispatch(fetchCategory(link));
                }

            })

            .catch(error => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `${error.message}: ${edited_sub_category.name} failed to update!`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Edit a single category
 * 
 * @param category_id
 * @param edited_sub_category
 * @param token
 */
export const editCategory = (category_id, edited_sub_category, token, category, link) => {

    const url = `categories/${category_id}?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await patch(dispatch, url, edited_sub_category)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `${ response.name } successfully updated.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_SUB_CATE, response, false))
                /**
                 * After updating a category
                 * make sure to fetch the main category and all its sub categories
                 */
                if (link) {
                    dispatch(fetchCategory(link));
                }
                console.log(link)

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial());

            })

            .catch(error => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `${error.message}: ${edited_sub_category.name} failed to update!`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Archive a single category
 * 
 * @param category
 * @param token
 */
export const archiveCategory = (category, token, link) => {

    const url = `categories/` + category._id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await _delete(dispatch, url)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `${ category.name } successfully deleted`
                })

                dispatch(
                    GeneralAction.fetchSuccess(
                        CMSType.REQUEST_DELETE_SUB_CATE,
                        response,
                        false
                    )
                )

                if (link) {
                    dispatch(fetchCategory(link));
                }

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to delete. Please try again. ${ error }`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Archive a single category
 * 
 * @param category
 * @param token
 */
export const archiveResourceCategory = (category, token, link) => {

    const url = `categories/` + category._id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await _delete(dispatch, url)

            .then((response) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `${ category.name } successfully deleted`
                })

                dispatch(
                    GeneralAction.fetchSuccess(
                        CMSType.REQUEST_DELETE_SUB_CATE,
                        response,
                        false
                    )
                )

                if (link) {
                    dispatch(fetchCategory(link));
                }

            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to delete. Please try again. ${ error }`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}