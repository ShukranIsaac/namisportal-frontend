import { GisType, GeneralType } from '../action_type/index';

const initialState = {
    lines: null,
}

const distributionlines = (state = initialState, action) => {

    switch(action.type){
        case GisType.FETCH_DISTRIBUTION_LINES:
            return {
                ...state,
                lines: action.payload
            }
        case GeneralType.REQUEST_CLEAR_PROPS:
            return {
                ...state,
                lines: null
            }
        default:
            return state;
    }

}

export default distributionlines;
