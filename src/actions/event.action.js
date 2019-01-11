import { UserEventType } from "../action_type";

const action = (type, event) => {

    return {
        type: type,
        event: event
    };

}

export const create = () => {

    return action(UserEventType.EVENT_USER_EDIT, 'create');

}

export const edit = () => {

    return action(UserEventType.EVENT_USER_EDIT, 'edit');

}

export const save = () => {

    return action(UserEventType.EVENT_USER_SAVE, 'save');

}

export const initial = () => {

    return action(UserEventType.EVENT_USER_DEFAULT, 'default');

}

export const publish = () => {

    return action(UserEventType.EVENT_USER_PUBLISH, 'publish');

}

export const unpublish = () => {

    return action(UserEventType.EVENT_USER_UNPUBLISH, 'unpublish');

}

export const archive = () => {

    return action(UserEventType.EVENT_USER_ARCHIVE, 'archive');

}

export const remove = () => {

    return action(UserEventType.EVENT_USER_ARCHIVE, 'delete');

}