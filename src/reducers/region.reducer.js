import { FETCH_REGIONS } from '../action_type/index';

const initialState = {
    regions: [],
}

const regions = (state = initialState, action) => {

    switch(action.type){
        case FETCH_REGIONS:
            return {
                ...state,
                regions: action.payload
            }
        default:
            return state;
    }
}

export default regions;
