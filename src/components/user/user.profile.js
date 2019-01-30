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
            if(JSON.parse(loggedIn).token !== null) {

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
            if(JSON.parse(loggedIn).token !== null) {
                
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
            if(JSON.parse(loggedIn).token!==null&&username!==null&&username!==undefined) {
                // set to null
                localStorage.setItem('cms_current_user', null);
                // return null value
                return localStorage.getItem('cms_current_user');
            }
        } catch (error) {

            throw Error(error);

        }

    }

    return { save, get, logout };

})();