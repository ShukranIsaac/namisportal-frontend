/**
 * User profile, object to hold user credentials upon login and register
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} user
 */
export const UserProfile = (() => {

    /**
     * Save user details to the local store/persist
     * 
     * @param {Object} user 
     */
    const save = (user) => {
        // save user to local storage
        let loggedIn = null;
        // copy user into user object and add to it time(seconds) when they logged in
        const u = Object.assign(user, { _l_time: ((Date.now() / 1000) / 60) });

        try {

            localStorage.setItem('cms_current_user', JSON.stringify(u));

        } catch (error) {

            return error;

        }

        try {

            loggedIn = localStorage.getItem('cms_current_user');
            if (JSON.parse(loggedIn).token !== null) {

                return JSON.parse(loggedIn);

            } else {

                return null;

            }

        } catch (error) {

            return error;

        }

    };

    // loggedin user
    const get = () => {

        try {

            const loggedIn = localStorage.getItem('cms_current_user');
            if (JSON.parse(loggedIn) !== null && JSON.parse(loggedIn).token !== undefined) {

                return JSON.parse(loggedIn);

            } else {

                return null;

            }

        } catch (error) {

            return error;

        }

    };

    // Logout user, set to null
    const logout = ({ username }) => {

        try {
            const loggedIn = localStorage.getItem('cms_current_user');
            if (JSON.parse(loggedIn).token !== null && username !== null && username !== undefined) {
                // set to null
                localStorage.setItem('cms_current_user', null);
                // return null value
                return localStorage.getItem('cms_current_user');
            }
        } catch (error) {

            throw Error(error);

        }

    };

    /**
     * Is user auth token still valid?
     * Use the time this user logged in to determine validity.
     */
    const isAuthenticated = (user) => {
        // console.log(user.token);
        if (user !== undefined && user !== null) {
            const difference = Math.floor((((Date.now() / 1000) / 60) - user._l_time));
            // console.log(difference);
            // return true if difference is within 30 minutes
            return difference < 30 ? true : false;
        } else {
            return false;
        }
    };

    return { save, get, logout, isAuthenticated };

})();

/**
 * User profile
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} user
 */
export const profile = (() => {

    // user can edit
    const canEdit = ({ user }) => {
        if (user !== null && user.roles !== null && user.roles !== undefined) {

            // publisher
            if (user.roles.writer || user.roles.publisher || user.roles.admin) {
                return true;
            }

            return false;

        } else {

            return false;

        }
    }

    // can write
    const canWrite = ({ user }) => {
        if (user !== null && user.roles !== null && user.roles !== undefined) {

            // publisher
            if (user.roles.writer || user.roles.publisher || user.roles.admin) {
                return true;
            }

            return false;

        } else {

            return false;

        }
    }

    // can publish
    const canPublish = ({ user }) => {

        if (user !== null && user.roles !== null && user.roles !== undefined) {

            // publisher
            if (user.roles.publisher || user.roles.admin) {
                return true;
            }

            return false;

        } else {

            return false;

        }

    }

    // can delete
    const canDelete = ({ user }) => {
        if (user !== null && user.roles !== null && user.roles !== undefined) {

            if (user.roles.publisher || user.roles.admin) {
                return true;
            }

            return false;

        } else {

            return false;

        }
    }

    /**
     * Access levels
     */
    const showActions = () => {

        // return this method as a value
        return ({ user }) => {
            if (user.roles.writer && !user.roles.publisher) {
                return true;
            } else if (!user.roles.writer && user.roles.publisher) {
                return true;
            } else if (user.roles.writer && user.roles.publisher) {
                return true;
            } else if (user.roles.admin) {
                return true;
            } else {
                return false;
            }
        }

    }

    /**
     * Account can assign roles other users
     */
    const isAdmin = ({ user }) => {

        // has one level
        if (user !== null && user.roles !== null && user.roles !== undefined) {

            if (user.roles.admin) {
                return true;
            }

            return false;
        }

    }

    return {
        showActions,
        canEdit,
        canPublish,
        canWrite,
        canDelete,
        isAdmin
    }

})();