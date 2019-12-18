
const breadCrumbsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CRUMB':
            return [
                ...state,
                action.payload
            ]

        case 'UPDATE_CRUMB':
            return state.map(crumb => {
                return crumb.id === action.payload.id ? action.payload : crumb
            })

        case 'REMOVE_CRUMB':
            return state.filter(crumb => {
                return crumb.id !== action.payload.id
            })

        default: 
            return state
    }
}

export default breadCrumbsReducer;