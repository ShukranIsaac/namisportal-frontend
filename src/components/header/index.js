import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/People';

import './header.css'
import { redirect } from '../user/user.redirect';
import { Tooltip, IconButton } from '@material-ui/core';
import UserProfile from '../user/user.profile';

export const AppHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHamburger = () => setIsOpen(!isOpen);

    /** 
     * Authenticated user
     **/ 
    const user = UserProfile.get();

    const userAccountTooltip = () => {
        return (
            <Tooltip title={user ? user.username : "Please login!"}>
                <IconButton
                    aria-label="Admin"
                    buttonRef={node => {
                        // anchorEl = node
                    }}
                    aria-haspopup="true"
                    onClick={(event) => redirect.toExternalLink({ 
                        url: `/admin`, event })
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
                <Link to="/"><h4>Namis MIS</h4></Link>
                <NavbarToggler onClick={toggleHamburger}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem><Link to='/'>Home</Link></NavItem>
                        <NavItem>
                            <Link 
                                to='/#' 
                                onClick={e => redirect.toExternalLink({
                                    url: 'www.namis.org/namis1', event: e
                            })}>Namis</Link>
                        </NavItem>
                        <NavItem>
                            <Link 
                                to='/#' 
                                onClick={e => redirect.toExternalLink({
                                    url: 'www.namis.org/portal', event: e
                            })}>Statistics</Link>
                        </NavItem>
                        <NavItem><Link to='/library'>Library</Link></NavItem>
                        <NavItem><Link to='/directory'>Directory</Link></NavItem>
                        <NavItem><Link to='/news'>News</Link></NavItem>
                        <NavItem><Link to="/faqs">FAQs</Link></NavItem>
                        <NavItem>{ userAccountTooltip() }</NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppHeader;