import { LibraryType } from '../action_type/index';

import * as GeneralAction from './general.action';

import { get, post, upload } from './api.service';

export const addSubCategory = (id, subcategory) => {
    // resource to post data to
    const url = `/categories/` + id + `/sub-categories`;

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

            .catch(error => {

                console.log(error);
                dispatch(GeneralAction.hasErrored(true))

            })
    }

}

export const fetchLibrary = (id, name, type) => {

    let url = '';
    // type not null
    // then download children
    // else download the main library category
    if (type === 'children') { 
        url += `/categories/${id}/documents`;
    } else {
        url += `/categories?name=${name}`;
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                // type not null
                // then download children
                // else download the main library category
                if (type === 'children') {
                    dispatch(GeneralAction.fetchSuccess(
                        LibraryType.FETCH_LIBRARY_DOCS,
                        response,
                        false
                    ))
                } else {
                    dispatch(GeneralAction.fetchSuccess(
                        LibraryType.FETCH_LIBRARY,
                        // filterDocLibrary(library_docs,category)[0][1],
                        response,
                        false
                    ))
                }

            })

            .catch((error) => {

                console.log(error)
                dispatch(GeneralAction.hasErrored(true))

            });
    };

}

export const fetchAllLibraryDocs = () => {

    const url = `/categories?name=Library`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_DOCS, response, false));

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
