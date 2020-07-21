import * as GeneralAction from './general.action';
import Config from '../config';
// import Toast from '../toastfy';

const progressEvent = (dispatch, config) => ({
    onUploadProgress: ProgressEvent => {
        const percetange = (ProgressEvent.loaded / ProgressEvent.total * 100)
        //  update store and show upload progress
        dispatch(GeneralAction.loaded(percetange))

        // show progress and keep toast reference id
        // Toast.progress(percetange);
    },
    ...config
})

/**
 * Fetch response from the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @returns {Promise} promise
 */
export const get = async (dispatch, url) => {

    return await Config.DEV_REMOTE_API_URL.get(url)

        .then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;
        })

}

/**
 * Post message to the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @param {Object} data
 * @returns {Promise} promise
 */
export const emailMessage = async (dispatch, url, data) => {

    // headers
    const config = new Headers();
    config.append('Access-Control-Allow-Origin', Config.ACCESS_ALLOW_ORIGIN);

    return await Config.DEV_REMOTE_API_URL.post(url, data, config)

        .then(response => {

            if (response.status !== 200) {
                throw Error(response);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;

        });

}

/**
 * Post data to the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @param {Object} data
 * @returns {Promise} promise
 */
export const post = async (dispatch, url, data) => {

    // headers
    const config = new Headers();
    config.append('Access-Control-Allow-Origin', Config.ACCESS_ALLOW_ORIGIN);

    return await Config.DEV_REMOTE_API_URL.post(url, data, config)

        .then(response => {

            if (response.status !== 200) {
                throw Error(response);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;

        });

}

/**
 * Upload data to the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @param {Object} data
 * @returns {Promise} promise
 */
export const upload = async (dispatch, url, data) => {

    let form = new FormData();
    // check the file type
    if (data.file !== undefined && data.file !== null) {
        if (data.file[0].type === 'application/pdf') {
            form.append('file', data.file[0]);
            form.append('name', data.name);
            form.append('shortName', data.shortName);
            form.append('description', data.about);
            form.append('content-type', 'multipart/form-data')
        }
    } else {
        form.append('file', data.image[0]);
    }

    return await Config.DEV_REMOTE_API_URL

        .post(url, form, progressEvent(dispatch, null))

        .then(response => {

            // Upload is done! 
            // The remaining progress bar will be filled up
            // The toast will be closed when the transition end
            // cancel toast progress and exit
            // using the reference returned from progress
            // Toast.progress(100).done();

            dispatch(GeneralAction.isLoading(false));

            return response;

        });

}

/**
 * Upload data to the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @param {Object} data
 * @returns {Promise} promise
 */
export const update = async (dispatch, url, data) => {

    let form = new FormData();
    // check the file type
    if (data.file !== undefined && data.file !== null) {
        if (data.file[0].type === 'application/pdf') {
            form.append('file', data.file ? data.file[0] : null);
            form.append('name', data.name);
            form.append('shortName', data.shortName);
            form.append('description', data.about);
            form.append('content-type', 'multipart/form-data')
        }
    } else {
        // form.append('file', data.image[0]);
        form.append('name', data.name)
        form.append('shortName', data.shortName);
        form.append('description', data.description)
    }

    return await Config.DEV_REMOTE_API_URL

        .patch(url, form, progressEvent(dispatch, null))

        .then(response => {

            // Upload is done! 
            // The remaining progress bar will be filled up
            // The toast will be closed when the transition end
            // cancel toast progress and exit
            // using the reference returned from progress
            // Toast.progress(100).done();
            dispatch(GeneralAction.isLoading(false));

            return response;

        });

}

/**
 * Edit a resource via the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url
 * @param {Object} data
 *  
 * @returns {Promise} promise
 */
export const put = async (dispatch, url, data) => {

    // headers
    const config = new Headers();
    config.append('Access-Control-Allow-Origin', Config.ACCESS_ALLOW_ORIGIN);
    // config.append('withCredentials', true);

    return await Config.DEV_REMOTE_API_URL.put(url, data, config)

        .then(response => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;

        });

}

/**
 * Edit a resource via the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url
 * @param {Object} data
 *  
 * @returns {Promise} promise
 */
export const patch = async (dispatch, url, data) => {

    // headers
    const config = new Headers();
    config.append('Access-Control-Allow-Origin', Config.ACCESS_ALLOW_ORIGIN);
    // config.append('withCredentials', true);

    return await Config.DEV_REMOTE_API_URL.patch(url, data, progressEvent(dispatch))

        .then(response => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;

        });

}

/**
 * Delete a resource via the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @returns {Promise} promise
 */
export const _delete = async (dispatch, url) => {

    return await Config.DEV_REMOTE_API_URL.delete(url)

        .then(response => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.data;

        });

}