import React from 'react'
import Sponsors from '../sponsors';

export const Footer = () => {

    const stickToBottom = {
        position: 'relative',
        right: 0,
        bottom: 0,
        left: 0,
    }

    const footer = {
        padding: '10px',
        background: '#182026',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
    }

    const span = {
        fontSize: '14px'
    }

    return (
        <div id='footer'>
            <div style={stickToBottom}>
                <Sponsors />
            </div>
            <br />
            <div style={footer}>
                <span style={span}>
                    Copyright &copy; {new Date().getFullYear()}. All rights Reserved | Ministry of Agriculture, Malawi
                </span>
            </div>
        </div>
    );
}

export default Footer;