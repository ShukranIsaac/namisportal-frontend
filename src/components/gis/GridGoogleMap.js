import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker  } from "react-google-maps";

import MainContentWrapper from '../MainContentWrapper';

import './grid.css';

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
        <Marker position={{lat: -13.2512, lng: 34.3015}} />
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
  }

  componentWillUpdate() {
    let map = {}
    try{
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -13.2512, lng: 34.3015},
        zoom: 7,
        mapTypeId: 'roadmap',
      });

    }catch(err){
      console.log(err)
    }

    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });

    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    const marker = new window.google.maps.Marker({
        map: map,
        position: {lat: -33.8688, lng: 151.2195},
    });

    // initialize the autocomplete functionality using the #search_place input box
    const inputNode = document.getElementById('search_place');
    //map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    const autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });

      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  handleClick = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
