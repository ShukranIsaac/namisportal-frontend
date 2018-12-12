import { combineReducers } from 'redux';

import library from './library.reducer';
import gis from './gis.reducer';
import regions from './region.reducer';
import district from './district.reducer';
import marep_centers from './marep_centers.reducer';

export default combineReducers({
    library: library,
    gis: gis,
    regions: regions,
    district: district,
    m_centers: marep_centers,
})
