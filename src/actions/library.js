import { FETCH_LIBRARY } from './types'


const library = [{lo: 'lo'}, {to: 'to'}]

export const fetchLibrary = () => dispatch => {
    let action = {
        type: "FETCH_LIBRARY",
        payload: library
    }

    return dispatch(action)
}