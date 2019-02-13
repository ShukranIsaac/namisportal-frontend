import * as GeneralAction from './general.action';
import { post, get } from './api.service';
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