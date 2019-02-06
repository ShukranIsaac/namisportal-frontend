import React from 'react';
import { FormControl, FormGroup, FormLabel } from '@material-ui/core';
import { FormCheckboxControl } from '../forms/form.checkbox.field';

export const DirectoryStakeholderTypes = (props) => {

    return (
        <FormControl component="fieldset" className={props.classes.formControl}>
            <FormGroup>
                <FormLabel component="legend"><b>Stakeholder Type</b></FormLabel>

                <FormCheckboxControl 
                    value="financing"
                    label="Financing Institution"
                    handleChange={ props.handleChange }
                    checked={props.financing}
                />

                <FormCheckboxControl 
                    value="local_authority"
                    label="Local Authority"
                    handleChange={ props.handleChange }
                    checked={props.local_authority}
                />

                <FormCheckboxControl 
                    value="state_authority"
                    label="State Authority or Government Agency"
                    handleChange={ props.handleChange }
                    checked={props.state_authority}
                />

                <FormCheckboxControl 
                    value="nongovernmental_org"
                    label="Non-Governmental Organisation(N.G.O)"
                    handleChange={ props.handleChange }
                    checked={props.nongovernmental_org}
                />
            </FormGroup>
        </FormControl>
    );
}