import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Directs the user to the right route depending 
 * on the params if any provided
 * 
 * Checks if the user is logged in, if yes show cms landing page else.
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Object} user
 * @param {String} url
 * @returns route
 */
export const redirect = (() => {

    const to = ({ url, from }) => {
        
        // redirect to  this url 
        return <Redirect to={{ pathname: url, state: { referer: from } }} />;
        
    };

    return {
        to
    }

})();
