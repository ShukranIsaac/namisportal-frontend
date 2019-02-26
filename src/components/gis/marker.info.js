import React, { Component} from 'react'
import { InfoWindow } from "react-google-maps";

class InformationBox extends Component {

    constructor(props){
        super(props)

        this.state = {
            activeMarker: null,
            show: false
        }

        this.inforClose = this.inforClose.bind(this)
    }

    inforClose = props => {
        if (this.state.show) {
          this.setState({
            activeMarker: null,
            show: false,
          });
        }
      };

      renderPowerPlantsInfoBox () {
        const { district, title, ta, status, capacityInMW, plantType, name} = this.props.information
        return (
                <div>
                    <div><b><em>{title} Information</em></b></div>
                    <div>Name: { name }</div>
                    <div>District: { district } </div>
                    <div>TA: { ta } </div>
                    <div>Status: { status } </div>
                    <div>Capacity: { capacityInMW } MW </div>
                    <div>Plant Type: { plantType } MW </div>
                </div>
            )
    }

    renderMarepCenterInfoBox () {
        const { district, title, ta } = this.props.information
        return (
                <div>
                    <div><b><em>{title} Information</em></b></div>
                    <div>District: { district } </div>
                    <div>TA: { ta } </div>
                </div>
            )
    }

    renderTransformerInfoBox () {
        const { ta, manufacturer, yearManufactured, serialNumber, cooling, 
            mass, barcode, SSNumber, voltage, district, location, position, title } = this.props.information
        return (
            <div>
                <div><b><em>{title} Information</em></b></div>
                <div>Voltage: { voltage } </div>
                <div>District: { district } </div>
                <div>TA: { ta } </div>
                <div>Location: { location } </div>
                <div>Position: { position } </div>
                <div>SS Number: { SSNumber } </div>
                <div>Barcode: { barcode } </div>
                <div>Serial Number: { serialNumber } </div>
                <div>Cooling: { cooling } </div>
                <div>Mass: { mass } </div>
                <div>Manufacture Year: { yearManufactured } </div>
                <div>Manufacturer: { manufacturer } </div>
            </div>
            )
    }
    
    renderInfoBox(title){
        if (title === 'Transformer'){
            return this.renderTransformerInfoBox()
        }
        else if(title == 'Marep Center') {
            return this.renderMarepCenterInfoBox()
        } 
        else{
            return this.renderPowerPlantsInfoBox()
        }
    }
    render () {

        const { title } = this.props.information
        console.log(this.props.information)

        return (
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.show}
              onCloseClick={ this.inforClose}>
                {
                    this.renderInfoBox(title)
                }
            </InfoWindow>
        )
    }
    
    
}

export default InformationBox