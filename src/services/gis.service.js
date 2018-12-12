import Axions from 'axios';

import Config from '../config';

const getRegions = () => {

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${Config.APIUrl}/gis`, options).then(handleResponse);
}

const handleResponse = (response) => {

    return response.text().then(resp => {

        const data = resp && JSON.parse(resp);

        if (!response.ok) {

            const error = (data && data.message) || response.statusText;

            return Promise.reject(error);

        }

        return data;
    });

}

export const GISService = {
    getRegions,
};
