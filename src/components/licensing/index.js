import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row } from 'reactstrap'

import LicensingProfile from './licensing.profile';
import * as CMSAction from '../../actions/cms.action';
import ParticlesComponent from '../user/particles';
import './licensing.css'

/**
 * Index file to render licencing component
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class Licensing extends Component {

  constructor() {
    super();
    this.state = {}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {

    this.props.fetchSubcategory('Licensing')

  }

  render(){

    return (
      <div className = "page-content">

        <ParticlesComponent />
        
        <Container>
          <Row>
            <LicensingProfile onChange={ this.handleChange } {...this.props} {...this.state}/>
          </Row>
        </Container>
        
      </div>
    );
    
  }

}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  button: {
    width: '100%',
    textAlign: 'left',
    borderRadius: '0',
    background: '#BFCCD6',
    fontSize: '1.2em'
  },
});

const mapStateToProps = (state) => {

  return {
    general: state.general.general,
    maincategory: state.cms.maincategory,
  };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchSubcategory: (name) => { dispatch(CMSAction.fetchCategory(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Licensing));
