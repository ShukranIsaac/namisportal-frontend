/**
 * User profile, object to hold user credentials upon login and register
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} user
 */
export const UserProfile = (() => {
    
    const firstname, lastname, email, username, password, roles, token;

    const getFirstname = () => {
        return firstname;
    }

    const setFirstname = (firstname) => {
        firstname = firstname;
    }

    const getLastname = () => {
        return lastname;
    }

    const setLastname = (lastname) => {
        lastname = lastname;
    }

    
    const getUsername = () => {
        return username;
    }

    const setUsername = (username) => {
        username = username;
    }

    
    const getEmail = () => {
        return email;
    }

    const setEmail = (email) => {
        email = email;
    }

    
    const getPassword = () => {
        return password;
    }

    const setPassword = (password) => {
        password = password;
    }

    const getUserRoles = () => {
        return roles;
    }

    const setUserRoles = (roles) => {
        roles = roles;
    }

    const getToken = () => {
        return token;
    }

    const setToken = (token) => {
        token = token;
    }

    return {
        getFirstname,
        setFirstname,
        getLastname,
        setLastname,
        getEmail,
        setEmail,
        getUsername,
        setUsername,
        getPassword,
        setPassword,
        getUserRoles,
        setUserRoles,
        getToken,
        setToken
    }
})();