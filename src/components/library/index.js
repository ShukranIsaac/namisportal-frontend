import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLibrary } from '../../actions/index';
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

  componentWillMount(){
    this.props.fetchLibrary()
  }

  render(){
    const { library } = this.props;

    const flexStyle = {
      margin: 'auto',
      background: '#15B371',
      padding: '12%'
    }

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
          <Tabs style={{justifyContent: 'center'}} className="test" id="TabsExample" selectedTabId='Tarrifs'>
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
  library: state.library.library
})

export default connect(mapStateToProps, { fetchLibrary })(Library);
