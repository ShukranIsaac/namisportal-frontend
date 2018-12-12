import { FETCH_LIBRARY } from '../action_type/index';

import { isLoading, hasErrored, fetchSuccess } from './general.actions';

import library_docs from '../components/library/library_docs';

const filterDocLibrary = (docs, name) => {

    return (Object.entries(docs).filter((o) => {

        if (o[0] === name) {
          return o;
        }

        return;
    }));

}

export const fetchLibrary = (category) => {

    return (dispatch) => {

        dispatch(isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));

            return response;
        }).then((response) => {
          dispatch(
            fetchSuccess(
            FETCH_LIBRARY,
            filterDocLibrary(library_docs, category)[0][1],
            false)
          )
        }).catch(() => dispatch(hasErrored(true)));
    };

}
