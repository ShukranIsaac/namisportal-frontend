import React from 'react';
import { Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import { ErrorField } from '../forms/form.error.field';
import { DirectoryStakeholderTypes } from '../directory/directory.stakeholder.type';

/**
 * Create company profile
 * @author Isaac S. Mwakabira
 */
export const CompanyProfile = ({ props, state }) => {

    return (
        <>
          <div>
            <Field name="companyName" component={input => {   
              return (
                <div>
                  <RenderBootstrapField
                    { ...props }
                    props={ input }
                    label='Company name(Legal)'
                    defaultValue= "Campany name..."
                    name="companyName"
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
                    defaultValue= "Campany physical address..."
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
                        defaultValue= "Campany telephone number..."
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
                        defaultValue= "Campany fax number..."
                        name="fax"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <Field name="companyEmail" component={input => {   
              return (
                <div>
                    <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Email'
                        defaultValue= "Campany email address..."
                        name="companyEmail"
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
                        defaultValue= "Campany website ..."
                        name="telephone"
                        type="text"
                    />
                    <ErrorField props={ input } />
                </div>
              )
            }} />
          </div>
          <div>
            <DirectoryStakeholderTypes classes={props.classes} handleChange={ state.handleChange } { ...state } />
          </div>
        </>
    );
    

}