import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './GridGoogleMap';
import GridSideBar from './GridSideBar';

import {
  fetchRegions,
  fetchRegion,
  fetchDistrict,
  fetchMarepCenters,
  fetchPolygonCentroids } from '../../actions/index';

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
        fetchRegions: () => {
          dispatch(fetchRegions())
        },
        fetchRegion: (region) => {
          dispatch(fetchRegion(region))
        },
        fetchDistrict: (district) => {
          dispatch(fetchDistrict(district))
        },
        fetchMarepCenters: (name) => {
          dispatch(fetchMarepCenters(name))
        },
        fetchPolygonCentroid: () => {
          dispatch(fetchPolygonCentroids())
        }
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
