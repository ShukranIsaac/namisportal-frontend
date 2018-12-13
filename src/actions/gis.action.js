import { GisType } from '../action_type/index';

import * as GeneralAction from './general.action';

import Config from '../config';

let regions = [
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

    const {coordinates} = require('../assets/gis/polygons/'+ district +'.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_DISTRICT, coordinates, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchRegions = () => {

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

    const {coordinates} = require('../assets/gis/polygons/'+ name +'.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_MAREP_CENTERS, coordinates, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchEscomMeters = (name) => {

    const {coordinates} = require('../assets/gis/meters/'+ name +'.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_ESCOM_METERS, coordinates, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}

export const fetchPolygonCentroids = () => {

    const d_centers = require('../assets/gis/d-centroids/d_centroids.json');

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/centroids`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(GisType.FETCH_POLYGON_CENTROID, d_centers, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };

}
