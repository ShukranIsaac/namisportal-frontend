import { HomeType } from '../action_type/index';

const initialState = {
    home: [],
}

const home = (state = initialState, action) => {

    switch(action.type){
        case HomeType.REQUEST_HOME_DATA:
            return {
                ...state,
                home: action.payload
            }
        case HomeType.REQUEST_ADD_HOME_SUB_CATE:
            return {
                ...state,
                home: action.payload
            }
        case HomeType.REQUEST_EDIT_HOME_SUB_CATE:
            return {
                ...state,
                home: action.payload
            }
        default:
            return state;
    }

}

export default home;
