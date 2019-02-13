import { CMSType } from '../action_type/index';

const initialState = {
    subcategory: {},
    stakeholder: null,
    stakeholders_list: null
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
        case CMSType.REQUEST_ADD_STAKEHOLDER:
            return {
                ...state,
                stakeholder: action.payload
            }
        case CMSType.REQUEST_LIST_STAKEHOLDER:
            return {
                ...state,
                stakeholders_list: action.payload
            }
        default:
            return state;
    }

}

export default cms;
