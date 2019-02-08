import React, { Component } from 'react';
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
        regionChanged: false,
        regionDefault: "--Select region--",
        districtDefault: "--Select district--",
    };
  }

  componentDidMount() {

    this.props.fetchFilters();

  }

  componentDidUpdate(prevProps, prevState) {

      // Check if an update to trigger a component re-render occured
      if(prevState !== this.state) {

        // ES6 destructure different objects from state
        const { district, region, regionDefault, districtDefault } = this.state;

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
         * Fetch district and all its properties: if district is defined and not null and not equal
         * to default value and does not have trailing spaces.
         * 
         */
        if (district !== undefined && district !== null 
          && district.trim() !== '' && district !== districtDefault) {

            fetchDistrict(district);

        }
        
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
         * Fetch meters and all its properties: if region or district name is defined and not null and not equal
         * to default values
         * 
         */
        if (this.state.meters_checked) {

            if (district !== undefined && district !== null
              && district.trim() !== '' && district !== districtDefault) {

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

            if (district !== undefined && district !== null 
              && district.trim() !== '' && district !== districtDefault) {
                
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

            if (district !== undefined && district !== null 
              && district.trim() !== '' && district !== districtDefault) {

                const { district } = this.props;
                
                fetchDistributionLines(district._id);

            }
        }

        /**
         * Fetch transformers and all its properties: 
         * if district name is defined and not null and not equal to default value
         * 
         */
        if (this.state.ground_transformers || this.state.up_transformers) {

          if (district !== undefined && district !== null 
            && district.trim() !== '' && district !== districtDefault) {

              const { district } = this.props;
              
              fetchTransformers(district._id);
              
          }
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

    const { 
      classes, 
      gis_filters, 
      district
    } = this.props;

    

    const { isLoading } = this.state;
    // console.log(this.props.m_centers);
    /**
     * Show progress loader if isLoading is true
     * 
     */
    if(isLoading !== undefined && isLoading !== null && isLoading) {

      return <div className="loader"></div>

    }

    return (
      <>
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
                onChange={this.handleChange}
                onChecked={this.handleChecked}
                onPlaceSearch={this.handlePlaceSearch}
                r_polygons={this.props.region}
                d_polygons={ district.polygons }
                centroids={ district.centroids }
                m_centers={this.props.m_centers}
                transformers={this.props.transformers}
                // meters={this.state.meters_checked ? this.props.meters : null}
                polyline={this.props.distr_lines}
            />
          </main>

          

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
        fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
        fetchTransformers: (district_id) => { dispatch(GisAction.fetchTransformers(district_id)) },
        fetchDistributionLines: (name) => { dispatch(GisAction.fetchDistributionLines(name)) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GIS));
