import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/People';

import './header.css'
import { redirect } from '../user/user.redirect';
import { Tooltip, IconButton } from '@material-ui/core';
import UserProfile from '../user/user.profile';

import LOGO from '../../assets/img/ministryofagriculture.png';

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
            <Navbar color="#0171D0" light expand="md">
                <Link to="/">
                    <img 
                        className="rounded rounded-circle"
                        src={ LOGO } 
                        alt="Logo"
                        style={{ 
                            paddingRight: '5px', 
                            marginBottom: '-25.4px',
                            width: '90px', 
                        }}
                    />
                </Link>
                <Link to="/"><b><h3>NAMIS</h3></b></Link>
                <NavbarToggler onClick={toggleHamburger}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem><Link to='/'>Home</Link></NavItem>
                        <NavItem>
                            <Link to='/#' onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'https://www.namis.org/namis1',
                                    event: e
                                })
                            }>
                                Namis
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/#' onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'http://172.105.76.246:8081',
                                    event: e
                                })
                            }>
                                Statistics
                            </Link>
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