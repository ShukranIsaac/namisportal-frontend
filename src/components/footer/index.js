import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as UserAuthAction from '../../actions/user.action';

import ContactMail from '@material-ui/icons/Message';
import Sponsors from '../sponsors';
import './footer.fab.css';
import ContactForm from '../contact/contact.form';

export const Footer = ({
    stickToBottom,
    footer,
    footerContainer,
    span,
    ...props
}) => {
    const [state, setState] = useState({ toggle: false });
    const [view, setView] = useState(true);

    const { match: {path} } = props;

    const handleToggleContactForm = () => setState({ toggle: !state.toggle })

    const handleToggleView = () => setView(!view);

    return (<div id='footer'>
        {
            (path && path !== '/') && (
                <div className={`action${ state.toggle ? ' active' : ''}`}>
                    <span onClick={handleToggleContactForm}>
                        <ContactMail style={{ color: 'white' }} />
                    </span>
                    <ul>
                        <li>
                            <h3>
                                { 
                                    view ? "Any Questions!" : "Contact Us"
                                } 
                                <i className="fa fa-question-circle-o"
                                    onClick={handleToggleView} 
                                    style={{ 
                                        fontSize:'24px', 
                                        color:'white',
                                        marginLeft: '10px'
                                    }}>
                                </i>
                            </h3>
                        </li>
                        {
                            view && (<>
                                <li><ContactForm {...props} /></li>
                                <li>Please send us a message!</li>
                            </>)
                        }
                    </ul>
                </div>
            )
        }

        <div className={footerContainer}>
            {
                !path.includes("/directory") && <Sponsors />
            }
            <div style={footer}>
                <span style={span}>
                    Copyright &copy; {
                        new Date().getFullYear()
                    }. All Rights Reserved | Ministry of Agriculture, Malawi
                </span>
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
        background: '#182026',
        color: '#FFFFFF',
        textAlign: 'center',
        // minHeight: '109px',
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