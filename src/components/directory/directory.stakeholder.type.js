import React from 'react';
import { Field } from 'redux-form';
import { FormControl, FormGroup, FormLabel } from '@material-ui/core';
import { FormCheckboxControl } from '../forms/form.checkbox.field';

export const DirectoryStakeholderTypes = (props) => {

    return (
        <FormControl component="fieldset" className={props.classes.formControl}>
            <FormGroup>
                <FormLabel component="legend"><b>Stakeholder Type</b></FormLabel>

                <Field 
                    name='financing' 
                    component={ input => {
                        return (
                            <FormCheckboxControl 
                                name="financing"
                                value="Financing Institution"
                                handleChange={ props.handleChange }
                                checked={ props.financing }
                                classes={ props.classes }
                                props={ input }
                                { ...props }
                            />
                        );
                    }} 
                />

                <Field
                    name='local_authority'
                    component={ input => {
                        return (
                            <FormCheckboxControl 
                                name="local_authority"
                                value="Local Authority"
                                handleChange={ props.handleChange }
                                checked={ props.local_authority }
                                classes={ props.classes }
                                props={ input }
                                { ...props }
                            />
                        );
                    }}
                />

                <Field
                    name='state_authority'
                    component={ input => {
                        // console.log(props);
                        return (
                            <FormCheckboxControl 
                                name="state_authority"
                                value="State Authority or Government Agency"
                                handleChange={ props.handleChange }
                                checked={ props.state_authority }
                                classes={ props.classes }
                                props={ input }
                                { ...props }
                            />
                        );
                    }}
                />

                <Field
                    name='nongovernmental_org'
                    component={ input => {
                        return (
                            <FormCheckboxControl 
                                name="nongovernmental_org"
                                value="Non-Governmental Organisation(N.G.O)"
                                handleChange={ props.handleChange }
                                checked={ props.nongovernmental_org }
                                classes={ props.classes }
                                props={ input }
                                { ...props }
                            />
                        );
                    }}
                />
                
            </FormGroup>
        </FormControl>
    );
}