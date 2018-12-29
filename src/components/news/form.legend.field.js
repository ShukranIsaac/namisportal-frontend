import React, { Fragment } from 'react';
import FormLabel from '@material-ui/core/FormLabel';

const FormLegendField = ({ value }) => {

    return (
        <Fragment>

            <FormLabel component="legend" style={{ margin: '10px' }}> { value } </FormLabel>

        </Fragment>
    );

}

export default FormLegendField;