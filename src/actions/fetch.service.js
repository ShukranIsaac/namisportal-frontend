import * as GeneralAction from './general.action';

/**
 * Fetch response from the api, and return a Promise
 * 
 * @param {Function} dispatch
 * @param {String} url 
 * @param {Object} headers 
 * @returns {Promise} promise
 */
export const fetchResponse = async (dispatch, url, headers) => {

    return await fetch(url, new Headers(headers)).then((response) => {
  
        if (response.status !== 200) {
            throw Error(response.statusText);
        }
  
        dispatch(GeneralAction.isLoading(false));
  
        return response.json();
    })
  
  }