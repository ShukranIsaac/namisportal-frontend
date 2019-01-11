import { UserEventType } from "../action_type";

const initialState = {
    event: 'default',
}

const firedAction = (state, action) => {

    return {
        ...state,
        event: action.event
    }

}

const userEvent = (state = initialState, action) => {
    
    switch(action.type){
        case UserEventType.EVENT_USER_EDIT:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_SAVE:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_PUBLISH:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_UNPUBLISH:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_ARCHIVE:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_DELETE:

            return firedAction(state, action);

        case UserEventType.EVENT_USER_DEFAULT:

            return firedAction(state, action);
            
            
        default:
            return state;
    }

}

export default userEvent;