import { HomeType } from '../action_type/index';
import * as GeneralAction from './general.action';
import { get } from './api.service';

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
 * Get a single category with all its subcategories 
 * 
 * @param category_id
 * 
 */
export const fetchHomeCategories = (category) => {

    const url = `categories?name=` + category;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {
            
            dispatch(GeneralAction.fetchSuccess(HomeType.REQUEST_HOME_DATA, response, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}