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

    const REMOTE_PROD_SERVER = "http://172.105.76.246:8083";

    // API base url
    const DEV_REMOTE_API_URL = Axios.create({
        baseURL: `http://127.0.0.1:8083`
    });

    // production
    const PROD_REMOTE_API_URL = Axios.create({
        baseURL: REMOTE_PROD_SERVER
    })

    // Client ip address
    const ACCESS_ALLOW_ORIGIN = "HTTP_X_FORWARDED_FOR";

    return {
        ACCESS_ALLOW_ORIGIN,
        DEV_REMOTE_API_URL,
        PROD_REMOTE_API_URL,
        REMOTE_PROD_SERVER
    }

})();

export default Config;
