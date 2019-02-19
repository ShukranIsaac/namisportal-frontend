import { CMSType } from '../action_type/index';

const initialState = {
    subcategory: null,
}

const cms = (state = initialState, action) => {

    switch(action.type){
        case CMSType.REQUEST_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload
            }
        case CMSType.REQUEST_ADD_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload
            }
        case CMSType.REQUEST_EDIT_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload
            }
        case CMSType.REQUEST_DELETE_SUB_CATE:
            return {
                ...state,
                subcategory: action.payload
            }
        case CMSType.REQUEST_ADD_CATEGORY:
            return {
                ...state,
                subcategory: action.payload
            }
        case CMSType.REQUEST_CATEGORY:
            return {
                ...state,
                subcategory: action.payload
            }
        default:
            return state;
    }

}

export default cms;
