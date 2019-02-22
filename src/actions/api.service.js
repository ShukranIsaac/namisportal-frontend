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
    
    return await Config.REMOTE_API_URL.post(url, data)

    .then(response => {
        
        if (response.status !== 200) {
            throw Error(response.statusText);
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
    form.append('file', data.file[0]);
    form.append('name', data.name);
    form.append('description', data.about)
    // console.log(data)
    // console.log(form)

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
export const patch = async (dispatch, url, data) => {
    
    return await Config.REMOTE_API_URL.patch(url, data)

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