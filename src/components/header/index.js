import React, { useState, useEffect, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/People';
import * as HomeActions from '../../actions/home.action';

import './header.css'
import { redirect } from '../user/user.redirect';
import { Tooltip, IconButton } from '@material-ui/core';
import UserProfile from '../user/user.profile';

import LOGO from '../../assets/img/ministryofagriculture.png';
import { connect } from 'react-redux';
import { algorithms } from '../user/user.sort';

const mapStateToProps = (state) => ({
    home: state.home.home,
    general: state.general.general,
})

const mapDispatchToProps = (dispatch) => ({
    fetchHome: (name) => dispatch(HomeActions.fetchHomeDetails(name)),
})

const HeaderNavLinks = ({
    links,
    filters
}) => (<Fragment>
    {
        links.filter(({ name }) => filters.length > 0 ? filters.includes(name) : filters)
        .map(({ name }, index) => <NavItem key={name + index}>
            <Link to={`/${name.toLowerCase()}`}>
                { algorithms.capitalize(name) }
            </Link>
        </NavItem>)
    }
</Fragment>)

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(({
    home,
    fetchHome,
    setLinks
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHamburger = () => setIsOpen(!isOpen);

    useEffect(() => {
        fetchHome("Home")
    }, [fetchHome]);

    setLinks(home)

    const marginLeft = {
        marginLeft: '2px'
    }

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
                        <HeaderNavLinks links={home} filters={["Home", "Library"]} />
                        <NavItem>
                            <Link to='/#' onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'https://covmw.com/namistest',
                                    event: e
                                })
                            }>
                                Namis<span style={marginLeft}>
                                    <i className="fa fa-external-link"></i>
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/#' onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'http://172.105.76.246:8081',
                                    event: e
                                })
                            }>
                                Statistics<span style={marginLeft}>
                                    <i className="fa fa-external-link"></i>
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/#' onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'http://172.105.76.246:8084',
                                    event: e
                                })
                            }>
                                Analytics<span style={marginLeft}>
                                    <i className="fa fa-external-link"></i>
                                </span>
                            </Link>
                        </NavItem>
                        <HeaderNavLinks links={home} filters={["Directory", "News", "FAQs"]} />
                        <NavItem>{ userAccountTooltip() }</NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
})

export default AppHeader;