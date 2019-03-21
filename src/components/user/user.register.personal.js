import React, { Fragment } from 'react';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Create user personal account
 * 
 * @author Isaac S. Mwakabira
 */
export const PersonalProfile = ({ props }) => {

  return (
    <Fragment>

      <div className='margin-fix'>
        <FormTextInputField name='username' label='Username' type='text' placeholder='Your username...' {...props} />
      </div>
      <div className='margin-fix'>
        <FormTextInputField name='firstname' label='Firstname' type='text' placeholder='Your firstname...' {...props} />
      </div>
      <div className='margin-fix'>
        <FormTextInputField name='lastname' label='Lastname' type='text' placeholder='Your lastname...' {...props} />
      </div>
      <div className='margin-fix'>
        <FormTextInputField name='email' label='Email' type='email' placeholder='Your email...' {...props} />
      </div>
      <div className='margin-fix'>
        <FormTextInputField name='password' label='Password' type='password' placeholder='Your password...' {...props} />
      </div>
      <div className='margin-fix'>
        <FormTextInputField name='confirmPassword' label='Password' type='password' placeholder='Confirm your password...' {...props} />
      </div>
      
    </Fragment>
  );

}