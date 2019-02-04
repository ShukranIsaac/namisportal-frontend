import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import Tarrifs from './Tarrifs';
import './library.css'
import Toolkits from './Toolkits';
import Financing from './Financing';
import PoliciesStratigies from './PoliciesStratigies';
import LegalRegFrameworks from './LegalRegFrameworks';
import ResourcePlan from './ResourcePlan';

import Document from './Document';

import * as LibraryAction from '../../actions/index';
/*
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
      padding: '3%'
    }

    return (
      <div className='landing-info'>
        <Container>
          <Row>
            <Col sm='12' md='12' lg={{ size: 10, offset: 1 }}> 
              <Card elevation={Elevation.TWO}>
                <Tabs style={{justifyContent: 'center'}} className="test" id="TabsExample" selectedTabId={this.state.navbarTabId} onChange={this.handleNavBarChange}>
                  <Tab id="tarrifs" title="Tarrifs" panel={<Tarrifs {...this.props} renderDocuments={this.renderDocuments}/>}/>
                  <Tab id="financing" title="Financing" panel={<Financing {...this.props} renderDocuments={this.renderDocuments}/>}/>
                  <Tab id="policies_stratigy" title="Policies and Strategies" panel={<PoliciesStratigies {...this.props} renderDocuments={this.renderDocuments}/>}/>
                  <Tab id="toolkit" title="Deployment toolkit" panel={<Toolkits {...this.props} renderDocuments={this.renderDocuments}/>} />
                  <Tab id="legal_regulatory_frameworks" title="Legal and Regulatory Frameworks" panel={<LegalRegFrameworks {...this.props} renderDocuments={this.renderDocuments}/>}/>
                  <Tab id="resource_plan" title="Resource Plan" panel={<ResourcePlan {...this.props} renderDocuments={this.renderDocuments}/>}/>
                </Tabs>
              </Card>
              </Col>
          </Row>
        </Container>
      </div>

    );
  }

  handleNavBarChange = (navbarTabId) => {

    this.setState({navbarTabId});

    // download library on state onChange
    this.props.fetchLibrary(navbarTabId);

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
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
*/

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Library extends React.Component {
  state = {
    value: "tarrifs"
  };

  componentDidMount(){

    this.props.fetchLibrary(this.state.value);

  }
  handleChange = (event, value) => {
    console.log(value)
    this.setState({ value });
    this.props.fetchLibrary(value);
  };

  renderDocuments(docs){

    return docs.map(({name, path, summary}, key) => {

        return <Document key={key} name={name} path={path} summary={summary}/>

    });

}
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className='landing-info'>
        <Container>
          <Row>
          <div className="card">
              <div className="card-body">
                <div className={classes.root}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollable={true}
                      scrollButtons="auto"
                    > 
                      <Tab label="Tarrifs" value='tarrifs'/>
                      <Tab label="Finansing" value='financing'/>
                      <Tab label="Policies and Strategies" value='policies_stratigy'/>
                      <Tab label="Deployment Toolkit" value='toolkit'/>
                      <Tab label="Legal and Regulatory Frameworks" value='legal_regulatory_frameworks'/>
                      <Tab label="Resource Plan" value='resource_plan'/>
                    </Tabs>
                  </AppBar>
                  {value === 'tarrifs' && <Tarrifs {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'financing' && <Financing {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'policies_stratigy' && <PoliciesStratigies {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'toolkit' && <Toolkits {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'legal_regulatory_frameworks' && <LegalRegFrameworks {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'resource_plan' && <ResourcePlan {...this.props} renderDocuments={this.renderDocuments}/>}
                </div>
              </div>
            </div>
          
          </Row>
        </Container>
      </div>
      
    );
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
  }

}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));