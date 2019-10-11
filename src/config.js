import Axios from "axios";

/**
 * Global configuration file. 
 * i.e. base url 
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} config
 */
const Config = (() => {

    const REMOTE_PROD_SERVER = "http://109.74.196.98:8082";

    // API base url
    const DEV_APIUrl = Axios.create({
        baseURL: `http://localhost:3300/`
    });

    // remote online api
    const DEV_REMOTE_API_URL = Axios.create({
        baseURL: `https://dry-springs-19364.herokuapp.com/`
    });

    // production
    const PROD_REMOTE_API_URL = Axios.create({
        baseURL: REMOTE_PROD_SERVER
    })

    // Client ip address
    const ACCESS_ALLOW_ORIGIN = "HTTP_X_FORWARDED_FOR";

    return {
        REMOTE_PROD_SERVER,
        DEV_APIUrl,
        ACCESS_ALLOW_ORIGIN,
        DEV_REMOTE_API_URL,
        PROD_REMOTE_API_URL
    }

})();

export default Config;
