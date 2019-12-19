import React from 'react';
import { Link } from "react-router-dom";

import './page.not.found.css';

export const PageNotFound = () => {

    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404"></div>
                <h1>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>Sorry but the page you are looking for may have been changed or is temporarily unavailable</p>
                <Link to="/">Back to homepage</Link>
            </div>
        </div>
    );

}

export default PageNotFound;