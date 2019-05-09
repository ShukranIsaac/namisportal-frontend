/**
 * Validation contact form.
 * 
 * @author Isaac S. Mwakabira
 * 
 * @returns {Closure} validation
 */
const Validate = values => {

    const errors = {};

    const requiredFields = [
        'username', 'email', 'firstName', 'password',
        'lastName', 'confirmPassword'
    ];

    requiredFields.forEach(field => {

        if (!values[field]) {

            errors[field] = field + ' is required';

        }

    });

    if (values.email && /!^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = 'Invalid email';

    }

    return errors;
}

export default Validate;
