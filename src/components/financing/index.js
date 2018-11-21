import React, { Component } from 'react';
import { Collapse, Button, Card, Elevation } from '@blueprintjs/core'
import { Flex, Box } from 'reflexbox'

class Financing extends Component {
  constructor(){
    super()
    this.state = {
      isOpen: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  render(){
    const containerStyle = {
      width: '80%',
      margin: '0 auto',
    }
    const header = {
      textAlign: 'center',
    }
    const button = {
      width: '100%',
      textAlign: 'left',
      borderRadius: '0',
      background: '#BFCCD6',
      fontSize: '1.2em'
    }

    const factsBack = {
      background: '#CED9E0',
    }
    return (
      <div style={containerStyle}>
        <div style={header}>
        <Flex 
          p={4} 
          align='center' 
          justify='center'
          m={1}
          w={1}>
          <Box w={1/2} p={1} align='center'>
          <h5 >Financing</h5>
          <p>
            User interfaces that enable people to interact smoothly 
            with data, ask better questions, and make better decisions.
          </p>
          </Box>
          </Flex>
        </div>
        <div>
          <Button onClick={this.handleClick} style={button}>
            1. Concept note
          </Button>
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
                  <li>The background of the prospected project</li>
                  <li>The background of the prospected project</li>
                  <li>The background of the prospected project</li>
                  <li>The background of the prospected project</li>
                </ul>
                <Card interactive={false} elevation={Elevation.ZERO} style={factsBack}>
                    <p><strong>Key Facts</strong></p>
                    <hr/>
                    <p>
                      The Project Developer should submit a Concept Note to the Rural 
                      Energy Agency (REA) in order to get a preliminary assessment of 
                      whether the planned project is eligible for support from the 
                      REA. The Concept note should, inter alia, include:
                    </p>
                </Card>
            </Card>
          </Collapse>
          
        </div>
      </div>
    );
  }

  handleClick(){
    this.setState({isOpen: !this.state.isOpen})
  }
}

export default Financing;
