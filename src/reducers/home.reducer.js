import { REQUECT_HOME_DATA } from '../action_type/index';

const initialState = {
    home: [],
}

const home = (state = initialState, action) => {

    switch(action.type){
        case REQUECT_HOME_DATA:
            return {
                ...state,
                home: action.payload
            }
        default:
            return state;
    }

}

export default home;
