import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core'
import { Container, Col, Row } from 'reactstrap'
import { Flex, Box } from 'reflexbox';

import Panel from './panel';

/**
 * Renders financing component
 * 
 * @author Paul Sembereka (Pablo)
 * 
 */
class Financing extends Component {

  render(){

    // const containerStyle = {
    //   width: '80%',
    //   margin: '0 auto',
    // }

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
      <div className = "page-content">
        <Container>
          <Row>
          <div>
            <Card elevation={Elevation.TWO}>
              <Card interactive={false} elevation={Elevation.ZERO} style={financing}>
                  <p style={header}><strong>Financing</strong></p>
                  <p>
                    Mini-Grid development in Malawi has so far been supported financially by Donors.
                    Though Rural electrification act of 2004 provides that the Rural electrification Levy
                    which is part of Rural Electrification Fund can fund the Rural Electrification projects
                    having IRR of up to 6%, there are no clear guidelines for accessing this fund so far.Once
                    the guidelines are laid out properly by the government, all the necessary steps for
                    accessing this fund for Minigrid and other rural electrification projects, shall be uploaded
                    on this portal. Information Portal.
                  </p>
                  <p>
                    Meanwhile, minigrid developers can grab any opportunity for minigrid development
                    financing that may arise from the donor community. Any such opportunity that will
                    come to the knowledge of government shall be published on this portal.
                  </p>
              </Card>
            </Card>
          </div>
          </Row>
        </Container>
        
      </div>
        
    );
  }
}

export default Financing;
