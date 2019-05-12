import { GisType } from '../action_type/index';

const initialState = {
    region: [],
}

const region = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_REGION:
            return {
                ...state,
                errored: action.hasErrored,
                region: action.payload,
            }
        default:
            return state;
    }
}

export default region;
