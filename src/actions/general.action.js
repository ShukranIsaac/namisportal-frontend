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

export const updateSuccess = (type, payload, bool) => {
    return {
      type: type,
      hasErrored: bool,
      payload: payload
    };
};

export const createSuccess = (type, payload, bool) => {
    return {
        type: type,
        hasErrored: bool,
        payload: payload
    };
}

export const deleteSuccess = (type, payload, bool) => {
    return {
        type: type,
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
