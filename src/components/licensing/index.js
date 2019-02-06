import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import LicensingProfile from './licensing.profile';
import LicensingSidebar from './licensing.sidebar';

import * as LicensingAction from '../../actions/index';

import './licensing.css'


/**
 * Licencing categories with each with different steps
 * 
 */
const steps = [
  {
    "type": "Generating",
    "steps": []
  },
  {
    "type": "Distribution",
    "steps": []
  },
  {
    "type": "Licensing",
    "steps": []
  },
];

/**
 * Index file to render licencing component
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class Licensing extends Component {

  constructor() {
    super();
    this.state = {
        steps: steps,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {

    this.props.fetchLicencingFilters();

  }

  render(){

    return (
      <>
        <div className = "row page-content">
          <div className = "col-sm-3">
            <LicensingSidebar onChange={ this.handleChange } {...this.props} {...this.state}/>
          </div>
          <div className = "col-sm-9 licence-data">
            <LicensingProfile onChange={ this.handleChange } {...this.props} {...this.state}/>
          </div>
        </div>

      </>
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
        filters: state.l_filters.filters,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchLicencingFilters: () => { dispatch(LicensingAction.fetchLicencingFilters()) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Licensing));
