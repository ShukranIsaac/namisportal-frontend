import { combineReducers } from 'redux'
import library from './library'
import gis from './gis'

export default combineReducers({
    library: library,
    gis: gis
})
