import React, { Fragment } from 'react';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Create user personal account
 * 
 * @author Isaac S. Mwakabira
 */
export const PersonalProfile = ({ props }) => {

  // user
  const user = props.user;

  return (
    <Fragment>

      <div className='margin-fix'>
        <FormTextInputField  
          value={user !== null ? props.user.username : ''} 
          name='username' label='Username' type='text' 
          placeholder='Your username...' {...props} 
        />
      </div>
      <div className='margin-fix'>
        <FormTextInputField 
          value={user !== null ? props.user.firstName : ''} 
          name='firstname' label='Firstname' type='text' 
          placeholder='Your firstname...' {...props} 
        />
      </div>
      <div className='margin-fix'>
        <FormTextInputField 
          value={user !== null ? props.user.lastName : ''} 
          name='lastname' label='Lastname' type='text' 
          placeholder='Your lastname...' {...props} 
        />
      </div>
      <div className='margin-fix'>
        <FormTextInputField 
          value={user !== null ? props.user.email : ''} 
          name='email' label='Email' type='email' 
          placeholder='Your email...' {...props} 
        />
      </div>
      <div className='margin-fix'>
        <FormTextInputField 
          name='password' label='Password' type='password' 
          placeholder='Your password...' {...props} 
        />
      </div>
      <div className='margin-fix'>
        <FormTextInputField 
          name='confirmPassword' label='ConfirmPassword' 
          type='password' placeholder='Confirm your password...' 
          {...props} 
        />
      </div>
      
    </Fragment>
  );

}