import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './GridGoogleMap';
import GridSideBar from './GridSideBar';

import * as GisAction from '../../actions/index';

import './grid.css';

class GIS extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

    this.props.fetchRegions();

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChecked = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePlaceSearch = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  render(){

    const { classes, regions } = this.props;

    return (
      <div className={classes.root}>

        <GridSideBar
            {...this.state}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            regions={regions}
        />
        <MinGridMap
            {...this.state}
            {...this.props}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            onPlaceSearch={this.handlePlaceSearch}
        />

      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    width: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

GIS.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return {
        regions: state.regions.regions,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchRegions: () => { dispatch(GisAction.fetchRegions()) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district))},
        fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        fetchPolygonCentroid: () => { dispatch(GisAction.fetchPolygonCentroids()) },
        fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
