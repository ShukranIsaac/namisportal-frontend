import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Directs the user to the right route depending 
 * on the user credentials if any provided else loggin form.
 * 
 * Checks if the user is logged in, if yes show cms landing page else, 
 *  show loggin form.
 *  
 * @param component
 * @param rest
 * @returns component
 */
const UserPrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Fragment>

            <Route 
                {...rest} 
                render={props => {

                    return (
                        <Fragment>
                            
                            {   
                                !localStorage.getItem('user') ? <Component {...props} /> : 

                                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                            }
                
                        </Fragment>
                    );

                }}
            />

        </Fragment>
    );
    
};

export default UserPrivateRoute;
