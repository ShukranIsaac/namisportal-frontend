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
  const APIUrl= "http://localhost:3300/";

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
  }

})();

export default Config;
