import React from 'react';

const Validate = values => {

    const errors = {};
    const requiredFields = ['name', 'email', 'message'];

    requiredFields.forEach(field => {

        if (!values[field]) {

            errors[field] = 'Required';

        }

    });

    if (values.email && /!^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = 'Invalid email';

    }

    return errors;
}

export default Validate;
