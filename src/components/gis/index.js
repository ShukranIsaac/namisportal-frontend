import React, { Component } from 'react';
import { Redirect  } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MinGridMap from './GridGoogleMap';
import GridSideBar from './GridSideBar';

import './grid.css';

class GIS extends Component {

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  handleChecked = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
    console.log(event.target.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignUp = (redirect) => {
    if (redirect) {
      return (<Redirect to="/signup" />);
    }
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
            name: "Ntchinji",
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
            name: "Chikhwawa",
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
          {
            name: "Mzuzu",
            coord: {}
          },
        ]
      },
    ];

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridSideBar onChange={this.handleChange} onChecked={this.handleChecked} regions={regions}/>
        <MinGridMap />
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
