import { HomeType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get, post, patch } from './api.service';

/**
 * Fetch initial home details: Components
 * 
 * @param category_id
 * 
 */
export const fetchHomeDetails = () => {

    const url = `categories`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(HomeType.REQUEST_HOME_DATA, response, false))

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
export const addHomeSubcategory = (category_id, sub_category, token) => {

    const url = `categories/` + category_id + `/sub-categories?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, sub_category)

        .then((response) => {

            dispatch(
                GeneralAction.fetchSuccess(
                    HomeType.REQUEST_ADD_HOME_SUB_CATE, 
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
export const editHomeCategory = (category, token) => {

    const url = `categories/` + category._id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await patch(dispatch, url)
        
        .then((response) => {

            dispatch(
                GeneralAction.fetchSuccess(
                    HomeType.REQUEST_EDIT_HOME_SUB_CATE,
                    response, 
                    false
                )
            )

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}

/**
 * Get a single category with all its subcategories 
 * 
 * @param category_id
 * 
 */
export const fetchHomeCategories = (category_id) => {

    const url = `categories/` + category_id;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(HomeType.REQUEST_HOME_DATA, response, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}