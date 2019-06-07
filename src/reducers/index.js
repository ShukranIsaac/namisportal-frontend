import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import library from './library.reducer';
import gis_filters from './gis_filters.reducer';
import region from './region.reducer';
import district from './district.reducer';
import marep_centers from './marep_centers.reducer';
import home from './home.reducer';
import user from './user.reducer';
import polygonCentroids from './centroids.reducer';
import meters from './meters.reducer';
import l_filters from './licencing_filters.reducer';
import distributionlines from './distribution.reducer';
import userEvent from './event.reducer';
import transformers from './transformers.reducer';
import cms from './cms.reducer';
import stakeholder from './stakeholder.reducer';
import power_plants from './power_plant.reducer';
import generalReducer from './general.reducer';
import news from './news.reducer';
import power_sub_stations from './power_sub_stations.reducer';

export default combineReducers({
    form: formReducer,
    general: generalReducer,
    user: user,
    home: home,
    library: library,
    gis_filters: gis_filters,
    region: region,
    district: district,
    m_centers: marep_centers,
    centroids: polygonCentroids,
    meters: meters,
    l_filters: l_filters,
    lines: distributionlines,
    event: userEvent,
    transformers: transformers,
    cms: cms,
    stakeholder: stakeholder,
    power_plants: power_plants,
    news: news,
    power_sub_stations: power_sub_stations,
});
