import React, { Component } from 'react';
import { Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';

export class FormTextInputField extends Component {

    constructor() {
        super();
        this.state = {}

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.valaue });

    }

    render() {

        const { name, label, placeholder, type, multiline, rows, disabled } = this.props;

        return (
            <Field
                name={ name }
                component={ input => {
                    
                    return (
                        <RenderBootstrapField
                            { ...this.props }
                            label={ label }
                            defaultValue={ placeholder }
                            name={ name }
                            type={ type }
                            props={ input }
                            className='test-this'
                            disabled={ disabled }
                        />
                    );

                }}
                multiline={ multiline }
                rows={ rows }
            />
        );

    }

}