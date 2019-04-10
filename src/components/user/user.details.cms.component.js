import React from 'react';

/**
 * User details component
 * 
 * @author Isaac S. Mwakabira
 */
export const UserDetails = (props) => {

    return (
        <Fragment>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#general">General</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#roles">Roles</a>
                </li>
            </ul>

            <div className="tab-content">
                <div id="general" className="tab-pane active"><br />
                    General details
                </div>
                <div id="roles" className="tab-pane fade"><br />
                    User roles
                </div>
            </div>
        </Fragment>
    );

}