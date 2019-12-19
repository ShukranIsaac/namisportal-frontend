/**
 * User profile, object to hold user credentials upon login and register
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class UserProfile {

    /**
     * Save user details to the local store/persist
     * 
     * @param {Object} user 
     */
    save(user) {
        // save user to local storage
        let loggedIn = null;

        try {
            sessionStorage.setItem('cms_current_user', JSON.stringify(user))

            // localStorage.setItem('cms_current_user', JSON.stringify(user));

        } catch (error) {

            return error;

        }

        try {

            // loggedIn = localStorage.getItem('cms_current_user');
            loggedIn = sessionStorage.getItem('cms_current_user')
            if (JSON.parse(loggedIn).token) {

                return JSON.parse(loggedIn);

            } else {

                return null;

            }

        } catch (error) {

            return error;

        }

    };

    // loggedin user
    get() {

        try {

            // const loggedIn = localStorage.getItem('cms_current_user');
            const loggedIn = sessionStorage.getItem('cms_current_user');

            if (JSON.parse(loggedIn) !== null && JSON.parse(loggedIn).token) {

                return JSON.parse(loggedIn);

            } else {

                return null;

            }

        } catch (error) {

            return error;

        }

    };

    // Logout user, set to null
    logout({ username }) {

        try {
            // const loggedIn = localStorage.getItem('cms_current_user');
            const loggedIn = sessionStorage.getItem('cms_current_user');
            if (JSON.parse(loggedIn).token !== null && username) {
                // set to null
                sessionStorage.clear();
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
    isAuthenticated(user) {
        return user ? true : false;
    };

}

export default new UserProfile();

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