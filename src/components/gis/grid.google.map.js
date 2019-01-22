import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker, Polygon, Polyline, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';

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
      show: true,
    };

    this.renderDistrictMarepCenters = this.renderDistrictMarepCenters.bind(this);
    this.renderDistrictPolygon = this.renderDistrictPolygon.bind(this);
    this.renderRegionPolygon = this.renderRegionPolygon.bind(this);
    this.getPolygonCentroid = this.getPolygonCentroid.bind(this);
    this.renderPolygon = this.renderPolygon.bind(this);
    this.renderRegionMeters = this.renderRegionMeters.bind(this);
    this.renderDistrictMeters = this.renderDistrictMeters.bind(this);
    this.renderPolyline = this.renderPolyline.bind(this);
    this.showInforWindow = this.showInforWindow.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);

  }

  /**
   * handle UI click event
   */
  handleMarkerClick = ({ show }) => {

    if (show) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true} );
    }

  }

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

  renderPolyline = ({polyline, district, region, distribution_lines}) => {

      if (distribution_lines && polyline !== null && polyline !== undefined) {

        return polyline.map((line, key) => {

        return (
          <>
            <Polyline
              path={line.coordinates[0]}
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
          </>
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
                    <Marker 
                      position={point.geometry.coordinates} 
                      key={point._id}
                      onClick={ () => this.handleMarkerClick(this.state) }>

                      {
                        this.state.show && 
                        this.showInforWindow({ 
                          show: false,
                          information: 'Infowindow' 
                        })
                      }

                    </Marker>
                  )

                })
              }
            </MarkerClusterer>

          </Fragment>
        );

    }

  }

  /**
   * Marker Information window
   * 
   * @param {Boolean} show
   * @param {Object} information
   * @param {InfoWindow} window
   */
  showInforWindow = ({ show, information }) => {
    
    // Show inforwindow only if all the givwn conditions hold true
    if(information !== undefined && information !== null && show) {
    
      return (
        <InfoWindow>
          <div>Marker Information</div>
        </InfoWindow>
      )

    }

  }

  /**
   * Renders region meters
   * 
   * @param {String} region
   * @param {Object} meters
   * @returns markers
   */
  renderRegionMeters = ({region, meters}) => {

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
  renderDistrictMeters = ({district, meters}) => {

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
   * Renders any polygon
   * 
   * @param coordinates
   * @param color
   * @param opacity
   * @returns polygon
   */
  renderPolygon = (coordinates, color, opacity) => {

    return <>
      <Polygon
        paths={coordinates}
        options={{
          fillOpacity: opacity,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 1
        }}
      >
      </Polygon>
    </>;

  }
  
  /**
   * Region polygon
   * 
   * @param {String} region
   * @param {Array} r_coordinates
   * @returns renderPolygon
   */
  renderRegionPolygon = ({region, r_coordinates}) => {

    if( region !== null && region !== undefined){

      return this.renderPolygon(r_coordinates, "red", 0.3);

    }

  }

  /**
   * District polygon
   * 
   * @param {String} district
   * @param {Array} d_coordinates
   * @returns renderPolygon
   */
  renderDistrictPolygon = ({district, d_coordinates}) => {

    if (district !== null && district !== undefined) {

      return this.renderPolygon(d_coordinates, "yellow", 0.31);

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

      return;
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

          // let centroid = this.filterDistrictsCentroids(centroids, district).map(({coordinates}) => {

          //   return coordinates;

          // })

          return centroids;

      }

    } else {

      return this.state.newCenter;
    }

  }

  render() {

    const google = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places';

    return (
      <Fragment>
        <CustomGoogleMap
          googleMapURL={google} loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id="map-canvas" style={{ height: `800px` }} />}
          mapElement={<div id="map" style={{ height: `100%` }} />}
          onDistrictChanged={this.renderDistrictPolygon(this.props)}
          onRegionChanged={this.renderRegionPolygon(this.props)}
          onMarepCenter ={this.renderDistrictMarepCenters(this.props)}
          onDistrictMeters={this.renderDistrictMeters(this.props)}
          onRegionMeters={this.renderRegionMeters(this.props)}
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
