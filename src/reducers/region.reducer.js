import { GisType } from '../action_type/index';

const initialState = {
    regions: [],
}

const regions = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_REGIONS:
            return {
                ...state,
                regions: action.payload
            }
        default:
            return state;
    }
}

export default regions;
