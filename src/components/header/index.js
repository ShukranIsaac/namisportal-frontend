import React, { Fragment } from "react";
import { Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import './header.css'

export const CMSCustomHeader = () => {

    return (
        <Fragment>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span> 
                        </button>

                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            {/* <li className="active">
                                <Link to="/">
                                    <Button className="bp3-minimal" icon="home" text="Home" />
                                </Link>
                            </li>

                            <li>
                                <Link to="/cms">
                                    <Button className="bp3-minimal" icon="user" />
                                </Link>
                            </li> */}

                            {/* <li>
                                <Button className="bp3-minimal" icon="notifications" />
                            </li>

                            <li>
                                <Button className="bp3-minimal" icon="cog" />
                            </li> */}

                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    );

}

const AppHeader = () => {

    return (
        <Fragment>

            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span> 
                        </button>
                    
                        <Link to="/" className = "navbar-brand">Malawi Mini Grids</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active">
                                <Link to="/">
                                    <Button className="bp3-minimal" icon="home" text="Home" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/licensing">
                                    <Button className="bp3-minimal" icon="take-action" text="Licensing" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/financing">
                                    <Button className="bp3-minimal" icon="dollar" text="Financing" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/library">
                                    <Button className="bp3-minimal" icon="document" text="Library" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/directory">
                                    <Button className="bp3-minimal" icon="manual" text="Directory" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/gis">
                                    <Button className="bp3-minimal" icon="geosearch" text="GIS" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/news">
                                    <Button className="bp3-minimal" icon="applications" text="News" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq">
                                    <Button className="bp3-minimal" icon="help" text="FAQ" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <Button className="bp3-minimal" icon="id-number" text="Contact" />
                                </Link>
                            </li>

                            <li>
                                <Link to="/cms">
                                    <Button className="bp3-minimal" icon="user" />
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </Fragment>
    );

}

export default AppHeader;