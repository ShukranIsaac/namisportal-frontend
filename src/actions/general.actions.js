import {
  REQUEST_HAS_ERRORED,
  REQUEST_IS_LOADING,
  REQUEST_FETCH_SUCCESS,
  REQUEST_UPDATE_SUCCESS,
  REQUEST_DELETE_SUCCESS,
  REQUEST_CREATE_SUCCESS } from '../action_type/index';

export const hasErrored = (bool) => ({
    type: REQUEST_HAS_ERRORED,
    hasErrored: bool
});

export const isLoading = (bool) => {
    return {
        type: REQUEST_IS_LOADING,
        isLoading: bool
    };
}

export const updateSuccess = (payload, bool) => {
    return {
      type: REQUEST_UPDATE_SUCCESS,
      hasErrored: bool,
      payload: payload
    };
};

export const createSuccess = (payload, bool) => {
    return {
        type: REQUEST_CREATE_SUCCESS,
        hasErrored: bool,
        payload: payload
    };
}

export const deleteSuccess = (payload, bool) => {
    return {
        type: REQUEST_DELETE_SUCCESS,
        hasErrored: bool,
        payload: payload
    };
}

export const fetchSuccess = (payload, bool) => {
    return {
        type: REQUEST_FETCH_SUCCESS,
        hasErrored: bool,
        payload: payload
    };
}
