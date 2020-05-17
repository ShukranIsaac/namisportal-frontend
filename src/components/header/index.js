import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/People';

import './header.css'
import { redirect } from '../user/user.redirect';
import { Tooltip, IconButton } from '@material-ui/core';
import UserProfile from '../user/user.profile';

export const AppHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => setIsOpen(!isOpen), []);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    /** 
     * Authenticated user
     **/ 
    const user = UserProfile.get();

    const userAccountTooltip = () => {
        return (
            <Tooltip title={user != null ? user.username : "Please login!"}>
                <IconButton
                    aria-label="Admin"
                    buttonRef={node => {
                        // anchorEl = node
                    }
                    }
                    aria-haspopup="true"
                    onClick={(event) => redirect.toExternalLink({ 
                        url: `/cms`, event })
                    }
                >
                    <PersonIcon />
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <div id='giveHeaderHeight'>
            <Navbar color="light" light expand="md">
                <Link to="/"><h4>Namis Portal</h4></Link>
                <NavbarToggler />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem><Link to='/'>Home</Link></NavItem>
                        <NavItem><Link to='/licensing'>Licensing</Link></NavItem>
                        <NavItem><Link to='/financing'>Financing</Link></NavItem>
                        <NavItem><Link to='/library'>Library</Link></NavItem>
                        <NavItem><Link to='/directory'>Directory</Link></NavItem>
                        <NavItem><Link to='/news'>News</Link></NavItem>
                        <NavItem><Link to="/faqs">FAQs</Link></NavItem>
                        <NavItem><Link to='/contact'>Contact</Link></NavItem>
                        <NavItem>{ userAccountTooltip() }</NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppHeader;