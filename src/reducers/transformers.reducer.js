import { GisType } from '../action_type/index';

const initialState = {
    transformers: [],
}

const transformers = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_TRANSFORMERS:
            return {
                ...state,
                transformers: action.payload
            }
        default:
            return state;
    }
}

export default transformers;
