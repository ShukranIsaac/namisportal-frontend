import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker, Polygon, Polyline, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';
import PointMarker from './marker'

import './grid.css';
import { CustomGoogleMap } from './grid.custom.map';

/**
 * Main gis grid view
 * 
 * @author Isaac S. Mwakabira
 */
class MinGridMap extends Component {

  constructor() {
    super();
    this.state = {
      zoom: 7,
      newCenter: {
        lat: -13.2512, lng: 34.30154
      },
      show: false,
      h: 0
    };

    this.renderDistrictMarepCenters = this.renderDistrictMarepCenters.bind(this);
    this.renderDistrictPolygon = this.renderDistrictPolygon.bind(this);
    this.renderRegionPolygon = this.renderRegionPolygon.bind(this);
    this.getPolygonCentroid = this.getPolygonCentroid.bind(this);
    this.renderPolygon = this.renderPolygon.bind(this);
    this.renderRegionMeters = this.renderRegionMeters.bind(this);
    this.renderDistrictMeters = this.renderDistrictMeters.bind(this);
    this.renderPolyline = this.renderPolyline.bind(this);

  }
  componentDidMount(){
    const h = document.body.offsetHeight - document.querySelector('#giveHeaderHeight').offsetHeight;
    this.setState({h})
  }
  componentDidUpdate() {

    // check if props or state changed
    const { district } = this.props;
    
    // IF state.zoom equals 7, district equals to Likoma, then change zoom level to 12
    if(district !== undefined && district !== null && district  === 'Likoma') {

      Object.assign(this.state, { zoom: 12, district_name: district });

    } 
    
    // IF state.zoom equals 12, district not equals to Likoma, then change zoom level to 7
    if(district !== undefined && district !== null && district  !== 'Likoma') {

      Object.assign(this.state, { zoom: 7});

    }

  }



  inforClose = props => {
    if (this.state.show) {
      this.setState({
        activeMarker: null,
        show: false,
      });
    }
  };

  /**
   * Render district marep centers: making sure district, m_centers(coordinates)
   * and checkbox is set to true.
   * 
   * @param {Props} props
   * @returns {MarkerClusterer} markers
   */
  renderDistrictMarepCenters = ({district, marep_center, m_centers}) => {

    if (district !== null && district !== undefined && marep_center) {

      if (m_centers !== null && m_centers !== undefined && m_centers.length !== null) {
        
        return this.markerClusterer(m_centers);

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );
    }

  }

  /**
   * Renders any polyline
   * 
   * @param {Object} polyline
   * @param {String} district
   * @param {String} region
   * @param {Boolean} distribution_lines
   * @returns {Polyline} polyline
   */
  renderPolyline = ({polyline, district, region, distribution_lines}) => {

      if (distribution_lines && polyline !== null && polyline !== undefined) {

        return polyline.map((line, key) => {
          
          return (
            <Fragment key={line._id}>
              <Polyline
                path={line.geometry.coordinates[0]}
                geodesic={true}
                options={{
                  strokeColor: "blue",
                  strokeOpacity: 0.75,
                  strokeWeight: 2,
                  icons: [
                      {
                          offset: "0",
                          repeat: "20px"
                      }
                  ]
                }}
              />
            </Fragment>
          );

        });

      }

  }

  /**
   * Marker clusterer
   * 
   * @param {Object} clusters 
   * @returns {MarkerClusterer} markers
   */
  markerClusterer = (clusters) => {

    if (clusters !== null) {

        return (
          <Fragment>

            <MarkerClusterer>
              {
                clusters.map((point, key) => {
                  return (
                    <PointMarker point={point} title='Marep Center'/>
                  )

                })
              }
            </MarkerClusterer>

          </Fragment>
        );

    }

  }

  

  /**
   * Renders region meters
   * 
   * @param {String} region
   * @param {Object} meters
   * @returns markers
   */
  renderRegionMeters = ({region, meters, color}) => {

    if (region !== null && region !== undefined) {

      if (meters !== null && meters !== undefined) {

        return (
          <MarkerClusterer>

            {
              meters.centers.map((point, key) => {
                
                return <Marker position={point.coordinates} key={key} />

              })
            }

          </MarkerClusterer>
        );

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );

    }

  }

  /**
   * Renders district meters
   * 
   * @param {String} district
   * @param {Object} meters
   * @returns markers
   */
  renderDistrictMeters = ({district, meters, color}) => {

    if (district !== null && district !== undefined) {

      if (meters !== null && meters !== undefined) {

          return (
            <MarkerClusterer>

              {
                meters.centers.map((point, key) => {
                  
                  return <Marker position={point.coordinates} key={key} />

                })
              }

            </MarkerClusterer>
          );

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );

    }

  }

    /**
   * Renders district transformers
   * 
   * @param {String} district
   * @param {Object} transformers
   * @param {Boolean} ground_transformers
   * @param {Boolean} up_transformers
   * @returns markers
   */
  renderTransformers = ({
    district, transformers, 
    color, ground_transformers,
    up_transformers
  }) => {

    if (district !== null && district !== undefined) {

      if (transformers !== null && transformers !== undefined
        && (ground_transformers || up_transformers)) {
        
          return (
            
            <MarkerClusterer averageCenter>

              {
                transformers.map((transformer) => {

                  return (

                    <PointMarker key={transformer._id} point={transformer} title='Transformer'/>
                  )

                })
              }

            </MarkerClusterer>
          );

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );

    }

  }

  /**
   * Renders any polygon
   * 
   * @param coordinates
   * @param color
   * @param opacity
   * @returns polygon
   */
  renderPolygon = (polygons, color, opacity) => {

    if (polygons !== undefined && polygons !== null) {
      
      return polygons.map(({ geometry: { coordinates }, _id }) => {

        return (
          <Fragment key={_id}>
            <Polygon
              paths={coordinates}
              options={{
                fillOpacity: opacity,
                strokeColor: color,
                strokeOpacity: 1,
                strokeWeight: 1
              }}
            />
          </Fragment>
        );
  
      });

    } else {

      return <Polygon/>

    }

  }
  
  /**
   * Region polygon
   * 
   * @param {String} region
   * @param {Array} r_polygons
   * @returns renderPolygon
   */
  renderRegionPolygon = ({region, r_polygons: { polygons } }) => {

    if( region !== null && region !== undefined){

      return this.renderPolygon(polygons, "red", 0.3);

    }

  }

  /**
   * District polygon
   * 
   * @param {String} district
   * @param {Array} d_polygons
   * @returns renderPolygon
   */
  renderDistrictPolygon = ({ district, d_polygons }) => {

    if (district !== null && district !== undefined) {

      return this.renderPolygon(d_polygons, "yellow", 0.31);

    }

  }

  /**
   * Filter district given the condition true
   * 
   * @param {Array} districts
   * @param {String} district 
   * @returns {Object} o
   */
  filterDistrictsCentroids = (districts, district) => {

    return districts.filter((o) => {

      if (o.district === district) {
        return o;
      }

      return null;
    });

  }

  /**
   * Get polygon centroid(coordinates) i.e. district or region
   * 
   * @returns {Array} centroid
   */
  getPolygonCentroid = ({district, centroids}) => {

    if (district !== null && district !== undefined) {

      if (centroids !== undefined && centroids !== null) {

          return centroids;

      }

    } else {

      return this.state.newCenter;
    }

  }

  render() {

    const google = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places';
    const { h } = this.state
    return (
      <Fragment>
        <CustomGoogleMap
          googleMapURL={google} loadingElement={<div style={{ height: h, width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }} />}
          containerElement={<div id="map-canvas" style={{ width: '100%', marginLeft: 0 }} ></div>}
          mapElement={<div id="map" style={{ height: h }} />}
          onDistrictChanged={this.renderDistrictPolygon(this.props)}
          onRegionChanged={this.renderRegionPolygon(this.props)}
          onMarepCenter ={this.renderDistrictMarepCenters(this.props)}
          onDistrictMeters={this.renderDistrictMeters(this.props)}
          onRegionMeters={this.renderRegionMeters(this.props)}
          onTransformers={this.renderTransformers(this.props)}
          onCenterChanged= {this.getPolygonCentroid(this.props)}
          onPolyline={this.renderPolyline(this.props)}
          {...this.state}
        />
      </Fragment>
    );
  }
}

const styles = theme => ({
  content: {
    height: `100%`,
    width: `80%`,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 0,
    minWidth: 0, // So the Typography noWrap works
  },
});

MinGridMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContentWrapper(MinGridMap));
