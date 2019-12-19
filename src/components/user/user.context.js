import React, { Component } from 'react';

/** 
 * Create context 
 * 
 * @author Isaac S. Mwakabira
 */
export const UserContext = React.createContext();

/**
 * Context Provider
 * 
 * @author Isaac S. Mwakabira
 */
class UserProvider extends Component {

    constructor() {
        super();
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    render() {

        return (
            <UserContext.Provider value={{
                state: this.state,
                props: this.props
            }}
            >

                {this.props.children}

            </UserContext.Provider>
        );

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

}

export default UserProvider;