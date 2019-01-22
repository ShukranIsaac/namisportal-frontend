import { GisType } from '../action_type/index';

import * as GeneralAction from './general.action';
import Config from '../config';

let regions = [
  {
    name: "Northern Region",
    districts: [
      {
        name: "Chitipa",
        coord: {}
      },
      {
        name: "Karonga",
        coord: {}
      },
      {
        name: "Rumphi",
        coord: {}
      },
      {
        name: "Mzimba",
        coord: {}
      },
      {
        name: "Nkhatabay",
        coord: {}
      },
      {
        name: "Likoma",
        coord: {}
      },
    ]
  },
  {
    name: "Central Region",
    districts: [
      {
        name: "Lilongwe",
        coord: {}
      },
      {
        name: "Kasungu",
        coord: {}
      },
      {
        name: "Dowa",
        coord: {}
      },
      {
        name: "Mchinji",
        coord: {}
      },
      {
        name: "Ntchisi",
        coord: {}
      },
      {
        name: "Dedza",
        coord: {}
      },
      {
        name: "Ntcheu",
        coord: {}
      },
      {
        name: "Nkhotakota",
        coord: {}
      },
      {
        name: "Salima",
        coord: {}
      },
    ]
  },
  {
    name: "Southern Region",
    districts: [
      {
        name: "Blantyre",
        coord: {}
      },
      {
        name: "Chikwawa",
        coord: {}
      },
      {
        name: "Chiradzulu",
        coord: {}
      },
      {
        name: "Mulanje",
        coord: {}
      },
      {
        name: "Mwanza",
        coord: {}
      },
      {
        name: "Nsanje",
        coord: {}
      },
      {
        name: "Phalombe",
        coord: {}
      },
      {
        name: "Thyolo",
        coord: {}
      },
      {
        name: "Neno",
        coord: {}
      },
      {
        name: "Balaka",
        coord: {}
      },
      {
        name: "Machinga",
        coord: {}
      },
      {
        name: "Mangochi",
        coord: {}
      },
      {
        name: "Zomba",
        coord: {}
      }
    ]
  },
];

export const fetchRegion = (region) => {

    const {coordinates} = require('../assets/gis/regions/'+ region +'.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGION, coordinates, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchDistrict = (district) => {

    // const {coordinates} = require('../assets/gis/polygons/'+ district +'.json');

    const url = Config.APIUrl + 'districts?name=' + district;

    const controller = new AbortController();

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        signal: controller.signal,
    }

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(url, new Headers(headers)).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));
            
            return response.json();
        })
        
        .then((data) => {

          return dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRICT, data, false))

        })
        
        .catch(() => {
          
          return dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchGisFilters = () => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_REGIONS, regions, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };
}

export const fetchMarepCenters = (name) => {

    // const coordinates = require('../assets/gis/marep-centers/'+ name +'.json');

    const url = Config.APIUrl + 'districts/' + name + '/marep-centers';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
    }
    
    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        fetch(url, new Headers(headers)).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.json();
        }).then((response) => {
          
          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_MAREP_CENTERS, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}

export const fetchEscomMeters = (name) => {

    const points = require('../assets/gis/meters/'+ name +'.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_ESCOM_METERS, points, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchDistributionLines = (district) => {

    // const {lines} = require('../assets/gis/distribution-lines/'+ district +'.json');

    const url = Config.APIUrl + 'districts/' + district + '/distribution-lines';

    const headers = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
    }

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(url, new Headers(headers)).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response.json();
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRIBUTION_LINES, response, false))

        }).catch(() => {

          dispatch(GeneralAction.hasErrored(true))

        });
    };

}
