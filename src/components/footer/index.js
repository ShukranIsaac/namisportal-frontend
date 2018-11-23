import React, { Component } from 'react'
import Sponsors from '../sponsors';

export default class Footer extends Component {
    render(){
        const stickToBottom = {
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
        }

        const footer = {
            padding: '10px',
            background: '#182026',
            color: '#FFFFFF',
            textAlign: 'center'
        }

        const span = {
            fontSize: '14px'
        }

        return(
            <div id='footer' style={stickToBottom}>
                <Sponsors/>
                <div style={footer}>
                    <span style={span}>Design and implementation: Chancellor College, Computer Science</span>
                </div>
            </div>
            
        );
    }
}