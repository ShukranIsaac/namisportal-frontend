import { NewsType } from '../action_type/index';

const initialState = {
    articles: [],
    article: null
}

const news = (state = initialState, action) => {

    switch(action.type){
        case NewsType.REQUEST_ALL_ARTICLES:
            return {
                ...state,
                errored: action.hasErrored,
                articles: action.payload,
            }

        case NewsType.REQUEST_CREATE_ARTICLE:
            return {
                ...state,
                errored: action.hasErrored,
                article: action.payload,
            }

        default:
            return state;
    }
}

export default news;
