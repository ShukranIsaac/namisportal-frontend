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

    return await Config.APIUrl.get(url)
    
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
 * @returns {Promise} promise
 */
export const post = async (dispatch, url, data) => {
    
    return await Config.APIUrl.post(url, data)

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
 * @returns {Promise} promise
 */
export const patch = async (dispatch, url, data) => {
    
    return await Config.APIUrl.patch(url, data)

    .then(response => {
        
        if (response.status !== 200) {
            throw Error(response.statusText);
        }
    
        dispatch(GeneralAction.isLoading(false));
    
        return response.data;

    });
  
}