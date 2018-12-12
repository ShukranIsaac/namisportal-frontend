import { FETCH_GIS } from '../action_type/index';

const initialState = {
    gis: [],
}

const gis = (state = initialState, action) => {

    switch(action.type){
        case FETCH_GIS:
            return {
                ...state,
                gis: [...state.gis, action.payload]
            }
        default:
            return state;
    }
}

export default gis;
