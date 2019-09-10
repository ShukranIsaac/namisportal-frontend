import { CMSType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get, post, patch, _delete } from './api.service';

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
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

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
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

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
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

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
export const addCategory = (category_id, sub_category, token,link) => {

    // url
    let url;
    if(category_id === null) {
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
            console.log(link)
            if(category_id === null) {
                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_CATEGORY, response, false))
            } else {
                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_SUB_CATE, response, false))
            }

            // fetch category: main category
            if (link !== null) {
                dispatch(fetchCategory(link));
            }
  
        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    }

}

/**
 * Edit a single category
 * 
 * @param category_id
 * @param edited_sub_category
 * @param token
 */
export const editCategory = (category_id, edited_sub_category, token, category, link) => {
    
    const url = `categories/` + category_id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await patch(dispatch, url, edited_sub_category)
        
        .then((response) => {

            if (category.name === 'Licensing') {
                category.subCategories.splice(category.subCategories.findIndex(o => o._id === response._id), 1, response);
                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_SUB_CATE, category, false))
            } else {
                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_SUB_CATE, response, false))
            }
            /**
             * After updating a question
             * make sure to fetch all questions
             */
            if (link) {
                dispatch(fetchCategory(link));
            }

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

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
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}