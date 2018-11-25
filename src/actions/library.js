import { FETCH_LIBRARY } from '../action_type/index';


const library = [{lo: 'lo'}, {to: 'to'}]

export const fetchLibrary = () => dispatch => {

    let action = {
        type: FETCH_LIBRARY,
        payload: library
    }

    return dispatch(action)
}
