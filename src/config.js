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

  // API base url
  const APIUrl= Axios.create({
    baseURL: `http://192.168.1.3:3300/`
  });

  // remote online api
  const REMOTE_API_URL = Axios.create({
    baseURL: `https://dry-springs-19364.herokuapp.com/`
  });

  // Client ip address
  const ACCESS_ALLOW_ORIGIN= "HTTP_X_FORWARDED_FOR";

  const getApiUrl = () => {
    return APIUrl;
  }

  const getClient = () => {
    return ACCESS_ALLOW_ORIGIN;
  }

  return {
    getApiUrl,
    getClient,
    APIUrl,
    ACCESS_ALLOW_ORIGIN,
    REMOTE_API_URL,
  }

})();

export default Config;
