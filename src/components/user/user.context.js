import React, { Component } from 'react';
import { UserProfile } from './user.profile';

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
            user: UserProfile.get(),
            isLoggedIn: UserProfile.isAuthenticated(UserProfile.get()),
            isWebsite: false,
            urlMatched: null
        }

        this.handleUrl = this.handleUrl.bind(this);

    }

    /**
     * Handle user navigation, CMS or Website show its custom header
     */
    handleUrl = ({ url }) => {
        
        // if
        if (url !== null&&url !== undefined) {
            Object.assign(this.state, { urlMatched: url })

            const { urlMatched } = this.state;
            if (urlMatched === '/cms') {
                Object.assign(this.state, { isWebsite: false })
            }
            
            if(urlMatched === '/') {
                Object.assign(this.state, { isWebsite: true })
            }
        }

    }

    render() {

        return (
            <UserContext.Provider value={{ 
                state: this.state, 
                next: this.props,
                handleUrl: this.handleUrl
                }}
            >

                {this.props.children}

            </UserContext.Provider>
        );

    }

}

export default UserProvider;