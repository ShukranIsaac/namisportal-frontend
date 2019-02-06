import React, { Component } from 'react';

/**
 * Show progress loader
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {*} propName 
 * @returns {Component} component
 */
const ComponentLoaderWrapper = (propName) => (WrappedComponent) => {
  
    return class LoaderHOC extends Component {

        isEmpty = (prop) => {

            return (
                prop === null ||
                prop === undefined ||
                (prop.hasOwnProperty('length') && prop.length === 0) ||
                (prop.constructor === Object.keys(prop).length === 0)
            );

        };

        render() {

            return (this.isEmpty(this.props[propName]) ? 
                <div className="loader"></div> : 
                <WrappedComponent { ...this.props } />);
        
        }
    }
}

export default ComponentLoaderWrapper;
