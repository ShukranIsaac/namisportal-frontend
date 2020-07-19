import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as UserAuthAction from '../../actions/user.action';

import ContactMail from '@material-ui/icons/Message';
import Sponsors from '../sponsors';
import './footer.fab.css';
import ContactForm from '../contact/contact.form';
import { Link } from 'react-router-dom';
import { redirect } from '../user/user.redirect';

export const Footer = ({
    stickToBottom,
    footer,
    footerContainer,
    span,
    ...props
}) => {
    const [state, setState] = useState({ toggle: false });

    const { match: {path} } = props;

    const handleToggleContactForm = () => setState({ toggle: !state.toggle })

    return (<div id='footer'>
        <div className={footerContainer}>
            {
                !path.includes("/directory") && <Sponsors />
            }
            {
                (path && path !== '/') && (
                    <div className={`action${ state.toggle ? ' active' : ''}`}>
                        <span onClick={handleToggleContactForm}>
                            <ContactMail style={{ color: 'white' }} />
                        </span>
                        <ul>
                            <li>
                                <h3> 
                                    <i className="fa fa-question-circle-o"
                                        style={{ 
                                            fontSize:'24px', 
                                            color:'white',
                                            paddingRight: '10px'
                                        }}>
                                    </i>
                                    Any Questions!
                                </h3>
                            </li>
                            <li><ContactForm {...props} /></li>
                            <li>Please send us a message!</li>
                        </ul>
                    </div>
                )
            }
            <div style={footer}>
                <div className="links">
                    <div className="links-inner">
                        <ul>
                            <li><h3>Links</h3></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/library">Library</Link></li>
                            <li><Link to="/directory">Directory</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/faqs">FAQs</Link></li>
                        </ul>
                        <ul>
                            <li>
                                <h3>
                                    External Links
                                </h3>
                            </li>
                            <li><Link to="/#" onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'https://www.namis.org/namis1',
                                    event: e
                                })
                            }>Namis <i className="fa fa-external-link"/></Link></li>
                            <li><Link to="/#" onClick={
                                e => redirect.toExternalLink({ 
                                    url: 'http://172.105.76.246:8081',
                                    event: e
                                })
                            }>Statistics <i className="fa fa-external-link"/></Link></li>
                        </ul>
                        <ul>
                            <li>
                                <h3>Contact Us <i className="fa fa-envelope-o"/></h3>
                            </li>
                            <li>Ministry of Agriculture</li>
                            <li>P/Bag 309, Lilongwe 3</li>
                            <li>info@agriculture.gov.mw</li>
                        </ul>
                        <ul>
                            <li>
                                <h3>
                                    Help <i className="fa fa-phone"></i>
                                </h3>
                            </li>
                            <li>+265 (1) xxx xxx</li>
                            <li>+265 (1) xxx xxx</li>
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-inner">
                        <ul>
                            <li>
                                <Link to="/#" className="link" style={span}>
                                    Copyright &copy; {
                                        new Date().getFullYear()
                                    }. All Rights Reserved | Ministry of Agriculture, Malawi
                                </Link>
                            </li>
                            <li><Link to="/#" className="link">|</Link></li>
                            <li><Link to="/">Support</Link></li>
                            <li><Link to="/">Privacy & Cookies</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

Footer.propTypes = {
    stickToBottom: PropTypes.object,
    footer: PropTypes.object,
    span: PropTypes.object
}

Footer.defaultProps = {
    stickToBottom: {
        position: 'relative',
        right: 0,
        bottom: 0,
        left: 0,
    },
    footerContainer: {
        position: 'relative',
        right: 0,
        bottom: 0,
        left: 0,
    },
    footer: {
        padding: '10px',
        background: '#000000', //'#182026',
        color: '#FFFFFF',
        textAlign: 'left'
    },
    span: {
        fontSize: '14px'
    }
}

const mapStateToProps = (state) => ({
    general: state.general.general,
    contact_us: state.user.contact_us,
    contact: state.user.contact,
})

const mapDispatchToProps = (dispatch) => ({
    // fetch contact details
    fetchContact: (name) => { dispatch(UserAuthAction.fetchContact(name)) },
    // contact us message, don't authenticate this route
    // since any user of the system can send a message.
    contactUs: (data) => { dispatch(UserAuthAction.contact(data)) },
})

Footer.propTypes = {
    fetchContact: PropTypes.func.isRequired,
    contactUs: PropTypes.func.isRequired
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(Footer);