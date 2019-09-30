import { CMSType } from '../action_type/index';

const initialState = {
    stakeholder: null,
    stakeholders_list: null,
    stakeholder_image: null
}

const stakeholder = (state = initialState, action) => {

    switch (action.type) {

        case CMSType.REQUEST_ADD_STAKEHOLDER:
            return {
                ...state,
                stakeholder: action.payload
            }
        case CMSType.REQUEST_A_STAKEHOLDER:

            return {
                ...state,
                stakeholder: action.payload
            }
        case CMSType.REQUEST_LIST_STAKEHOLDER:
            return {
                ...state,
                stakeholders_list: action.payload
            }

        case CMSType.REQUEST_EDIT_STAKEHOLDER:
            return {
                ...state,
                stakeholder: action.payload
            }

        case CMSType.REQUEST_DELETE_STAKEHOLDER:
            return {
                ...state,
                stakeholder: action.payload
            }

        case CMSType.REQUEST_ADD_STAKEHOLDER_IMAGE:
            return {
                ...state,
                stakeholder_image: action.payload
            }

        default:
            return state;
    }

}

export default stakeholder;
