import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/People';

import './header.css'
import { redirect } from '../user/user.redirect';
import { Tooltip, IconButton } from '@material-ui/core';

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
                <Link to='/'>
                  Home
                    </Link>
              </NavItem>
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
                <Link to="/faqs">
                  FAQs
                    </Link>
              </NavItem>
              <NavItem>
                <Link to='/contact'>
                  Contact
                    </Link>
              </NavItem>
              <NavItem>
                <Tooltip title="Content management">
                  <IconButton
                    aria-label="CMS"
                    buttonRef={node => {
                      this.anchorEl = node
                    }
                    }
                    aria-haspopup="true"
                    onClick={(event) => redirect.toExternalLink({ url: `/cms`, event })}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}