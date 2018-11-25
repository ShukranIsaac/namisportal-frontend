import { FETCH_GIS } from '../action_type/index';

const gis = [{

}]

export const fetchLibrary = () => dispatch => {

    let action = {
        type: FETCH_GIS,
        payload: gis
    }

    return dispatch(action)
}
