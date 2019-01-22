import { LibraryType } from '../action_type/index';

import * as GeneralAction from './general.action';

import library_docs from '../components/library/library_docs';

const filterDocLibrary = (docs, name) => {

    return (Object.entries(docs).filter((o) => {

        if (o[0] === name) {
          return o;
        }

        return o;
    }));

}

export const fetchLibrary = (category) => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {
          dispatch(
            GeneralAction.fetchSuccess(
              LibraryType.FETCH_LIBRARY,
              filterDocLibrary(library_docs, category)[0][1],
              false
            )
          )
        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchAllLibraryDocs = () => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {
           dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_DOCS, library_docs, false));
        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}
