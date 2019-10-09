import { LibraryType } from '../action_type/index';

import * as GeneralAction from './general.action';

import { get, post, upload, update, _delete } from './api.service';
import { initial } from './event.action';
import Toast from '../toastfy';

export const addSubCategory = (id, subcategory) => {
    // resource to post data to
    const url = `/categories/${id}/sub-categories`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await post(dispatch, url, subcategory)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `New document successfully created.`
                })

                dispatch(GeneralAction.fetchSuccess(LibraryType.ADD_NEW_SUB_CATEGORY_DOCS, response, false))

                dispatch(initial())
            })

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to create new sub-category. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            })
    }

}

export const fetchLibraryCategory = (category) => {

    const url = `/categories?name=${category}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then(response => {

                dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY, response, false))

            })

            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Error. Please try again. ${error}`
                })

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
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Errored. Please try again. ${error}`
                })

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

            .catch((error) => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download documents. Please try to refresh. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            });
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
    const url = `categories/${category_id}/files?token=` + token;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await upload(dispatch, url, data)

            .then(response => {

                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `New document successfully uploaded.`
                })

                // console.log(response)
                dispatch(GeneralAction.fetchSuccess(LibraryType.UPLOAD_FILE, response, false));

                // then change state to default
                // so that the page redirects and list all
                dispatch(initial())

            })

            .catch(error => {

                console.log(error);
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to  create new document. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true));

            });

    }

}

/**
 * Archive a single category documents
 * 
 * @param id
 */
export const fetchCategoryDocuments = (id) => {

    const url = `categories/${id}/documents`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(LibraryType.REQUEST_SUB_CATE_DOCS, response, false))

            })

            .catch((error) => {

                console.log(error)
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download documents. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

/**
 * Archive a single category documents
 * 
 * @param id
 */
export const fetchFileDocument = (id) => {

    const url = `files/${id}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_FILE, response, false))

            })

            .catch((error) => {

                console.log(error)
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to download document. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}

export const editDocument = (payload, token, document) => {

    // url
    const url = `files/${document._id}?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await update(dispatch, url, payload)

            .then(response => {

                Toast.emit({
                    type: Toast.TYPES.SUCCESS,
                    message: `(${ response.name }) - File successfully updated.`
                })

                dispatch(GeneralAction.fetchSuccess(LibraryType.UPDATE_LIBRARY_FILE, response, false))

                dispatch(initial())

            })

            .catch(error => {

                console.log(error)
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to update file. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))
            })
    }
}

/**
 * Archive a single category documents
 * 
 * @param id
 */
export const archiveFileDocument = (category, document, token) => {

    // const url = `files/${id}?token=${token}`;
    const url = `categories/${category._id}/documents/${document._id}?token=${token}`;

    return async dispatch => {

        dispatch(GeneralAction.isLoading(true));

        return await _delete(dispatch, url)

            .then((response) => {

                dispatch(GeneralAction.fetchSuccess(LibraryType.FETCH_LIBRARY_FILE, response, false))

                dispatch(initial())
                
            })

            .catch((error) => {

                console.log(error)
                // toast message for user feedback
                Toast.emit({
                    type: Toast.TYPES.ERROR,
                    message: `Failed to delete document. Please try again. ${error}`
                })

                dispatch(GeneralAction.hasErrored(true))

            });

    };

}