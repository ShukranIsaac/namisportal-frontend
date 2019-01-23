import { GisType, GeneralType } from '../action_type/index';

import * as GeneralAction from './general.action';
import Config from '../config';
import { fetchResponse } from './fetch.service';

let regions = [{name: "Northern Region",districts: [{name: "Chitipa",coord: {}},{name: "Karonga",coord: {}},{name: "Rumphi",coord: {}},{name: "Mzimba",coord: {}},{name: "Nkhatabay",coord: {}},{name: "Likoma",coord: {}},]},{name: "Central Region",districts: [{name: "Lilongwe",coord: {}},{name: "Kasungu",coord: {}},{name: "Dowa",coord: {}},{name: "Mchinji",coord: {}},{name: "Ntchisi",coord: {}},{name: "Dedza",coord: {}},{name: "Ntcheu",coord: {}},{name: "Nkhotakota",coord: {}},{name: "Salima",coord: {}},]},{name: "Southern Region",districts: [{name: "Blantyre",coord: {}},{name: "Chikwawa",coord: {}},{name: "Chiradzulu",coord: {}},{name: "Mulanje",coord: {}},{name: "Mwanza",coord: {}},{name: "Nsanje",coord: {}},{name: "Phalombe",coord: {}},{name: "Thyolo",coord: {}},{name: "Neno",coord: {}},{name: "Balaka",coord: {}},{name: "Machinga",coord: {}},{name: "Mangochi",coord: {}},{name: "Zomba",coord: {}}]},];

export const fetchRegion = (region) => {

    const {coordinates} = require('../assets/gis/regions/'+ region +'.json');

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        })
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGION, coordinates, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}

export const fetchDistrict = (district) => {

    const url = Config.APIUrl + 'districts?name=' + district;

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {
          
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRICT, response, false))

        })
        
        .catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchGisFilters = () => {

    const url = Config.APIUrl + 'regions';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        }
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGIONS, regions, false))

        })
        
        .catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });

    };
}

export const fetchMarepCenters = (name) => {

    const url = Config.APIUrl + 'districts/' + name + '/marep-centers';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }
    
    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {
          
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_MAREP_CENTERS, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchEscomMeters = (name) => {

    const url = Config.APIUrl + 'districts/' + name + '/meters';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, headers)

        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_ESCOM_METERS, [], false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}

export const fetchDistributionLines = (district) => {

    const url = Config.APIUrl + 'districts/' + district + '/distribution-lines';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, headers)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRIBUTION_LINES, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchTransformers = (name) => {

    // url api
    const url = Config.APIUrl;

    // headers
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
      },
    }

    return async dispatch => {

      dispatch(GeneralType.isLoading(true))

      return await fetchResponse(dispatch, url, headers)

      .then((response) => {

        dispatch(GeneralAction.fetchSuccess(GisType.FETCH_TRANSFORMERS, response, false))

      })

      .catch(() => {

        dispatch(GeneralAction.hasErrored(true))

      });

    }

}