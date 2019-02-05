import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import { ErrorField } from '../forms/form.error.field';
import { DirectoryStakeholderTypes } from '../directory/directory.stakeholder.type';

/**
 * Create company profile
 * @author Isaac S. Mwakabira
 */
export const StakeholderProfile = ({ props, state, handleChange }) => {
    
    return (
        <Fragment>
          <div>
            <Field name="stakeholderName" component={input => {   
              return (
                <div>
                  <RenderBootstrapField
                    { ...props }
                    props={ input }
                    label="Stakeholder's name(Legal)"
                    defaultValue= "Stakeholder's name..."
                    name="stakeholderName"
                    type="text"
                  />
                  <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="physicalAddress" component={input => {   
              return (
                <div>
                  <RenderBootstrapField
                    { ...props }
                    props={ input }
                    label='Physical address'
                    defaultValue= "Stakeholder's physical address..."
                    name="physicalAddress"
                    type="text"
                  />
                  <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="telephone" component={input => {   
              return (
                <div>
                    <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Telephone'
                        defaultValue= "Stakeholder's telephone number..."
                        name="telephone"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="fax" component={input => {   
              return (
                <div>
                    <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Fax'
                        defaultValue= "Stakeholder's fax number..."
                        name="fax"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="stakeholderEmail" component={input => {   
              return (
                <div>
                    <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Email'
                        defaultValue= "Stakeholder's email address..."
                        name="stakeholderEmail"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="website" component={input => {   
              return (
                <div>
                    <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Web URL'
                        defaultValue= "Stakeholder's website ..."
                        name="telephone"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <DirectoryStakeholderTypes 
              classes={props.classes} 
              handleChange={ handleChange }
              { ...state } 
              { ...props }
            />
          </div>
        </Fragment>
    );
    

}