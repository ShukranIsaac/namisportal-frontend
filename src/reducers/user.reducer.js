import { UserType } from '../action_type/index';

const initialState = {
    user: null,
    contact_us: null,
    contact: null,
    users: null
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

        case UserType.REQUEST_USER_CONTACT_US:
            return {
                ...state,
                contact_us: action.payload
            }

        case UserType.REQUEST_USER_CONTACT:
            return {
                ...state,
                contact: action.payload
            }

        case UserType.REQUEST_USER_ALL:
            return {
                ...state,
                users: action.payload
            }

        case UserType.REQUEST_USER_SINGLE:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export default user;
