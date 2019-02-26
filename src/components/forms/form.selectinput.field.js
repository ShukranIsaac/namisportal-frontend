import React, { Component, Fragment } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
// import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * Renders single select component
 * 
 * @author Isaac S. Mwakabira
 */
export class SelectInputControl extends Component {

    /**
     * Capitalize first letter of this word
     */
    capitalize = (character) => {
        return character && character[0].toUpperCase() + character.slice(1);
    }

    render() {

        return (
            <Fragment>

                <InputLabel shrink htmlFor="option-open-select"> { this.capitalize(this.props.name) } </InputLabel>
    
                <NativeSelect
                    value={ this.props.value } 
                    name={ this.props.name }
                    onChange={ 
                        (e) => { 
                            this.props.onChange(e) 
                        } 
                    }
                    input={
                        <Input key={this.props.name} name={this.props.name} />
                    }
                >
                    
                    { this.props.children }

                </NativeSelect>
    
                {/* <FormHelperText><em>{ this.props.helperText }</em></FormHelperText> */}

            </Fragment>
        );

    }

}