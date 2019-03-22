import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';

/**
 * Directs the user to the right route depending 
 * on the params if any provided
 * 
 * Checks if the user is logged in, if yes show cms landing page else.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const redirect = (() => {

    /**
     * Redirect user within the application
     * 
     * @param {String} url 
     * @param {String} from 
     */
    const to = ({ url, from }) => {
        
        // redirect to  this url 
        return <Redirect to={{ pathname: url, state: from }} />;
        
    };

    /**
     * Redirect user to the external link clicked
     * 
     * @param {String} url 
     */
    const toExternalLink = ({ url, event }) => {

        // redirect to external link
        event.preventDefault()
        return window.open(url);

    }

    return {
        to, toExternalLink
    }

})();



/**
 * Directs the user to the right route depending 
 * on the params and state provided if any
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const to = ((url) => {

    const With = ({ state }) => {

        return <NavLink to={{ pathname: url, state: state }} />

    }

    return {
        With
    }

})();