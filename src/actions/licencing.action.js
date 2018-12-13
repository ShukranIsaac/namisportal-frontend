import { LicensingType } from '../action_type/index';

import * as GeneralAction from './general.action';

const profile_filters = [
  {
    name: 'Capacity',
    options: [
      { option: "Up to 1 MW" },
      { option: "1 to 10 MW" },
      { option:"No generation" }
    ]
  },
  {
    name: 'Technology',
    options: [
      { option: "Solar" },
      { option: "Wind"},
      { option: "Hydro" },
      { option: "Biomass" }
    ]
  },
  {
    name: 'Hybrid',
    options: [
      { option: "Yes" } ,
      { option: "No" }
    ]
  },
  {
    name: 'Wholesale Selling',
    options: [
      { option: "DNO (With SPPA)" },
      { option: "DNO (Without SPPA)" },
      { option: "N/A (Retail Only)" },
      { option: "N/A (Own Use)" }
    ],
  },
  {
    name: 'Retail Selling',
    options: [
      { option: "Customers in own grid" },
      { option: " Customers in other DNO grid" },
      { option: "Customers in own grid and in other DNO grid" },
      { option: "N/A (No Retail Customers)" }
    ],
  },
  {
    name: 'Own Mini Grid',
    options: [
      { option: "Up to 1 MW" },
      { option: "1 to 10 MW" }
    ]
  }
];

export const fetchLicencingFilters = () => {

    return (dispatch) => {

        dispatch(GeneralAction.isLoading(true));

        return fetch(`/gis`).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(GeneralAction.isLoading(false));

            return response;
        }).then((response) => {

          dispatch(GeneralAction.fetchSuccess(LicensingType.FETCH_LICENCING_FILTERS, profile_filters, false))

        }).catch(() => dispatch(GeneralAction.hasErrored(true)));
    };
}
