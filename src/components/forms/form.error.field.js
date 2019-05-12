import React from 'react';

/**
 * Useful for displaying validation errors
 * @author Isaac S. Mwakabira
 * 
 * @param {Object} props
 * @returns {Tag} span
 */
export const ErrorField = ({ touched, error}) => {

    return touched && error ? <span className="error">{error}</span> : <span></span>

}