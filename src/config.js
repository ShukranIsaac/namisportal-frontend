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
    const REMOTE_HEROKU_PROD_SERVER = "https://namisportal.herokuapp.com/";
    const LOCAL_DEV_SERVER =`http://127.0.0.1:8083`;

    // API base url
    const DEV_REMOTE_API_URL = Axios.create({ baseURL: LOCAL_DEV_SERVER });

    // production
    const PROD_REMOTE_API_URL = Axios.create({
        baseURL: process.env.NODE_ENV === 'development' ? REMOTE_HEROKU_PROD_SERVER : REMOTE_PROD_SERVER
    })

    const HEROKU_PROD_REMOTE_API_URL = Axios.create({ baseURL: REMOTE_HEROKU_PROD_SERVER })

    // Client ip address
    const ACCESS_ALLOW_ORIGIN = "HTTP_X_FORWARDED_FOR";

    return {
        ACCESS_ALLOW_ORIGIN,
        DEV_REMOTE_API_URL,
        PROD_REMOTE_API_URL,
        REMOTE_PROD_SERVER,
        LOCAL_DEV_SERVER,
        HEROKU_PROD_REMOTE_API_URL
    }

})();

export default Config;
