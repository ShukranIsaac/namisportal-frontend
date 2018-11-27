import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';

import './grid.css';
//https://tomchentw.github.io/react-google-maps/#markerclusterer

const CunstomGoogleMap = withScriptjs(
    withGoogleMap(props => (
          <GoogleMap
            defaultZoom={7}
            defaultCenter={{lat: -13.2512, lng: 34.30154}}
            defaultOptions={{
              scrollwheel: false,
              zoomControl: true,
            }}
            center={props.polygonCentroid}
          >

            {props.onMarepCenter}

            {props.onRenderPolygon}

          </GoogleMap>
        ))
    );

/*
 *  Main gis grid view
 */
class MinGridMap extends Component {

  constructor() {
    super();
    this.state = {
      zoom: 7,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
      newCenter: {lat: -13.2512, lng: 34.30154}
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderMarepCenters = this.renderMarepCenters.bind(this);
    this.renderPolygons = this.renderPolygons.bind(this);
    this.getPolygonCentroid = this.getPolygonCentroid.bind(this);

  }

  handleClick = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderMarepCenters = ({district, electrified}) => {
    if (district !== null && district !== undefined && electrified) {

      const {centers} = require('../../assets/gis/marep-centers/'+ district +'.json');

      // this.setState({newCenter: });
      this.getPolygonCentroid(this.props);

      return <>
        <MarkerClusterer>
          {
            centers.map(center => {
              return <Marker position={center.coordinates} key={center.id}/>
            })
          }
        </MarkerClusterer>
      </>
    } else {

      return <MarkerClusterer></MarkerClusterer>;
    }

  }

  renderPolygons = ({district}) => {
    if (district !== null && district !== undefined) {

      const {coordinates} = require('../../assets/gis/polygons/'+ district +'.json');

      return <Polygon paths={coordinates} ></Polygon>;
    } else {

      return <Polygon></Polygon>;
    }
  }

  filterDistrictsCentroids = (districts, district) => {

    return districts.filter((o) => {
      if (o.district === district) {
        return o;
      }
    });

  }

//   const {coordinates} = require('../../assets/gis/polygons/'+ district +'.json');
// console.log(coordinates);
//   let coord:any = [];
//   coordinates.map((obj) => {
//     coord.push([obj.lat, obj.lng]);
//   });
//   console.log(coord);
//   let center = coord.reduce( (x,y) => {
//     //console.log(x.lat);
//       return {"lat":x[0] + y[0]/coord.length, "lng":x[1] + y[1]/coord.length}
//   }, [0,0])
// console.log(center);
//
//   return center;

  getPolygonCentroid = ({district}) => {

    if (district !== null && district !== undefined) {
console.log(district);
      const d_centers = require('../../assets/gis/d-centroids/d_centroids.json');

      this.filterDistrictsCentroids(d_centers, district).map(({coordinates}) => {
console.log(coordinates);
        this.setState({newCenter: coordinates})
      })
    } else {

    }

  }

  render() {
    const { search } = this.props;

    return (
      <div>
        <CunstomGoogleMap
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id="map-canvas" style={{ height: `900px` }} />}
          mapElement={<div id="map" style={{ height: `100%` }} />}
          onRenderPolygon={this.renderPolygons(this.props)}
          onMarepCenter ={this.renderMarepCenters(this.props)}
          polygonCentroid= {this.state.newCenter}
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
