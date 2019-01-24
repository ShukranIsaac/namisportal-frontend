import { GisType, GeneralType } from '../action_type/index';

import * as GeneralAction from './general.action';
import Config from '../config';
import { fetchResponse } from './fetch.service';

/**
 * Fetch region given its name or _id
 * 
 * @param {String} region 
 * @returns {Object} region
 */
export const fetchRegion = (region) => {
    console.log(region);
    
    const url = Config.APIUrl + 'regions/' + region;

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': Config.ACCESS_ALLOW_ORIGIN,
        },
    }
    
    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await fetchResponse(dispatch, url, new Headers(headers))
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGION, response, false))

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

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGIONS, response, false))

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