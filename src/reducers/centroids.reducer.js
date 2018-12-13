import { FETCH_POLYGON_CENTROID } from '../action_type/index';

const initialState = {
    centroids: [],
}

const polygonCentroids = (state = initialState, action) => {

    switch(action.type){
        case FETCH_POLYGON_CENTROID:
            return {
                ...state,
                centroids: action.payload
            }
        default:
            return state;
    }

}

export default polygonCentroids;
