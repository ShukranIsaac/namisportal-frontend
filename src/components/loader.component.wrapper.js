import React, { Component } from 'react';

/**
 * Show progress loader
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {String} propName 
 * @returns {Component} component
 */
export const ProgressLoader = (propName) => (WrappedComponent) => {
  
    return class ProgressLoader extends Component {

        isEmpty = (prop) => {

            return prop === null || prop === undefined;

        };

        render() {
            
            return this.isEmpty(this.props[propName]) ? <div className="loader" /> : 
                <WrappedComponent { ...this.props } />;
        
        }
        
    }
    
}
