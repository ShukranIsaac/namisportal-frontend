import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import zombaGrids from '../../assets/gis/marep-centers/Zomba.json'
import zombaPolygon from '../../assets/gis/polygons/Zomba.json'

import MainContentWrapper from '../MainContentWrapper';

import './grid.css';
//https://tomchentw.github.io/react-google-maps/#markerclusterer

const marker = zombaGrids.centers[0];

const CunstomGoogleMap = withScriptjs(
    withGoogleMap(props => (
          <GoogleMap
            defaultZoom={7}
            defaultCenter={{lat: -13.2512, lng: 34.30154}}
            defaultOptions={{
              scrollwheel: false,
              zoomControl: true,
            }}
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
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderMarepCenters = ({district, electrified}) => {
    if (district !== null && district !== undefined && electrified) {

      const {centers} = require('../../assets/gis/marep-centers/'+ district +'.json');

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
