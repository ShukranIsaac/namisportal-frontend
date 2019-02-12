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
        district: null,
        transformers: null,
    };
  }

  componentDidMount() {

    this.props.fetchFilters();

  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // if state changed
  //   if(prevState !== nextProps) {
  //     console.log(nextProps)
  //     console.log(prevState)
  //     // return { distr_lines: }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {

      const { district } = this.props;
      // Check if an update to trigger a component re-render occured
      if(prevState !== this.state && (!this.state.district 
        || this.state.district || (this.state.district._id !== district._id))) {
        
        // if this.props.district not null
        // empty props
        // if(this.props.district !== null && this.props.district !== undefined) {
        //   this.props.emptyProps();
        // }

        // ES6 destructure different objects from state
        const { district_name, region, regionDefault, districtDefault } = this.state;
        
        // ES6 destructure different objects and functions from props
        const {
            fetchMeters,
            fetchRegion,
            fetchDistrict,
            fetchMarepCenters,
            fetchDistributionLines,
            fetchTransformers,
        } = this.props;
        
        /**
         * Fetch region and all its properties: if region name is defined and not null and not equal
         * to default value
         * 
         */
        if (region !== undefined && region !== null 
          && region.trim() !== '' && region !== regionDefault) {

            const { gis_filters } = this.props;
            // filter the region name which was selected and 
            // call api using the _id
            const region_object = gis_filters.filter(({ properties, _id }) => {

              // this.props.properties.name equals region name
              // from the ui then return region object else return null
              if(properties.name === region) {

                return _id;
              }

              return null;

            });

            if(region_object !== undefined && region_object !== null 
              && region_object.length === 1) {

                fetchRegion(region_object[0]._id);

            }

        }

        /**
         * Fetch district and all its properties: if district is defined and not null and not equal
         * to default value and does not have trailing spaces.
         * 
         */
        if (district_name !== undefined && district_name !== null 
          && district_name.trim() !== '' && district_name !== districtDefault) {
            
            const { district } = this.props;
            
            fetchDistrict(district_name);
            // console.log(this.state.district);
            Object.assign(this.state, { district });
            // console.log(this.state.district);

            if (this.state.ground_transformers) {
              fetchTransformers(district._id);

              Object.assign(this.state, { transformers: this.props.transformers });
            }
            
        }

        /**
         * Fetch meters and all its properties: if region or district name is defined and not null and not equal
         * to default values
         * 
         */
        if (this.state.meters_checked) {

            if (district_name !== undefined && district_name !== null
              && district_name.trim() !== '' && district_name !== districtDefault) {

                const { district } = this.props;

                fetchMeters(district._id);

            } else if (region !== undefined && region !== null 
              && region.trim() !== ''&& region !== regionDefault) {

                const { region } = this.props;

                fetchMeters(region._id);

            } else {

            }

        }

        /**
         * Fetch marep centers and all its properties: if district name is defined and not null and not equal
         * to default value
         * 
         */
        if (this.state.marep_center) {
            
            if (district_name !== undefined && district_name !== null 
              && district_name.trim() !== '' && district_name !== districtDefault) {
                
                const { district: { _id }} = this.props;

                fetchMarepCenters(_id);

            }

        }

        /**
         * Fetch distribution lines and all its properties: 
         * if district name is defined and not null and not equal to default value
         * 
         */
        if (this.state.distribution_lines) {

            if (district_name !== undefined && district_name !== null 
              && district_name.trim() !== '' && district_name !== districtDefault) {

                const { district } = this.props;

                fetchDistributionLines(district._id);

            }
        }

        /**
         * Fetch transformers and all its properties: 
         * if district name is defined and not null and not equal to default value
         * 
         */
        // console.log(this.state)
        if (this.state.ground_transformers || this.state.up_transformers) {
          
          if (district_name !== undefined && district_name !== null 
            &&district_name.trim() !== '' && district_name !== districtDefault) {
              // console.log(this.state)
              const { district } = this.props;
              
              fetchTransformers(district._id);

              Object.assign(this.state, { transformers: this.props.transformers });

          }
        }
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

    const { 
      classes, 
      gis_filters, 
      district,
    } = this.props;
    
    // const { isLoading } = this.state;
    // console.log(this.state);

    return (
      <Fragment>
        <div className={classes.root}>

          <main>
            <GridSideBar
                {...this.state} onChange={this.handleChange}
                onChecked={this.handleChecked} gis_filters={gis_filters}
            />
          </main>
          <main style={{maxWidth: '100%'}}>
            <MinGridMap
                {...this.state}
                // {...this.props}
                onChange={this.handleChange}
                onChecked={this.handleChecked}
                onPlaceSearch={this.handlePlaceSearch}
                r_polygons={this.props.region}
                d_polygons={ district.polygons }
                centroids={ district.centroids }
                m_centers={this.props.m_centers}
                transformers={this.state.transformers}
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
