/**
 * Contact utilities: form validation methods
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} closure
 */
const ContactUtils = (() => {

    sleep: ms => new Promise(resolve => setTimeout(resolve, ms));

    validate: values => {

        const errors = {};

        const requiredFields = [
            'username', 'email', 'firstName', 'password',
            'lastName', 'confirmPassword',
        ];

        requiredFields.forEach(field => {

            if (!values[field]) {

                errors[field] = 'Required';

            }

        });

        if (values.email && /!^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

            errors.email = 'Invalid email';

        }

        return errors;
    };

    asyncValidate: (values, dispatch) => {

        return this.sleep(1000).then(() => {
            // silmulate server latency
            if (['foo@foo.com', 'isaa@isaa.com'].includes(values.email)) {
                // eslint-disable-next-line
                throw { email: 'Email already exists' }
            }
        });

    };

})();

export default ContactUtils;
