import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';

import './grid.css';

const CustomGoogleMap = withScriptjs(
    withGoogleMap(props => {

          return <>
            <GoogleMap
              defaultZoom={props.zoom}
              defaultCenter={props.onCenterChanged}
              defaultOptions={{
                scrollwheel: false,
                zoomControl: true,
              }}
              center={props.onCenterChanged}
              zoom={props.zoom}
            >

              {props.onMarepCenter}

              {props.onDistrictChanged}

              {props.onRegionChanged}

              {props.onDistrictMeters}

              {props.onRegionMeters}

            </GoogleMap>
          </>
        })
    );

/*
 *  Main gis grid view
 */
class MinGridMap extends Component {

  constructor() {
    super();
    this.state = {
      zoom: 7,
      newCenter: {
        lat: -13.2512, lng: 34.30154
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderDistrictMarepCenters = this.renderDistrictMarepCenters.bind(this);
    this.renderDistrictPolygon = this.renderDistrictPolygon.bind(this);
    this.renderRegionPolygon = this.renderRegionPolygon.bind(this);
    this.getPolygonCentroid = this.getPolygonCentroid.bind(this);
    this.renderPolygon = this.renderPolygon.bind(this);
    this.renderRegionMeters = this.renderRegionMeters.bind(this);
    this.renderDistrictMeters = this.renderDistrictMeters.bind(this);

  }

  handleClick = (event) => {

    this.setState({ [event.target.name]: event.target.value });

  }

  renderDistrictMarepCenters = ({district, electrified, m_centers}) => {

    if (district !== null && district !== undefined && electrified) {

      if (m_centers !== null && m_centers !== undefined) {

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

  markerClusterer = (clusters) => {

    return (
      <>
        <MarkerClusterer>
          {
            clusters.map((point, key) => {

              return <Marker position={point.coordinates} key={key}/>

            })
          }
        </MarkerClusterer>
      </>
    );

  }

  renderRegionMeters = ({region, meters}) => {

    if (region !== null && region !== undefined) {

      if (meters !== null && meters !== undefined) {

        return this.markerClusterer(meters);

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );

    }

  }


  renderDistrictMeters = ({district, meters}) => {

    if (district !== null && district !== undefined) {

      if (meters !== null && meters !== undefined) {

          return this.markerClusterer(meters);

      }

    } else {

      return (
        <>
          <MarkerClusterer />
        </>
      );

    }

  }


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

  renderRegionPolygon = ({region, r_coordinates}) => {

    if( region !== null && region !== undefined){

      return this.renderPolygon(r_coordinates, "red", 0.4);

    }

  }

  renderDistrictPolygon = ({district, d_coordinates}) => {

    if (district !== null && district !== undefined) {

      return this.renderPolygon(d_coordinates, "yellow", 0.8);

    }

  }

  filterDistrictsCentroids = (districts, district) => {

    return districts.filter((o) => {

      if (o.district === district) {
        return o;
      }

      return;
    });

  }

  getPolygonCentroid = ({district, centroids}) => {

    if (district !== null && district !== undefined) {

      if (centroids !== undefined && centroids !== null) {

          let centroid = this.filterDistrictsCentroids(centroids, district).map(({coordinates}) => {

            return coordinates;

          })

          return centroid[0];

      }

    } else {

      return this.state.newCenter;
    }

  }

  render() {

    const google = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places';

    return (
      <>
        <CustomGoogleMap
          googleMapURL={google} loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id="map-canvas" style={{ height: `900px` }} />}
          mapElement={<div id="map" style={{ height: `100%` }} />}
          onDistrictChanged={this.renderDistrictPolygon(this.props)}
          onRegionChanged={this.renderRegionPolygon(this.props)}
          onMarepCenter ={this.renderDistrictMarepCenters(this.props)}
          onDistrictMeters={this.renderDistrictMeters(this.props)}
          onRegionMeters={this.renderRegionMeters(this.props)}
          onCenterChanged= {this.getPolygonCentroid(this.props)}
          {...this.state}
        >
        </CustomGoogleMap>
      </>
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
