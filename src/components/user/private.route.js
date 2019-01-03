import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Checks if the user is logged in
 * if yes show cms landing page else
 * show loggin form.
 * 
 * @param component
 * @param  props 
 * @returns component to render
 */
const UserLoggedIn = ({component, props}) => {

    return (
        <Fragment>
            
            {
                
                localStorage.getItem('user') ? <component {...props} /> : 
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

        </Fragment>
    );

};

/**
 * Directs the user to the right route depending 
 * on the user credentials if any provided else loggin form.
 *  
 * @param component
 * @param rest
 * @returns component
 */
const UserPrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Fragment>

            <Route {...rest} render={props => (<UserLoggedIn props={props} component={Component }/>)}/>

        </Fragment>
    );
};

export default UserPrivateRoute;
