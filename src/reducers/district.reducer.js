import { FETCH_DISTRICT } from '../action_type/index';

const initialState = {
    district: [],
}

export default (state = initialState, action) => {

    switch(action.type){
        case FETCH_DISTRICT:
            return {
                ...state,
                district: action.payload
            }
        default:
            return state;
    }

}
