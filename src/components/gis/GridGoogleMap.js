import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';

import './grid.css';

const CunstomGoogleMap = withScriptjs(
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

              {
                props.polygon(props.onRegionChanged)
              }

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
    this.renderMarepCenters = this.renderMarepCenters.bind(this);
    this.renderDistrictPolygons = this.renderDistrictPolygons.bind(this);
    this.getPolygonCentroid = this.getPolygonCentroid.bind(this);
    // this.renderRegions = this.renderRegions.bind(this);
    this.renderPolygon = this.renderPolygon.bind(this);

  }

  handleClick = (event) => {

    this.setState({ [event.target.name]: event.target.value });

  }

  renderMarepCenters = ({district, electrified}) => {

    if (district !== null && district !== undefined && electrified) {

      return (
        <>
          <MarkerClusterer>
            {
              this.props.fetchMarepCenters(district).map(center => {

                return <Marker position={center.coordinates} key={center.id}/>

              })
            }
          </MarkerClusterer>
        </>
      );

    } else {

      return (
        <>
          <MarkerClusterer></MarkerClusterer>
        </>
      );
    }

  }

  renderMeters = ({district, region}) => {

    if (district !== null && district !== undefined) {

      return (
        <>
          <MarkerClusterer>
            {
              this.props.fetchMeters(district).map(center => {

                return <Marker position={center.coordinates} key={center.id}/>

              })
            }
          </MarkerClusterer>
        </>
      );

    } else if (region !== null && region !== undefined) {

      return (
        <>
          <MarkerClusterer>
            {
              this.props.fetchMeters(region).map(center => {

                return <Marker position={center.coordinates} key={center.id}/>

              })
            }
          </MarkerClusterer>
        </>
      );

    } else {

      return (
        <>
          <MarkerClusterer></MarkerClusterer>
        </>
      );
    }

  }

  renderPolygon = (paths) => {

    return <>
      <Polygon
        paths={paths}
        options={{
          fillOpacity: 0.4,
          strokeColor: "red",
          strokeOpacity: 1,
          strokeWeight: 1
        }}
      >
      </Polygon>
    </>;

  }

  renderDistrictPolygons = ({district, region, r_coordinates, d_coordinates}) => {

    if (district !== null && district !== undefined) {

      return <>
        <Polygon
          paths={d_coordinates}
          options={{
            fillOpacity: 0.8,
            strokeColor: "yellow",
            strokeOpacity: 1,
            strokeWeight: 1
          }}
        >
        </Polygon>
      </>;
    }
    else if( region !== null && region !== undefined){

      return <>
        <Polygon
          paths={r_coordinates}
          options={{
            fillOpacity: 0.4,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 1
          }}
        >
        </Polygon>
      </>;
    }else {

      return <>
        <Polygon></Polygon>
      </>;
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

    return (
      <div>
        <CunstomGoogleMap
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id="map-canvas" style={{ height: `900px` }} />}
          mapElement={<div id="map" style={{ height: `100%` }} />}
          onDistrictChanged={this.renderDistrictPolygons(this.props)}
          onMarepCenter ={this.renderMarepCenters(this.props)}
          onCenterChanged= {this.getPolygonCentroid(this.props)}
          polygon = {this.renderPolygon}
          {...this.state}
          {...this.props}
        > 
        </CunstomGoogleMap>
      </div>
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
