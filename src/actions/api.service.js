import * as GeneralAction from './general.action';
import Config from '../config';

/**
 * Fetch response from the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @returns {Promise} promise
 */
export const get = async (dispatch, url) => {

    return await Config.REMOTE_API_URL.get(url)
    
    .then((response) => {
        
        if (response.status !== 200) {
            throw Error(response.statusText);
        }
        
        dispatch(GeneralAction.isLoading(false));
  
        return response.data;
    })
  
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

    return await Config.REMOTE_API_URL.post(url, data, config)

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
            form.append('description', data.about);
        }
    } else {
        form.append('file', data.image[0]);
    }

    return await Config.REMOTE_API_URL.post(url, form)

    .then(response => {
    
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

    return await Config.REMOTE_API_URL.put(url, JSON.stringify(data), config)

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

    return await Config.REMOTE_API_URL.patch(url, data, config)

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
    
    return await Config.REMOTE_API_URL.delete(url)

    .then(response => {
        
        if (response.status !== 200) {
            throw Error(response.statusText);
        }
    
        dispatch(GeneralAction.isLoading(false));
    
        return response.data;

    });
  
}