import { GeneralType } from '../action_type/index';

export const hasErrored = (bool) => {

    return {
      type: GeneralType.REQUEST_HAS_ERRORED,
      hasErrored: bool
    }

};

export const isLoading = (bool) => {
    return {
        type: GeneralType.REQUEST_IS_LOADING,
        isLoading: bool
    };
}

export const updateSuccess = (payload, bool) => {
    return {
      type: GeneralType.REQUEST_UPDATE_SUCCESS,
      hasErrored: bool,
      payload: payload
    };
};

export const createSuccess = (payload, bool) => {
    return {
        type: GeneralType.REQUEST_CREATE_SUCCESS,
        hasErrored: bool,
        payload: payload
    };
}

export const deleteSuccess = (payload, bool) => {
    return {
        type: GeneralType.REQUEST_DELETE_SUCCESS,
        hasErrored: bool,
        payload: payload
    };
}

export const fetchSuccess = (type, payload, bool) => {

    return {
        type: type,
        hasErrored: bool,
        payload: payload
    };

}