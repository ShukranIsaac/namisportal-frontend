import { FETCH_LIBRARY } from '../actions/types'

const initialState = {
    library: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_LIBRARY':
        console.log(action)
        console.log(FETCH_LIBRARY)
            return {
                ...state,
                library: action.payload
            }
        default:
            return state;
    }
}