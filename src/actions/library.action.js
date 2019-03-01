import { LibraryType } from '../action_type/index';

import * as GeneralAction from './general.action';

import library_docs from '../components/library/library_docs';
import Config from '../config';
import { get, post, upload } from './api.service';

/**
 * Filter or return all documents in this category
 * 
 * @param {Array} docs 
 * @param {String} category_name 
 * @returns {Array} category
 */
const filterDocLibrary = (docs, category_name) => {
   
    return (Object.entries(docs).filter((category) => {

        if (category[0] === category_name) {
            
            return category;

        }

        return null;
    }));

}

export const addSubCategory = (id, subcategory) => {
    // console.log(subcategory)
    // resource to post data to
    const url = `/categoris/` + id + `/sub-categories`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, subcategory)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(LibraryType.ADD_NEW_SUB_CATEGORY_DOCS, response, false))

        })

        .catch(() => dispatch(GeneralAction.hasErrored(true)))
    }

}

export const fetchLibraryCategory = (category) => {

    const url = `/categories?name=` + category;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

        .then(response => {

            dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY, response, false))
        
        })

        .catch( error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true))

        })
    }

}

export const fetchLibrary = (category) => {
    // console.log(category)
    const url = `/categories`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(
            GeneralAction.fetchSuccess(
              LibraryType.FETCH_LIBRARY,
              filterDocLibrary(library_docs, category)[0][1],
              false
            )
          )

        })
        
        .catch((error) => {

            console.log(error)
            dispatch(GeneralAction.hasErrored(true))
            
        });
    };

}

export const fetchAllLibraryDocs = () => {

    const url = '/gis';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(url, new Headers(headers)).then((response) => {
  
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
      
            dispatch(GeneralAction.isLoading(false));
      
            return response;
        })
        
        .then((response) => {

           dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_DOCS, library_docs, false));
        
        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

/**
 * Upload files
 * 
 * @param category_id
 * @param data
 * 
 * @returns dispatch
 */
export const uploadFile = (category_id, data, token) => {

    // url
    const url = `categories/` + category_id + `/files?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await upload(dispatch, url, data)

        .then(response => {

            // console.log(response)
            dispatch(GeneralAction.fetchSuccess(LibraryType.UPLOAD_FILE, response, false));

        })

        .catch(error => {

            console.log(error);
            dispatch(GeneralAction.hasErrored(true));

        });

    }

}
