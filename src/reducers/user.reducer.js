import { REQUEST_USER_LOGIN, REQUEST_USER_LOGOUT } from '../action_type/index';

const initialState = {
    user: [],
}

const user = (state = initialState, action) => {

    switch(action.type){
        case REQUEST_USER_LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case REQUEST_USER_LOGOUT:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default user;
