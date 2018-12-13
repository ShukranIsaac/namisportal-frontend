import { GisType } from '../action_type/index';

const initialState = {
    district: [],
}

export default (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_DISTRICT:
            return {
                ...state,
                district: action.payload
            }
        default:
            return state;
    }

}
