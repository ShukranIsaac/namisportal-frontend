import React, { Component } from 'react'
import Sponsors from '../sponsors';

export default class Footer extends Component {

    render() {

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
                    <span style={span}>© 2019 All rights Reserved | Department of Energy Affairs - Minigrids Portal</span>
                </div>
            </div>
        );
    }
}