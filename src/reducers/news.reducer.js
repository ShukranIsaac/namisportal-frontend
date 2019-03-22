import { NewsType } from '../action_type/index';

const initialState = {
    articles: [],
}

const news = (state = initialState, action) => {

    switch(action.type){
        case NewsType.REQUEST_ALL_ARTICLES:
            return {
                ...state,
                errored: action.hasErrored,
                articles: action.payload,
            }
        default:
            return state;
    }
}

export default news;
