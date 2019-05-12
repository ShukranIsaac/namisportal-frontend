import React, { Component } from 'react';
import { UserContext } from './user/user.context';

/**
 * Determine which header component is to be shown 
 * depending on the propName given, CMSCustomHeader or AppHeader
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {String} propName
 * @returns {Component} component
 */
export const WhichHeaderComponent = (propName) => (WrappedComponent) => {
  
    return class LoaderHOC extends Component {

        // constructor
        constructor() {
            super();
            this.state = {
                header: ''
            }
        }

        // Make sure the propName is given
        isEmpty = (prop) => {

            return ((prop === null && prop === undefined) || prop === 'cms_custom_header' || prop === 'app_header');

        };

        // render component depending on what propname is given
        // else if empty just return the component 
        render() {
            
            if(this.isEmpty(this.props[propName])) {
                return <WrappedComponent { ...this.props } />;
            }

            return (
                <UserContext.Consumer>
                    {
                        context => {
                            /**
                             * Check which component is being rendered
                             * then change header accordingly
                             */
                            if(propName === 'cms_custom_header') {
                                // this.setState({ header: propName });
                                console.log(propName);
                                console.log(context.state.isWebsite)
                                context.handleComponent({ component: propName });
                                console.log(context.state.isWebsite)
                            }

                            if(propName === 'app_header') {
                                console.log(propName);
                                console.log(context.state.isWebsite)
                                context.handleComponent({ component: propName });
                                console.log(context.state.isWebsite)
                            }

                            return <WrappedComponent { ...this.props } { ...this.state } />
                        }
                    }
                </UserContext.Consumer>
            );
        
        }
    }
}
