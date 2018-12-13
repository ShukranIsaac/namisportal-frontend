import { GisType } from '../action_type/index';

const initialState = {
    meters: [],
}

const meters = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_ESCOM_METERS:
            return {
                ...state,
                meters: action.payload
            }
        default:
            return state;
    }
}

export default meters;
