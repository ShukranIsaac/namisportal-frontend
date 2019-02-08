import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem, } from 'reactstrap';
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
      <div id='giveHeaderHeight'>
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