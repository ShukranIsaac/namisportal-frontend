import { CMSType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get, post, patch, _delete } from './api.service';

/**
 * Get a single subcategories
 * 
 * @param category_id
 * 
 */
export const fetchCategory = (category_id) => {

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
 * Add a single subcategory
 * 
 * @param category_id
 * @param sub_category
 * @param token
 * 
 */
export const addCategory = (category_id, sub_category, token) => {

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

            dispatch(
                GeneralAction.fetchSuccess(
                    CMSType.REQUEST_ADD_SUB_CATE, 
                    response, 
                    false
                )
            )
  
        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    }

}

/**
 * Edit a single category
 * 
 * @param category
 * @param token
 */
export const editCategory = (category, token) => {

    const url = `categories/` + category._id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await patch(dispatch, url, category)
        
        .then((response) => {

            dispatch(
                GeneralAction.fetchSuccess(
                    CMSType.REQUEST_EDIT_SUB_CATE,
                    response, 
                    false
                )
            )

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
export const archiveCategory = (category, token) => {

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

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}