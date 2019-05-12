import { GeneralType } from '../action_type/index';

const initialState = {
    general: null,
}

export default (state = initialState, action) => {
    // console.log(action)
    switch(action.type){
        case GeneralType.REQUEST_IS_LOADING:
            return {
                ...state,
                general: action
            }
        case GeneralType.REQUEST_HAS_ERRORED:
            return {
                ...state,
                general: action
            }
        default:
            return state;
    }

}
