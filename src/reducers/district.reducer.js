import { GisType, GeneralType } from '../action_type/index';

const initialState = {
    district: [],
}

const district = (state = initialState, action) => {
    
    switch(action.type){
        case GisType.FETCH_DISTRICT:
            return {
                ...state,
                district: action.payload
            }
        case GeneralType.REQUEST_CLEAR_PROPS:
            return {
                ...state,
                district: action.payload
            }
        default:
            return state;
    }

}

export default district;
