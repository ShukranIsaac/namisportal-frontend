import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import LicensingProfile from './LicensingProfile';
import LicensingSidebar from './LicensingSidebar';

import * as LicensingAction from '../../actions/index';

class Licensing extends Component {

  constructor() {
    super();
    this.state = {}
  }

  handleChange = name => event => {

    this.setState({ [name]: event.target.value });

  };

  componentDidMount() {

    this.props.fetchLicencingFilters();

  }

  render(){
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <LicensingSidebar onChange={ this.handleChange } {...this.props} {...this.state}/>
          <LicensingProfile onChange={ this.handleChange } {...this.props} {...this.state}/>
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
  }
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
