import React from 'react';

/**
 * User profile, object to hold user credentials upon login and register
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} user
 */
export const UserProfile = (() => {
    
    const firstname, lastname, email, username, password, roles;

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

    return {
        getFirstname: getFirstname,
        setFirstname: setFirstname,
        getLastname: getLastname,
        setLastname: setLastname,
        getEmail: getEmail,
        setEmail: setEmail,
        getUsername: getUsername,
        setUsername: setUsername,
        getPassword: getPassword,
        setPassword: setPassword,
        getUserRoles: getUserRoles,
        setUserRoles: setUserRoles,
    }
})();