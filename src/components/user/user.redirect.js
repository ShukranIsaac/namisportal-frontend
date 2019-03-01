import React from 'react';
import { Redirect, Link } from 'react-router-dom';

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
        return <Redirect to={{ pathname: url, state: { referer: from } }} />;
        
    };

    /**
     * Redirect user to the external link clicked
     * 
     * @param {String} url 
     */
    const toExternalLink = ({ url }) => {

        // redirect to external link
        return (
            <Link 
                to={ url } 
                target="_blank" 
                onClick={ event => {
                        event.preventDefault(); 
                        window.open(url);
                    }
                } 
            />
        );

    }

    return {
        to, toExternalLink
    }

})();
