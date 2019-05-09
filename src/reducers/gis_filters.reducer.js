import { GisType } from '../action_type/index';

const initialState = {
    gis_filters: [],
    power_plant_filters: null,
}

const gis_filters = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_REGIONS:
            return {
                ...state,
                gis_filters: action.payload,
            }
        
        case GisType.FETCH_POWER_PLANT_FILTERS:
            return {
                ...state,
                power_plant_filters: action.payload
            }
        default:
            return state;
    }
}

export default gis_filters;
