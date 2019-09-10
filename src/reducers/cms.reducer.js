import { CMSType, GisType } from '../action_type/index';

const initialState = {
    subcategory: null,
    maincategory: null,
    question: null,
    actionType: null,
    features: null,
    feature: null
}

const cms = (state = initialState, action) => {

    switch(action.type){
        case CMSType.REQUEST_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_FA_QUESTION:
            return {
                ...state,
                question: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_ADD_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_EDIT_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_DELETE_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_ADD_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                actionType: action.type
            }
        case CMSType.REQUEST_CATEGORY:
            return {
                ...state,
                maincategory: action.payload,
                actionType: action.type
            }
        case GisType.FETCH_GIS_FEATURES:
            return {
                ...state,
                features: action.payload,
                actionType: action.type
            }
        case GisType.CREATE_NEW_GIS_FEATURE:
            return {
                ...state,
                feature: action.payload,
                actionType: action.type
            }
        default:
            return state;
    }

}

export default cms;
