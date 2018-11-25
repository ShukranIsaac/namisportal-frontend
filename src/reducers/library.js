import { FETCH_LIBRARY } from '../action_type/index';

const initialState = {
    library: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_LIBRARY:
            console.log('sasdas')

            return {
                ...state,
                library: action.payload
            }
        default:
            console.log('default')
            return state;
    }
}
