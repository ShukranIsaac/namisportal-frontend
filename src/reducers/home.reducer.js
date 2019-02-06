import { GeneralType } from '../action_type/index';

const initialState = {
    home: [],
}

const home = (state = initialState, action) => {

    switch(action.type){
        case GeneralType.REQUECT_HOME_DATA:
            return {
                ...state,
                home: action.payload
            }
        default:
            return state;
    }

}

export default home;
