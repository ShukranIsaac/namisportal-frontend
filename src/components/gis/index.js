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

  }

  componentDidMount() {

    this.props.fetchFilters();

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState !== this.state) {
      
      this.getRegion();

      this.getDistrict();
      
      this.marepCenters();

      this.meters();

      this.transformers();

      this.distributionLines();

    }

  }

  handleChange = (event) => {
    
    this.setState({ [event.target.name]: event.target.value });

  }

  handleRegionChange = (event) => {
    
    this.setState({ region: event.target.value }, () => {
      
      // fetch region from api
      this.getRegion();

    });

  }

  /**
   * check if any filter checkboxes are set to true, if yes clear all and proceed
   * 
   */
  clearFilters = ({
    ground_transformers, 
    up_transformers,
    marep_center, 
    distribution_lines
  }) => {
    
    // check if one of these is not defined otherwise proceed
    if(ground_transformers !== undefined || up_transformers !== undefined
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

    }

  }

  handleDistrictChange = (event) => {

    this.setState({ district_name: event.target.value }, () => {

      // fetch district from api
      this.getDistrict();

      // clear filters is any or all are true
      this.clearFilters(this.state);

    });

  }

  /**
   * Check if district name is defined and not null and not equal to default value, 
   * and does not have any trailing spaces. Fetch district and all its properties. 
   * 
   */
  getDistrict = () => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;

    if (district_name !== undefined && district_name !== null && district_name.trim() !== '' && district_name !== districtDefault) {
        
        const { fetchDistrict } = this.props;
        // fetch district
        fetchDistrict(district_name);

    }

  }

  /**
   * Check if region name is defined and not null and not equal to default value.
   * Filter the region which was selected and fetch region and all its properties 
   * from the api using the filtered object id.
   * 
   */
  getRegion = () => {
    // ES6 destructure different objects from state
    const { region, regionDefault } = this.state;

    if (region !== undefined && region !== null && region.trim() !== '' && region !== regionDefault) {

      const { gis_filters, fetchRegion } = this.props;
      // filter the region name which was selected and call api using the _id
      const region_object = gis_filters.filter(({ properties, _id }) => {

        // this.props.properties.name equals region name
        // from the ui then return region object else return null
        if(properties.name === region) {

          return _id;
        }

        return null;

      });
      // call api
      if(region_object !== undefined && region_object !== null && region_object.length === 1) {

        fetchRegion(region_object[0]._id);

      }

    }

  }

  /**
   * Fetch marep centers and all its properties: if district name 
   * is defined and not null and not equal to default value
   * 
   */
  marepCenters = () => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;

    if (this.state.marep_center) {
        
      if (district_name !== undefined && district_name !== null && district_name.trim() !== '' && district_name !== districtDefault) {
          
          const { district: { _id }, fetchMarepCenters } = this.props;
          // fetch marep centers
          fetchMarepCenters(_id);

      }

    }

  }

  /**
   * Check if state.ground_transformers or state.up_transformers are set to true.
   * Check if district_name is defined, and not null, and not equal to default value.
   * And finally fetch transformers for this district.
   * 
   */
  transformers = () => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;
    
    if (this.state.ground_transformers || this.state.up_transformers) {
          
      if (district_name !== undefined && district_name !== null &&district_name.trim() !== '' && district_name !== districtDefault) {
          
          const { district, fetchTransformers } = this.props;
          
          fetchTransformers(district._id);

      }

    }

  }

  /**
   * Fetch distribution lines and all its properties: 
   * if district name is defined and not null and not equal to default value
   * 
   */
  distributionLines = () => {
    // ES6 destructure different objects from state
    const { district_name, districtDefault } = this.state;

    if (this.state.distribution_lines) {

      if (district_name !== undefined && district_name !== null && district_name.trim() !== '' && district_name !== districtDefault) {

          const { district, fetchDistributionLines } = this.props;
          // fetch distribution lines
          fetchDistributionLines(district._id);

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

  handleChecked = (event) => {

    switch (event.target.name) {

      case 'marep_center':
        console.log(event.target.checked)
        this.myState(event);
        this.marepCenters();
        
        break;
    
      case 'ground_transformers':

        this.myState(event);
        this.transformers();

        break;

      case 'distribution_lines':
    
        this.myState(event);
        this.distributionLines();

        break;

      default:

        break;
    }

  }

  // set state
  myState = (e) => {

    Object.assign(this.state, { [e.target.name]: e.target.checked });

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePlaceSearch = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  render(){

    const { classes, gis_filters, district } = this.props;
    
    // const { isLoading } = this.state;
    // console.log(this.state);

    return (
      <Fragment>
        <div className={classes.root}>

          <main>
            <GridSideBar
                {...this.state} 
                onChange={this.handleChange}
                regionChanged={this.handleRegionChange}
                districtChanged={this.handleDistrictChange}
                onChecked={this.handleChecked}
                // clearFilters={this.clearFilters} 
                gis_filters={gis_filters}
            />
          </main>
          <main style={{maxWidth: '100%'}}>
            <MinGridMap
                {...this.state}
                onChange={this.handleChange}
                onChecked={this.handleChecked}
                onPlaceSearch={this.handlePlaceSearch}
                clearFilters={this.clearFilters} 
                r_polygons={this.props.region}
                d_polygons={ district.polygons }
                centroids={ district.centroids }
                m_centers={this.props.m_centers}
                transformers={this.props.transformers}
                meters={this.state.meters_checked ? this.props.meters : null}
                polyline={this.props.distr_lines}
            />
          </main>

        </div>
      </Fragment>
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
        district: state.district.district,
        meters: state.meters.meters,
        distr_lines: state.lines.lines,
        m_centers: state.m_centers.coordinates,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading,
        transformers: state.transformers.transformers,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district))},
        emptyProps: () => { dispatch(GisAction.emptyProps()) },
        fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
        fetchTransformers: (district_id) => { dispatch(GisAction.fetchTransformers(district_id)) },
        fetchDistributionLines: (name) => { dispatch(GisAction.fetchDistributionLines(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
