/*import React, { Fragment } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import './header.css'

const AppHeader = () => {

    //styles, global styles
    const navOption = {
        
    }

    return (
        <Fragment>

           <div>
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

                           
                                <Link to="/cms">
                                    <Button className="bp3-minimal" icon="user" />
                                </Link>
                            
                           
                                <Button className="bp3-minimal" icon="notifications" />
                            
                                <Button className="bp3-minimal" icon="cog" />
                            

                        </ul>
                    </div>
                </div>
            </nav>
        </div>


        <AppBar position="static">
            <Toolbar>
            <IconButton  color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
                News
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </Fragment>
    );
}

export default AppHeader;
*/

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";

import './header.css'

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to="/"><h4>Malawi Mini Grids</h4></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                    <Link to='/licensing'>
                        Licensing
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='/financing'>
                        Financing
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='library'>
                        Library
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='/gis'>
                        GIS
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='/directory'>
                        Directory
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='/news'>
                        News
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to="/faq">
                        FAQ
                    </Link>
              </NavItem>
              <NavItem>
                    <Link to='/contact'>
                        Contact
                    </Link>
              </NavItem>
              <NavItem>
                <Link to="/cms">
                    CMS
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}