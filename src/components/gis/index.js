import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './grid.google.map';
import GridSideBar from './grid.sidebar';

import * as GisAction from '../../actions/index';

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
        regionDefault: "--Select region--",
        districtDefault: "--Select district--",
    };

    this.clearFilters = this.clearFilters.bind(this);
    this.handlePlantTypeChange = this.handlePlantTypeChange.bind(this);
    this.handlePlantCapacityChange = this.handlePlantCapacityChange.bind(this);

  }

  componentDidMount() {

    // fetch gis filters
    this.props.fetchFilters();
    // fetch plant filters
    this.props.powerPlantFilters();

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.district._id)
    // console.log(this.props.district._id)
    if (prevProps !== undefined) {
      // console.log(this.props.marep_center)
      if (prevProps.district._id !== this.props.district._id) {
        // console.log(prevProps.district._id)
        // console.log(this.props.district._id)
        // fetch electrified by marep
        this.marepCenters(prevProps, this.props.district._id);
      } else {
        // console.log(prevState.district_name)
        // console.log(this.state.district_name)
        if (prevProps === this.props) {
          // console.log(prevProps.district._id)
          // console.log(this.props.district._id)
          this.marepCenters(prevProps, this.props.district._id);
        }
      }
    } else {
      // console.log(this.props.marep_center)
      if (prevProps !== this.props) {
        this.marepCenters(prevProps, this.props.district._id);
      }
    }

  }

  handleChange = (event) => {
    
    // const target = event.target;
    this.setState({ [event.target.name]: event.target.value });

  }

  /**
   * check if any filter checkboxes are set to true, if yes clear all and proceed
   * 
   */
  clearFilters = ({
    ground_transformers, 
    up_transformers,
    marep_center, 
    distribution_lines,
    eleven_kv_lines
  }) => {
    
    // check if one of these is not defined otherwise proceed
    if(ground_transformers !== undefined || up_transformers !== undefined   || eleven_kv_lines !== undefined
      || marep_center !== undefined || distribution_lines !== undefined) {

      if (ground_transformers) {
        Object.assign(this.state, { ground_transformers: false });
      } 
      
      if(up_transformers) {
        Object.assign(this.state, { up_transformers: false });
      } 
      
      if(marep_center) {
        Object.assign(this.state, { marep_center: false });
      } 
      
      if(distribution_lines) {
        Object.assign(this.state, { distribution_lines: false });
      }

      if(eleven_kv_lines) {
        Object.assign(this.state, { eleven_kv_lines: false });
      }

    }

  }

  /**
   * Event
   */
  handlePlantTypeChange = (event) => {

    this.setState({ [event.target.name]: event.target.value }, () => {

      // fetch power plants from api
      this.props.fetchPowerPlants(null, this.state.type);

    });

  }

  /**
   * Event
   */
  handlePlantCapacityChange = (event) => {

    this.setState({ [event.target.name]: event.target.value }, () => {

      // fetch plant plants from api
      this.props.fetchPowerPlants(this.state.capacity, null);
      
    });

  }

  /**
   * Fetch marep centers and all its properties: if district name 
   * is defined and not null and not equal to default value
   * 
   */
  marepCenters = (prevProps, distr_id) => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault, marep_center } = this.state;
    
    // if marep center checkbox is checked to true
    if (marep_center) {
      
      if (district_name !== undefined && district_name !== null
          && district_name.trim() !== '' && district_name !== districtDefault) {
          
          const { fetchMarepCenters } = this.props;

          // fetch marep centers for the given district
          fetchMarepCenters(distr_id);

      }

    }

  }

  /**
   * Check if state.ground_transformers or state.up_transformers are set to true.
   * Check if district_name is defined, and not null, and not equal to default value.
   * And finally fetch transformers for this district.
   * 
   */
  transformers = (position) => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;
    
    if (this.state.ground_transformers || this.state.up_transformers) {
          
      if (district_name !== undefined && district_name !== null 
          && district_name.trim() !== '' && district_name !== districtDefault) {
          
          const { district, fetchTransformers } = this.props;
          
          fetchTransformers(district._id, position);

      }

    }

  }

  /**
   * Fetch distribution lines and all its properties: 
   * if district name is defined and not null and not equal to default value
   * 
   */
  distributionLines = (type) => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;

    if (this.state.distribution_lines || this.state.eleven_kv_lines) {

      if (district_name !== undefined && district_name !== null && district_name.trim() !== '' && district_name !== districtDefault) {

          const { district, fetchDistributionLines } = this.props;
          // fetch distribution lines
          fetchDistributionLines(district._id, type);

      }

    }

  }

  /**
   * Fetch meters and all its properties: if region or district name is 
   * defined and not null and not equal to default values
   * 
   */
  meters = () => {
    // ES6 destructure different objects from state
    const { district_name, region, districtDefault, regionDefault } = this.state;

    if (this.state.meters_checked) {

      if (district_name !== undefined && district_name !== null
        && district_name.trim() !== '' && district_name !== districtDefault) {

          const { district, fetchMeters } = this.props;

          fetchMeters(district._id);

      } else if (region !== undefined && region !== null 
        && region.trim() !== ''&& region !== regionDefault) {

          const { region, fetchMeters } = this.props;

          fetchMeters(region._id);

      } else {

      }

    }

  }

  /**
   * Fetch power plants by the filters specified
   */
  powerPlants = (capacity, type) => {

    if(this.state.type || this.state.capacity) {

      const { fetchPowerPlants } = this.props;

      // call api
      fetchPowerPlants(capacity, type);

    }

  }

  handleChecked = (event) => {

    // console.log(event.target.checked);
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

    const { classes, gis_filters, power_plant_filters, general, marep_center } = this.props;
    
    const { meters_checked } = this.state;
    // console.log(this.state);

    if(general !== null) {

      const { general: { isLoading } } = this.props;
      // console.log(isLoading);
      return (
        <Fragment>
          <div className={classes.root}>
  
            <main>
              <GridSideBar
                  {...this.state}
                  // isLoading={isLoading}
                  onChange={this.handleChange}
                  regionChanged={this.handleRegionChange}
                  districtChanged={this.handleDistrictChange}
                  typeChanged={this.handlePlantTypeChange}
                  capacityChanged={this.handlePlantCapacityChange}
                  onChecked={this.handleChecked}
                  gis_filters={gis_filters}
                  power_plant_filters={power_plant_filters}
              />
            </main>
            <main style={{maxWidth: '100%'}}>
              <MinGridMap
                  {...this.state}
                  {...this.props}
                  isLoading={isLoading}
                  onChange={this.handleChange}
                  onChecked={this.handleChecked}
                  onPlaceSearch={this.handlePlaceSearch}
                  clearFilters={this.clearFilters} 
                  r_polygons={this.props.region}
                  d_polygons={ this.props.district.polygons }
                  centroids={ this.props.district.centroids }
                  m_centers={marep_center ? this.props.m_centers : null }
                  transformers={this.props.transformers}
                  meters={meters_checked ? this.props.meters : null}
                  polyline={this.props.distr_lines}
                  power_plants={this.props.power_plants}
              />
            </main>
  
          </div>
        </Fragment>
      );

    } else {

      return <Fragment />

    }

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
    display: 'grid',
    gridTemplateColumns: '20% 80%'
  },
  bar: {
    justifyContent: 'flex-start' ,
    backgroundColor: theme.palette.background.default
  },
  content: {
    justifyContent: 'flex-end'
  }
});

GIS.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return {
        region: state.region.region,
        gis_filters: state.gis_filters.gis_filters,
        power_plant_filters: state.gis_filters.power_plant_filters,
        power_plants: state.power_plants.power_plants,
        district: state.district.district,
        meters: state.meters.meters,
        distr_lines: state.lines.lines,
        errored: state.region.errored,
        general: state.general.general,
        m_centers: state.m_centers.coordinates,
        transformers: state.transformers.transformers,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        powerPlantFilters: () => { dispatch(GisAction.powerPlantsFilters()) },
        fetchPowerPlants: (capacity, type) => { dispatch(GisAction.powerPlants(capacity, type)) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district))},
        emptyProps: () => { dispatch(GisAction.emptyProps()) },
        fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
        fetchTransformers: (distr_id, position) => { dispatch(GisAction.fetchTransformers(distr_id, position)) },
        fetchDistributionLines: (district, type) => { dispatch(GisAction.fetchDistributionLines(district, type)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
