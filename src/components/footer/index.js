import React from 'react';
import PropTypes from 'prop-types';

import Sponsors from '../sponsors';
// import Contact from '../contact';

export const Footer = ({
    stickToBottom,
    footer,
    span
}) => (<div id='footer'>
        <div style={stickToBottom}> 
            {/* <Contact /> */}

            <Sponsors />
        </div>

        <br />

        <div style={footer}>
            <span style={span}>
                Copyright &copy; {
                    new Date().getFullYear()
                }. All Rights Reserved | Ministry of Agriculture, Malawi
            </span>
        </div>
    </div>
);

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
    footer: {
        padding: '10px',
        background: '#182026',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
    },
    span: {
        fontSize: '14px'
    }
}

export default Footer;