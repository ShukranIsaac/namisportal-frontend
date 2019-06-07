import { GisType } from '../action_type/index';

const initialState = {
    power_sub_stations: null,
}

const power_sub_stations = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_POWER_SUB_STATIONS:
            return {
                ...state,
                power_sub_stations: action.payload
            }
        default:
            return state;
    }
}

export default power_sub_stations;
