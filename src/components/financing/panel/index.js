import React, { Component } from 'react'
import { Collapse, Callout, Icon, Card, Elevation } from '@blueprintjs/core'

//  import '../style.css'

/**
 * Renders a single panel
 * 
 * @author Paul Sembereka (Pablo)
 * 
 */
class Panel extends Component{

    constructor(){
        super()
        this.state = {
            isOpen: false,
            collapsed: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
   
    
    render(){

        const button = {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            borderRadius: '0',
            background: '#D8E1E8',
            fontSize: '1.2em',
            padding: '10px',
            cursor: 'pointer'
        }

        const docContainer = {
            marginBottom: '10px',
            textAlign: 'left'
        }

        // const alignCenter = {
        //     textAlign: 'center'
        // }

        // const list = {
        //     listStyle: 'numbered'
        // }
        
        const factsBack = { background: '#D8E1E8'}
        let { heading, text } = this.props;

        return (
            <div style={docContainer}>
                <Callout onClick={this.handleClick} style={button} rightIcon="add">
                    <div style={{ alignSelf: 'flex-start'}}>{ heading }</div>
                    <div style={{marginLeft: 'auto'}}>
                       { this.state.collapsed ? <Icon icon="remove"/> : <Icon icon="add"/>} 
                    </div>
                </Callout>
                
                <Collapse isOpen={this.state.isOpen}>   
                <Card interactive={true} elevation={Elevation.ZERO}>
                    {text}
                </Card>
              </Collapse>
            </div>
        )
    }

    handleClick(){
        this.setState(() => ({isOpen: !this.state.isOpen, collapsed: !this.state.collapsed}))
    }
    
}

export default Panel;

