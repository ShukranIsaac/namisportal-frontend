import { GisType } from '../action_type/index';

const initialState = {
    coordinates: [],
}

const marep_centers = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_MAREP_CENTERS:
            return {
                ...state,
                coordinates: action.payload
            }
        default:
            return state;
    }

}

export default marep_centers;
