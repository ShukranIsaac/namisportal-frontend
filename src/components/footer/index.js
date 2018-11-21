import React, { Component } from 'react'
import Sponsors from '../sponsors';

export default class Footer extends Component {
    render(){
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
            <>
                <Sponsors/>
                <div style={footer}>
                    <span style={span}>Design and implementation: Chancellor College, Computer Science</span>
                </div>
            </>
            
        );
    }
}