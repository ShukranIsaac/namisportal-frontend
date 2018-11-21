import React, { Component } from 'react';
import { Tab, Tabs } from "@blueprintjs/core";
import Footer from '../footer';
import Tarrifs from './Tarrifs';
import { Flex, Box } from 'reflexbox'
import './library.css'
import Toolkits from './Toolkits';
import Financing from './Financing';
import PoliciesStratigies from './PoliciesStratigies';
import LegalRegFrameworks from './LegalRegFrameworks';
import ResourcePlan from './ResourcePlan';

class Library extends Component {
  constructor(){
    super()
    this.state = {
      animate: true,
      navbarTabId: "Tarrifs",
    }
    this.handleNavBarChange = this.handleNavBarChange.bind(this);
  }

  render(){
    const containerStyle = {
      width: '80%',
      margin: '0 auto',
      background: '#ffffff'
    }


    let { navbarTabId } = this.state;
    return (
      <>
        <Flex 
          p={4} 
          align='center' 
          justify='center'
          m={1}
          w={1}>
          <Box w={1} p={1}>
            <div style={containerStyle} align='center'>
              <Tabs style={{justifyContent: 'center'}} className="test" id="TabsExample" selectedTabId={navbarTabId} onChange={ this.handleNavBarChange }>
                  <Tab id="Tarrifs" title="Tarrifs" panel={<Tarrifs/>}/>
                  <Tab id="Financing" title="Financing" panel={<Financing/>}/>
                  <Tab id="Policies-Stratigy" title="Policies and Strategies" panel={<PoliciesStratigies/>}/>
                  <Tab id="Toolkit" title="Deployment toolkit" panel={<Toolkits/>} />
                  <Tab id="Legal-Regulatory-Frameworks" title="Legal and Regulatory Frameworks" panel={<LegalRegFrameworks/>}/>
                  <Tab id="Resource-Plan" title="Resource Plan" panel={<ResourcePlan/>}/>
              </Tabs>

            
            </div>
          </Box>

          </Flex>
        
        <Footer/>
      </>
      
     
    );
  }

  handleNavBarChange(navbarTabId){
    this.setState({navbarTabId});
  }
}

export default Library;
