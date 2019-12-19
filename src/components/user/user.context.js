import React, { Component } from 'react';
import UserProfile from './user.profile';

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

        this.state = {
            user: UserProfile.get(),
            isLoggedIn: UserProfile.isAuthenticated(UserProfile.get()),
            isWebsite: true,
        }

        this.handleComponent = this.handleComponent.bind(this);

    }

    /**
     * Handle user navigation, CMS or Website show its custom header
     */
    handleComponent = ({ component }) => {
        // console.log(component);
        if (component !== null&&component !== undefined) {

            if (component === 'cms_custom_header') {
                Object.assign(this.state, { isWebsite: false })
            }
            
            if(component === 'app_header') {
                Object.assign(this.state, { isWebsite: true })
            }
        }

    }

    render() {

        return (
            <UserContext.Provider value={{ 
                state: this.state, 
                next: this.props,
                handleComponent: this.handleComponent
                }}
            >

                {this.props.children}

            </UserContext.Provider>
        );

    }

}

export default UserProvider;