import { LibraryType } from '../action_type/index';

const initialState = {
    library: null,
    document: null,
    library_documents: null,
    loaded: 0
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case LibraryType.FETCH_LIBRARY:

            return {
                ...state,
                library: action.payload
            }

        case LibraryType.FETCH_LIBRARY_DOCS:

            return {
                ...state,
                library_documents: action.payload
            }

        case LibraryType.ADD_NEW_SUB_CATEGORY_DOCS:

            return {
                ...state,
                library: action.payload
            }

        case LibraryType.UPLOAD_FILE:

            return {
                ...state,
                document: action.payload
            }

        case LibraryType.REQUEST_IS_UPLOADING:

            return {
                ...state,
                loaded: action.loaded
            }

        default:
            return state;
    }

}
