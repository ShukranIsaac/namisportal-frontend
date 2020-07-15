import { toast } from 'react-toastify';

export const Toast = (() => {

    const TYPES = (() => {

        const SUCCESS = toast.TYPE.SUCCESS;

        const INFO = toast.TYPE.INFO;

        const WARN = toast.TYPE.WARNING;

        const DEFAULT = toast.TYPE.DEFAULT;

        const ERROR = toast.TYPE.ERROR;

        const UPLOAD_PROGRESS = 'progress';

        return {
            SUCCESS,
            INFO,
            WARN,
            DEFAULT,
            ERROR,
            UPLOAD_PROGRESS
        }

    })();

    const progress = (progress) => {
        // we need to keep a reference of the 
        // id to be able to update it
        let id = null;

        // check if we already displayed a toast
        if (id === null) {

            id = toast('Upload in Progress', {
                position: "bottom-center",
                progress: progress,
                autoClose: 100
            });

        } else {

            toast.update(id, {
                position: "bottom-center",
                progress: progress
            })

        }

        const done = () => toast.done(id);

        return (() => {

            // when update is done
            // cancel
            return { toast, id, done };

        })();

    }

    const emit = ({ type, message, autoClose }) => {

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
                    autoClose: autoClose ? 5000 : 1900,
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
        TYPES,
        progress
    }

})();

export default Toast;