import { GisType } from '../action_type/index';

const initialState = {
    power_plants: null,
}

/**
 * Power plants
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const power_plants = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_POWER_PLANTS:
            return {
                ...state,
                power_plants: action.payload
            }
        default:
            return state;
    }
}

export default power_plants;
