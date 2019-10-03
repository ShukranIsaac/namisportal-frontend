import { toast } from 'react-toastify';

export const Toast = (() => {

    const TYPES = (() => {

        const SUCCESS = 'success';
    
        const INFO = 'info';
    
        const WARN = 'warning';
    
        const DEFAULT = 'default';
    
        const ERROR = 'error';
    
        return {
            SUCCESS,
            INFO,
            WARN,
            DEFAULT,
            ERROR
        }
    
    })();

    const emit = ({ type, message }) => {

        switch (type) {
            case TYPES.SUCCESS:
                toast.success(message, {
                    position: "bottom-center",
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                break;

            case TYPES.INFO:
                toast.info(message, {
                    position: "bottom-center",
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                break;

            case TYPES.WARN:
                toast.warn(message, {
                    position: "bottom-center",
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                break;

            case TYPES.ERROR:
                toast.error(message, {
                    position: "bottom-center",
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                break;

            default:
                toast(message, {
                    position: "bottom-center",
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                break;
        }

    }

    return {
        emit,
        TYPES
    }

})();

export default Toast;