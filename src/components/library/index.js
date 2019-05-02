import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Tarrifs from './Tarrifs';
import './library.css'
import Toolkits from './Toolkits';
import Financing from './Financing';
import PoliciesStratigies from './PoliciesStratigies';
import LegalRegFrameworks from './LegalRegFrameworks';
import ResourcePlan from './ResourcePlan';
import ParticlesComponent from '../user/particles';

import Document from './Document';

import * as LibraryAction from '../../actions/index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Library extends Component {

  state = {
    value: "tarrifs"
  };

  componentDidMount(){

    this.props.fetchLibrary(this.state.value);

  }

  handleChange = (event, value) => { 
    this.setState({ value });
    this.props.fetchLibrary(value);
  };

  renderDocuments(docs){

    return docs && docs.map(({name, path, summary}, key) => {

        return <Document key={key} name={name} path={path} summary={summary}/>

    });

  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <div className='landing-info'>

        <ParticlesComponent />
        
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
                      <Tab label="Financing" value='financing'/>
                      <Tab label="Policies and Strategies" value='policy_strategy'/>
                      <Tab label="Deployment Toolkit" value='toolkit'/>
                      <Tab label="Legal and Regulatory Frameworks" value='legal_regulatory_frameworks'/>
                      <Tab label="Resource Plan" value='resource_plan'/>
                    </Tabs>
                  </AppBar>

                  {value === 'tarrifs' && <Tarrifs {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'financing' && <Financing {...this.props} renderDocuments={this.renderDocuments}/>}
                  {value === 'policy_strategy' && <PoliciesStratigies {...this.props} renderDocuments={this.renderDocuments}/>}
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
    general: state.general.general,
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

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));