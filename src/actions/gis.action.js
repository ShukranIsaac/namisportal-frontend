import { GisType, GeneralType } from '../action_type/index';

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
    // console.log(url);
    return async (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return await get(dispatch, url)
        
        .then((response) => {
          // console.log(response);
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_MAREP_CENTERS, response, false))

        })
        
        .catch(() => {

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

export const fetchDistributionLines = (district, voltage) => {
  
    // api resource url
    const url = `districts/` + district + `/distribution-lines?voltage=` + voltage;
    // const url = `districts/` + district + `/distribution-lines`;

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

export const fetchTransformers = (district, position) => {

    // resource url
    const url = `districts/` + district + `/transformers?position=` + position;
    // const url = `districts/` + district + `/transformers`;

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

/**
 * Empty props on state change
 * 
 */
export const emptyProps = () => {

  return dispatch => {

    dispatch(GeneralAction.fetchSuccess(GeneralType.REQUEST_CLEAR_PROPS, {}, false))

  }

}

/**
 * Fetch power plants by filter specified
 * 
 * @param {String} capacity 
 * @param {String} plantType 
 */
export const powerPlants = (capacity, plantType) => {

  // url
  let url = `power-plants`;

  if( capacity !== null ) {

    url += `?capacity=` + capacity;

  } else if( plantType !== null) {

    url += `?plantType=` + plantType;

  } else {

  }

  return async dispatch => {

    dispatch(GeneralAction.isLoading(true));

    return await get(dispatch, url)

    .then(response => {
      // console.log(response)
      dispatch(GeneralAction.fetchSuccess(GisType.FETCH_POWER_PLANTS, response, false));

    })

    .catch(error => {

      dispatch(GeneralAction.hasErrored(true));

    });

  } 

}

export const powerPlantsFilters = () => {

  // resource
  const url = `power-plants/haslcvahcialius/filters`;

  return async dispatch => {

    dispatch(GeneralAction.isLoading(true));

    return await get(dispatch, url) 

    .then(response => {

      dispatch(GeneralAction.fetchSuccess(GisType.FETCH_POWER_PLANT_FILTERS, response, false));

    })

    .catch(error => {

      dispatch(GeneralAction.hasErrored(true));

    });

  }

}

export const powerSubStations = (id) => {

  // resource
  const url = `districts/` + id + `/power-sub-stations`;

  return async dispatch => {

    dispatch(GeneralAction.isLoading(true));

    return await get(dispatch, url) 

    .then(response => {

      dispatch(GeneralAction.fetchSuccess(GisType.FETCH_POWER_SUB_STATIONS, response, false));

    })

    .catch(error => {
      console.log(error)
      dispatch(GeneralAction.hasErrored(true));

    });

  }

}