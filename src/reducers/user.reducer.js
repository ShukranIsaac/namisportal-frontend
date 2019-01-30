import { UserType } from '../action_type/index';

const initialState = {
    user: null,
}

const user = (state = initialState, action) => {

    switch(action.type){
        case UserType.REQUEST_USER_LOGIN:
        
            return {
                ...state,
                user: action.payload
            }

        case UserType.REQUEST_USER_LOGOUT:
        
            return {
                ...state,
                user: action.payload
            }

        case UserType.REQUEST_USER_REGISTER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export default user;
