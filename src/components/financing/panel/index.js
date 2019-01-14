 import React, { Component } from 'react'
 import { Collapse, Callout, Icon, Button, Card, Elevation } from '@blueprintjs/core'
 import '../style.css'
 
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

        const alignCenter = {
            textAlign: 'center'
        }

        const list = {
            listStyle: 'numbered'
        }
        
        const factsBack = { background: '#D8E1E8'}
        let { heading, requiredpath, summary } = this.props;

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
                    <p>
                      The Project Developer should submit a Concept Note to the Rural 
                      Energy Agency (REA) in order to get a preliminary assessment of 
                      whether the planned project is eligible for support from the 
                      REA. The Concept note should, inter alia, include:
                    </p>
                    <ul>
                      <li>The background of the prospected project</li>
                      <li>Market assessment</li>
                      <li>The background of the prospected project</li>
                      <li>The background of the prospected project</li>
                      <li>The background of the prospected project</li>
                    </ul>
                    <Card interactive={false} elevation={Elevation.ZERO} style={factsBack}>
                        <p><strong>Key Facts</strong></p>
                        <hr/>
                        <span><Icon icon="timeline-events"/> Duration: 1 year</span><br/>
                        <span>Required Documentation</span>
                        <ol>
                            <li>Concept Note</li>
                        </ol>
                    </Card>
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

