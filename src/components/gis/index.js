import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './grid.google.map';
import GridSideBar from './grid.sidebar';

import * as GisAction from '../../actions/index';

import './grid.css';

/**
 * Renders Client GIS component
 * 
 * @author Isaac S. MWakabira
 * 
 */
class GIS extends Component {

  constructor() {
    super();
    this.state = {
        regionChanged: false,
        regionDefault: "--Select region--",
        districtDefault: "--Select district--"
    };
  }

  componentDidMount() {

    this.props.fetchFilters();

  }

  componentDidUpdate() {

      // ES6 destructure different objects from state
      const { district, region, regionDefault, districtDefault } = this.state;

      // ES6 destructure different objects and functions from props
      const {
          fetchMeters,
          fetchRegion,
          fetchDistrict,
          fetchPolygonCentroid,
          fetchMarepCenters,
          fetchDistributionLines 
      } = this.props;

      /**
       * Fetch district and all its properties: if district is defined and not null and not equal
       * to default value and does not have trailing spaces.
       * 
       */
      if (district !== undefined && district !== null 
        && district.trim() !== '' && district !== districtDefault) {

          fetchDistrict(district);

          fetchPolygonCentroid();

      }
      
      /**
       * Fetch region and all its properties: if region name is defined and not null and not equal
       * to default value
       * 
       */
      if (region !== undefined && region !== null 
        && region.trim() !== '' && region !== regionDefault) {

          fetchRegion(region);

      }

      /**
       * Fetch meters and all its properties: if region or district name is defined and not null and not equal
       * to default values
       * 
       */
      if (this.state.meters_checked) {

          if (district !== undefined && district !== null
            && district.trim() !== '' && district !== districtDefault) {

              fetchMeters(district);

          } else if (region !== undefined && region !== null 
            && region.trim() !== ''&& region !== regionDefault) {

              fetchMeters(region);

          } else {

          }

      }

      /**
       * Fetch marep centers and all its properties: if district name is defined and not null and not equal
       * to default value
       * 
       */
      if (this.state.marep_center) {

          if (district !== undefined && district !== null 
            && district.trim() !== '' && district !== districtDefault) {

              fetchMarepCenters(district);

          }

      }

      /**
       * Fetch distribution lines and all its properties: 
       * if district name is defined and not null and not equal to default value
       * 
       */
      if (this.state.distribution_lines) {

          if (district !== undefined && district !== null 
            && district.trim() !== '' && district !== districtDefault) {

              fetchDistributionLines(district);

          }
      }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      regionChanged: event.target.name === 'region' ? true : false
    });
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
      <>
        <div className={classes.root}>

          <GridSideBar
              {...this.state} onChange={this.handleChange}
              onChecked={this.handleChecked} gis_filters={gis_filters}
          />

          <MinGridMap
              {...this.state}
              onChange={this.handleChange}
              onChecked={this.handleChecked}
              onPlaceSearch={this.handlePlaceSearch}
              r_coordinates={this.props.region}
              d_coordinates={this.props.district}
              centroids={this.props.centroids}
              meters={this.state.meters_checked ? this.props.meters : null}
              m_centers={this.props.m_centers}
              polyline={this.props.distr_lines}
          />

        </div>
      </>
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
        meters: state.meters.meters,
        distr_lines: state.lines.lines,
        centroids: state.centroids.centroids,
        m_centers: state.m_centers.coordinates,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading,
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
        fetchDistributionLines: (name) => { dispatch(GisAction.fetchDistributionLines(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
