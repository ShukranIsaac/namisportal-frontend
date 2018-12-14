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
    this.state = {
      coordinates: [],
    };
  }

  componentDidMount() {

    this.props.fetchFilters();

  }

  componentDidUpdate() {

      const { district, region } = this.state;

      const { fetchRegion, fetchDistrict, fetchPolygonCentroid } = this.props;

      if (district !== undefined && district !== null) {

          fetchDistrict(district);

          fetchPolygonCentroid();

      }

      if (region !== undefined && region !== null) {

          fetchRegion(region);

      }

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

    const { classes, gis_filters } = this.props;

    return (
      <div className={classes.root}>

        <GridSideBar
            {...this.state}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            gis_filters={gis_filters}
        />
        <MinGridMap
            {...this.state}
            {...this.props}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            onPlaceSearch={this.handlePlaceSearch}
            r_coordinates={this.props.region}
            d_coordinates={this.props.district}
            centroids={this.props.centroids}
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
        region: state.region.region,
        gis_filters: state.gis_filters.gis_filters,
        district: state.district.district,
        centroids: state.centroids.centroids,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district))},
        fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        fetchPolygonCentroid: () => { dispatch(GisAction.fetchPolygonCentroids()) },
        fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
