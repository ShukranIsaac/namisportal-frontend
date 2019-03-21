import * as GeneralAction from './general.action';
import { post, get, patch, upload } from './api.service';
import { CMSType } from '../action_type';

/**
 * Create new stakeholder
 * 
 * @param {Object} stakeholder
 * @param {String} token
 * 
 * @returns {Function} dispatch
 */
export const createStakeholder = (stakeholder, token) => {

    // post stakeholder to resource
    const url = `stakeholders?token` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, stakeholder)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_STAKEHOLDER, response, false))

        })

        .catch(error => {

            dispatch(GeneralAction.hasErrored(true))

        });

    }

}

/**
 * List all directory stakeholders
 * 
 * @returns {Function} dispatch
 */
export const fetchAllStakeholders = () => {
    // url resource
    const url = `stakeholders`;

    return async dispatch => {
        // is loading true
        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_LIST_STAKEHOLDER, response, false))

        })

        .catch(error => {

            dispatch(GeneralAction.hasErrored(true))

        });

    }

}

/**
 * Edit a single directory stakeholder
 * 
 * @param {String} id
 * @param {Object} stakeholder
 * @param {String} token
 * 
 * @returns {Function} dispatch
 */
export const editStakeholder = (id, stakeholder, token) => {

    // url
    const url = `stakeholders/` + id + `?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true))

        return await patch(dispatch, url, stakeholder)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_STAKEHOLDER, response, false))

        })

        .catch(error => {

            dispatch(GeneralAction.hasErrored(false))

        });

    }

}

/**
 * Fetch a single directory stakeholder
 * 
 * @param {String} id
 * 
 * @returns {Function} dispatch
 */
export const fetchSingleStakeholder = (id) => {
    
    // url
    const url = `stakeholders/` + id;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true))

        return await get(dispatch, url)

        .then(response => {
            
            dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_A_STAKEHOLDER, response, false))

        })

        .catch(error => {

            dispatch(GeneralAction.hasErrored(true))

        });

    }

}

/**
 * Upload an logo for the any given stakeholder
 * 
 * @param {String} id 
 * @param {Image} image 
 * @param {String} token 
 */
export const uploadStakeholderLogo = (id, image, token) => {

    // url
    const url = `stakeholders/` + id + `/files?token=` + token;
    
    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await upload(dispatch, url, image)

        .then(response => {
            
            dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_STAKEHOLDER_IMAGE, response, false))

        })

        .catch(error => {
            console.log(error)
            dispatch(GeneralAction.hasErrored(true))

        });
        
    }

}