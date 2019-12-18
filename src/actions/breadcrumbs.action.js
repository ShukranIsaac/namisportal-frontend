
export const addBreadcrumb = (id, data) => {

    return async dispatch => {
        dispatch({
            type: "ADD_CRUMB",
            payload: { id, ...data }
        })
    };

}

export const removeBreadcrumb = (id, data) => {

    return async dispatch => {
        dispatch({
            type: "REMOVE_CRUMB",
            payload: { id, ...data }
        })
    };

}

export const updateBreadcrumb = (id, data) => {

    return async dispatch => {
        dispatch({
            type: "UPDATE_CRUMB",
            payload: { id, ...data }
        })
    };

}