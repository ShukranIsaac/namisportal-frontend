import { combineReducers } from 'redux';

import library from './library.reducer';
import gis from './gis.reducer';
import regions from './region.reducer';
import district from './district.reducer';
import marep_centers from './marep_centers.reducer';
import home from './home.reducer';
import user from './user.reducer';
import polygonCentroids from './centroids.reducer';
import meters from './meters.reducer';
import l_filters from './licencing_filters.reducer';

export default combineReducers({
    user: user,
    home: home,
    library: library,
    gis: gis,
    regions: regions,
    district: district,
    m_centers: marep_centers,
    p_centroids: polygonCentroids,
    l_filters: l_filters
});
