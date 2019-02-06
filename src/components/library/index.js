import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";

import Tarrifs from './Tarrifs';
import { Flex, Box } from 'reflexbox'
import './library.css';

import Toolkits from './Toolkits';
import Financing from './Financing';
import PoliciesStratigies from './PoliciesStratigies';
import LegalRegFrameworks from './LegalRegFrameworks';
import ResourcePlan from './ResourcePlan';

import Document from './Document';

import * as LibraryAction from '../../actions/index';

/**
 * Renders library component and all its subcomponents or sub-categories
 * 
 * @author Paul Sembereka
 * @author Isaac S. Mwakabira
 * 
 */
class Library extends Component {

  constructor(){
    super()
    this.state = {
      navbarTabId: "tarrifs"
    }

    this.handleNavBarChange = this.handleNavBarChange.bind(this);
    this.renderDocuments = this.renderDocuments.bind(this);
  }

  componentDidMount(){

    this.props.fetchLibrary(this.state.navbarTabId);
    // this.props.libraryCategory('Library');

  }

  renderDocuments(docs){

      return docs.map(({name, path, summary}, key) => {

          return <Document key={key} name={name} path={path} summary={summary}/>

      });

  }

  render(){

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
              <Tabs style={{justifyContent: 'center'}} className="test" id="TabsExample" selectedTabId={this.state.navbarTabId} onChange={this.handleNavBarChange}>
                <Tab id="tarrifs" title="Tarrifs" panel={<Tarrifs {...this.props} renderDocuments={this.renderDocuments}/>}/>
                <Tab id="financing" title="Financing" panel={<Financing {...this.props} renderDocuments={this.renderDocuments}/>}/>
                <Tab id="policy_strategy" title="Policies and Strategies" panel={<PoliciesStratigies {...this.props} renderDocuments={this.renderDocuments}/>}/>
                <Tab id="toolkit" title="Deployment toolkit" panel={<Toolkits {...this.props} renderDocuments={this.renderDocuments}/>} />
                <Tab id="legal_regulatory_frameworks" title="Legal and Regulatory Frameworks" panel={<LegalRegFrameworks {...this.props} renderDocuments={this.renderDocuments}/>}/>
                <Tab id="resource_plan" title="Resource Plan" panel={<ResourcePlan {...this.props} renderDocuments={this.renderDocuments}/>}/>
              </Tabs>
            </Card>
          </Box>

          </Flex>
      </div>

    );
  }

  handleNavBarChange = (navbarTabId) => {

    this.setState({navbarTabId});

    // download library on state onChange
    // this.props.fetchLibrary(navbarTabId);

  }
}

const mapStateToProps = state => {

    return {
      library: state.library.library
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
      fetchLibrary: (name) => { dispatch(LibraryAction.fetchLibrary(name)) },
      libraryCategory: (name) => { dispatch(LibraryAction.fetchLibraryCategory(name)) },
      addSubCategory: (id,subcategory) => { 
        dispatch(LibraryAction.addSubCategory(id,subcategory)) 
      },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
