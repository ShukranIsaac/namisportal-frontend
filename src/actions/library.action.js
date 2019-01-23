import { LibraryType } from '../action_type/index';

import * as GeneralAction from './general.action';

import library_docs from '../components/library/library_docs';
import Config from '../config';
import { fetchResponse } from './fetch.service';

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

export const fetchLibrary = (category) => {

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

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {

          dispatch(
            GeneralAction.fetchSuccess(
              LibraryType.FETCH_LIBRARY,
              filterDocLibrary(library_docs, category)[0][1],
              false
            )
          )

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));
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

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {

           dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_DOCS, library_docs, false));
        
        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}
