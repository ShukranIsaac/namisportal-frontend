import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import RenderBootstrapField from '../forms/form.bootstrap.field';
import { ErrorField } from '../forms/form.error.field';

/**
 * Create user personal account
 * 
 * @author Isaac S. Mwakabira
 */
export const PersonalProfile = ({ props }) => {

    return (
        <Fragment>
            <div>
              <Field name="username" component={input => {
                  return (
                    <div>
                      <RenderBootstrapField
                        { ...props }
                        props={ input }
                        label='Username'
                        defaultValue= "Your username..."
                        name="username"
                        type="text"
                      />
                      <ErrorField props={ input } />
                    </div>
                  )
                }} 
              />
            </div>
            <div>
              <Field name="firstname" component={input => {
                return (
                  <div>
                    <RenderBootstrapField
                      { ...props }
                      props={ input }
                      label='Firstname'
                      defaultValue= "Your firstname..."
                      name="firstname"
                      type="text"
                    />
                    <ErrorField props={ input } />
                  </div>
                )
              }} />
            </div>
            <div>
              <Field name="lastname" component={input => {
                return (
                  <div>
                    <RenderBootstrapField
                      { ...props }
                      props={ input }
                      label='Lastname'
                      defaultValue= "Your lastname..."
                      name="lastname"
                      type="text"
                    />
                    <ErrorField props={ input } />
                  </div>
                )
              }} />
            </div>
            <div>
              <Field name="email" component={input => {
                return (
                  <div>
                    <RenderBootstrapField
                      { ...props }
                      props={ input }
                      label='Email'
                      defaultValue= "Your email..."
                      name="email"
                      type="email"
                    />
                    <ErrorField props={ input } />
                  </div>
                )
              }} />
            </div>
            <div>
              <Field name="password" component={input => {
                return (
                  <div>
                    <RenderBootstrapField
                      { ...props }
                      props={ input }
                      label='Password'
                      defaultValue= "Your password..."
                      name="password"
                      type="password"
                    />
                    <ErrorField props={ input } />
                  </div>
                )
              }} />
            </div>
            <div>
              <Field name="confirmPassword" component={input => {
                return (
                  <div>
                    <RenderBootstrapField
                      { ...props }
                      props={ input }
                      label='Confirm Password'
                      defaultValue= "Confirm your password..."
                      name="confirmPassword"
                      type="password"
                    />
                    <ErrorField props={ input } />
                  </div>
                )
              }} />
            </div>
        </Fragment>
    );

}