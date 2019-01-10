import React, { Component } from 'react';

/** 
 *  Create context 
 */
export const UserContext = React.createContext();

/**
 * ContextAPI
 * 
 * Provider
 */
class UserProvider extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
        }

    }

    render() {

        return (
            <UserContext.Provider value={{ state: this.state, next: this.props }}>

                {this.props.children}

            </UserContext.Provider>
        );

    }

}

export default UserProvider;