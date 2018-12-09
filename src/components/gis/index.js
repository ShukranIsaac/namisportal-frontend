import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './GridGoogleMap';
import GridSideBar from './GridSideBar';

import './grid.css';

class GIS extends Component {

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChecked = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePlaceSearch = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  render(){

    let regions = [
      {
        name: "Central",
        districts: [
          {
            name: "Lilongwe",
            coord: {}
          },
          {
            name: "Kasungu",
            coord: {}
          },
          {
            name: "Dowa",
            coord: {}
          },
          {
            name: "Mchinji",
            coord: {}
          },
          {
            name: "Ntchisi",
            coord: {}
          },
          {
            name: "Dedza",
            coord: {}
          },
          {
            name: "Ntcheu",
            coord: {}
          },
          {
            name: "Balaka",
            coord: {}
          },
        ]
      },
      {
        name: "Sourthern",
        districts: [
          {
            name: "Blantyre",
            coord: {}
          },
          {
            name: "Chikwawa",
            coord: {}
          },
          {
            name: "Chiradzulu",
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
            name: "Neno",
            coord: {}
          }
        ]
      },
      {
        name: "Eastern",
        districts: [
          {
            name: "Balaka",
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
            name: "Zomba",
            coord: {}
          },
        ]
      },
      {
        name: "Northern",
        districts: [
          {
            name: "Chitipa",
            coord: {}
          },
          {
            name: "Karonga",
            coord: {}
          },
          {
            name: "Rumphi",
            coord: {}
          },
          {
            name: "Mzimba",
            coord: {}
          },
        ]
      },
    ];

    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <GridSideBar
            {...this.state}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            regions={regions}
        />
        <MinGridMap
            {...this.state}
            onChange={this.handleChange}
            onChecked={this.handleChecked}
            onPlaceSearch={this.handlePlaceSearch}
        />

      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    width: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

GIS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GIS);
