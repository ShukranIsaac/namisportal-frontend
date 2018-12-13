import { LicensingType } from '../action_type/index';

const initialState = {
    filters: [],
}

const filters = (state = initialState, action) => {

    switch(action.type){
        case LicensingType.FETCH_LICENCING_FILTERS:
        console.log(action.payload);
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state;
    }

}

export default filters;
