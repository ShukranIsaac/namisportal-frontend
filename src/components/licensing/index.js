import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LicensingProfile from './LicensingProfileActivity';
import LicensingSidebar from './LicensingSidebar';

class Licensing extends Component {

  constructor() {
    super();
    this.state = {
      capacity: '',
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render(){
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LicensingSidebar onChange={ this.handleChange } {...this.state}/>
        <LicensingProfile onChange={ this.handleChange } {...this.state}/>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

Licensing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Licensing);
