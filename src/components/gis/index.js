import React, { Component } from 'react';
import { Button, ControlGroup } from "@blueprintjs/core";
import { Select, Suggest, ItemListRenderer } from "@blueprintjs/select";

class GIS extends Component {
  render(){
    let regions = [
      {
        name: "southern",
        districts: [
          {
            name: "Balaka",
            coord: {}
          },
          {
            name: "Blantyre",
            coord: {}
          },
          {
            name: "Chikhwawa",
            coord: {}
          },
          {
            name: "Chiradzulu",
            coord: {}
          },
          {
            name: "Machinga",
            coord: {}
          },
          {
            name: "Mangochi",
            coord: {}
          },
          {
            name: "Mulanje",
            coord: {}
          },
          {
            name: "Mwanza",
            coord: {}
          },
          {
            name: "Nsanje",
            coord: {}
          },
          {
            name: "Phalombe",
            coord: {}
          },
          {
            name: "Thyolo",
            coord: {}
          },
          {
            name: "Zomba",
            coord: {}
          },
          {
            name: "Neno",
            coord: {}
          }
        ]
      },
      {
        name: "northern",
        districts: [
          {
            name: "Balaka",
            coord: {}
          },
          {
            name: "Blantyre",
            coord: {}
          },
          {
            name: "Chikhwawa",
            coord: {}
          },
          {
            name: "Chiradzulu",
            coord: {}
          },
          {
            name: "Machinga",
            coord: {}
          },
          {
            name: "Mangochi",
            coord: {}
          },
          {
            name: "Mulanje",
            coord: {}
          },
          {
            name: "Mwanza",
            coord: {}
          },
          {
            name: "Nsanje",
            coord: {}
          },
          {
            name: "Phalombe",
            coord: {}
          },
          {
            name: "Thyolo",
            coord: {}
          },
          {
            name: "Zomba",
            coord: {}
          },
          {
            name: "Neno",
            coord: {}
          }
        ]
      }
    ]
    console.log(regions);
    return (
        <div className="Sidebar">
          <ControlGroup fill={true} vertical={false}>
            <Button icon="filter">Filter</Button>

            <Button icon="arrow-right" />
          </ControlGroup>
        </div>
    );
  }
}

export default GIS;
