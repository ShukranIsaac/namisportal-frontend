import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchLibrary } from '../../actions/library'
import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
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
      navbarTabId: "Tarrifs"
    }
    this.handleNavBarChange = this.handleNavBarChange.bind(this);
  }

  componentWillMount(){
    console.log(this.props.fetchLibrary())
  }
  
  componentDidMount() {
    const height = document.getElementById('footer').clientHeight;
    this.setState({height})
  }

  render(){
    const flexStyle = {
      margin: 'auto',
      background: '#15B371',
      padding: '12%'
    }

    

    let { navbarTabId } = this.state;
    console.log(this.props.library)
    return (
      <div>
        <Flex 
          p={4} 
          align='center' 
          justify='center'
          m={1}
          w={1}
          style={flexStyle}
          >
          <Box w={1} p={1}>
          <Card elevation={Elevation.TWO}>
          <Tabs style={{justifyContent: 'center'}} className="test" id="TabsExample" selectedTabId={navbarTabId} onChange={ this.handleNavBarChange }>
                  <Tab id="Tarrifs" title="Tarrifs" panel={<Tarrifs/>}/>
                  <Tab id="Financing" title="Financing" panel={<Financing/>}/>
                  <Tab id="Policies-Stratigy" title="Policies and Strategies" panel={<PoliciesStratigies/>}/>
                  <Tab id="Toolkit" title="Deployment toolkit" panel={<Toolkits/>} />
                  <Tab id="Legal-Regulatory-Frameworks" title="Legal and Regulatory Frameworks" panel={<LegalRegFrameworks/>}/>
                  <Tab id="Resource-Plan" title="Resource Plan" panel={<ResourcePlan/>}/>
              </Tabs>
          </Card>
          </Box>

          </Flex>
      </div>
      
     
    );
  }

  handleNavBarChange(navbarTabId){
    this.setState({navbarTabId});
  }
}

const mapStateToProps = state => ({
  library: state.library
})

export default connect(null, { fetchLibrary })(Library);
