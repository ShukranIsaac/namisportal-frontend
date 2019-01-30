import { GisType } from '../action_type/index';

import * as GeneralAction from './general.action';
import { get } from './api.service';

/**
 * Fetch region given its name or _id
 * 
 * @param {String} region 
 * @returns {Object} region
 */
export const fetchRegion = (region) => {
    // region resource api url
    const url = `regions/` + region;
    
    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGION, response, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}

export const fetchDistrict = (district) => {
    // api disrict resource url
    const url = `districts?name=` + district;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {
          
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRICT, response, false))

        })
        
        .catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchGisFilters = () => {
    // api resource url
    const url = `regions`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGIONS, response, false))

        })
        
        .catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });

    };
}

export const fetchMarepCenters = (district_id) => {
    // api resource url
    const url = `districts/` + district_id + `/marep-centers`;
    
    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {
          
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_MAREP_CENTERS, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchEscomMeters = (name) => {
    // api resource url
    const url = `districts/` + name + `/meters`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)

        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_ESCOM_METERS, response, false))

        })
        
        .catch(() => dispatch(GeneralAction.hasErrored(true)));

    };

}

export const fetchDistributionLines = (district) => {
  
    // api resource url
    const url = `districts/` + district + `/distribution-lines`;

    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRIBUTION_LINES, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchTransformers = (district) => {

    // resource url
    const url = `districts/` + district + `/transformers`;

    return async dispatch => {

      dispatch(GeneralAction.isLoading(true))

      return await get(dispatch, url)

      .then((response) => {

        dispatch(GeneralAction.fetchSuccess(GisType.FETCH_TRANSFORMERS, response, false))

      })

      .catch(() => {

        dispatch(GeneralAction.hasErrored(true))

      });

    }

}