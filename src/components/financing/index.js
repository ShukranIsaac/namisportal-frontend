import React, { Component } from 'react';
import { Callout,Collapse, Button, Card, Elevation } from '@blueprintjs/core'
import { Flex, Box } from 'reflexbox';
import Panel from './panel';

class Financing extends Component {
  render(){
    const containerStyle = {
      width: '80%',
      margin: '0 auto',
    }
    const header = {
      textAlign: 'center',
    }
    const financing = {
      marginBottom: 8,
      borderRadius: 0
    }
    const flexStyle = {
      margin: 'auto',
      background: '#15B371',
      padding: '12%'
    }

    return (
      <div >
        <div style={header}>
        <Flex 
          p={4}
          align='center'
          justify='center'
          m={1}
          w={1}
          style={flexStyle}>
          <Box w={1} p={1} align='center'>
          <Card elevation={Elevation.TWO}>
          <Card interactive={false} elevation={Elevation.ZERO} style={financing}>
              <p><strong>Financing</strong></p>
              <p>
              The process for requesting financing support entails the following 
              steps. Further details are available by clicking on each step.

              </p>
          </Card>
            <Panel heading="1. Concept Note"/>
            <Panel heading="2. Concept Note Appraisal"/>
            <Panel heading="3. Prefeasibily Study and draft Business Plan"/>
            <Panel heading="4. Application for Grant"/>
            <Panel heading="5. Preliminary Evaluation of Grant Application"/>
            <Panel heading="6. Feasibility Report and Business Plan"/>
            <Panel heading="7. Final Evaluation of Grant Application"/>
            <Panel heading="8. Disbursement"/>
          </Card>
         
          </Box>
          
          
          </Flex>
        </div>
      </div>
    );
  }
}

export default Financing;
