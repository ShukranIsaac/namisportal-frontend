import { LibraryType } from '../action_type/index';

const initialState = {
    library: []
}

export default (state = initialState, action) => {

    switch(action.type){
        case LibraryType.FETCH_LIBRARY:
            return {
                ...state,
                library: action.payload
            }
        default:
            return state;
    }

}
