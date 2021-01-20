import * as GeneralAction from './general.action';
import { post, get, patch, _delete, update } from './api.service';
import { CMSType } from '../action_type';
import Toast from '../toastfy';
import { initial } from './event.action';

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
    const url = `stakeholders?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, stakeholder)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `${response.name} successfully created.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_STAKEHOLDER, response, false))

                dispatch(fetchAllStakeholders())

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to create new stakeholder. Please try again. ${error}`
                })

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

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download all stakeholders. Please try again. ${error}`
                })

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
    const url = `stakeholders/${id}?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true))

        return await patch(dispatch, url, stakeholder)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Stakeholder successfully updated.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_EDIT_STAKEHOLDER, response, false))

                dispatch(fetchAllStakeholders())

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to edit stakeholder. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(false))

            });

    }

}

/**
 * Delete a single directory stakeholder 
 * 
 * @param {String} stakeholder_id 
 * @param {String} token 
 */
export const deleteStakeholder = (stakeholder_id, token) => {
    // url
    const url = `stakeholders/${stakeholder_id}?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true))

        return await _delete(dispatch, url, stakeholder_id)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Stakeholder successfully deleted.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_DELETE_STAKEHOLDER, response, false))

                dispatch(fetchAllStakeholders())

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                console.log(error)
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to delete stakeholder. Please try again. ${error}`
                })

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
    const url = `stakeholders/${id}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true))

        return await get(dispatch, url)

            .then(response => {

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_A_STAKEHOLDER, response, false))

            })

            .catch(error => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download single stakeholder. Please try again. ${error}`
                })

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
    const url = `stakeholders/${id}/files?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await update(dispatch, url, image)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `Stakeholder's logo successfully uploaded.`
                })

                dispatch(GeneralAction.fetchSuccess(CMSType.REQUEST_ADD_STAKEHOLDER_IMAGE, response, false))

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {
                console.log(error)

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to upload stakeholder's logo. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    }

}