import React, { Component } from 'react'
import { Marker } from 'react-google-maps'


import InformationBox from './marker.info'

class PointMarker extends Component {
    constructor(props){
        super(props)

        this.state = {
            show: false
        }

        this.handleMarkerClick = this.handleMarkerClick.bind(this)
        this.showInforWindow = this.showInforWindow.bind(this)
        this.markerIconUrl = this.markerIconUrl.bind(this)
    }

      /**
     * handle UI click event, sets state
     * 
     * @param {Boolean} show
     */
    handleMarkerClick = ({ show }) => {
        this.setState({ show: !show })
    }

    /**
   * Marker Information window
   * 
   * @param {Boolean} show
   * @param {Object} information
   * @param {InfoWindow} window
   */
  showInforWindow = (information ) => {
      console.log(information)
    
    // Show inforwindow only if all the givwn conditions hold true
    if(information !== undefined && information !== null && this.state.show) {
    
      return (
        <InformationBox information={information}/>
      )

    }

  }

  markerIconUrl(title){
    if (title == 'Transformer'){
        return 'https://mt.google.com/vt/icon/text=T&psize=16&font=fonts/arialuni_t.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1'
    }

    else if (title == 'Marep Center') {
        return 'https://mt.google.com/vt/icon/text=M&psize=16&font=fonts/arialuni_t.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1'
    }

    else{
        return 'https://mt.google.com/vt/icon/text=•&psize=16&font=fonts/arialuni_t.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1'
    }
  }

    render(){
        const { geometry, _id, properties } = this.props.point
        const { title } = this.props
        const { show } = this.state

        const url = {url: this.markerIconUrl(title)}
        
        
            
        return (
            <Marker 
                position={geometry.coordinates}
                key={_id}
                icon={url}
                onClick={ () => this.handleMarkerClick(this.state) }>

                {
                    this.state.show && this.showInforWindow({...properties, title})
                }

            </Marker>
        );
    }

}

export default PointMarker