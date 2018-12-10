import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LicensingProfile from './LicensingProfile';
import LicensingSidebar from './LicensingSidebar';

class Licensing extends Component {

  constructor() {
    super();
    this.state = {}
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render(){
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <LicensingSidebar onChange={ this.handleChange } />
          <LicensingProfile onChange={ this.handleChange } />
        </div>
      </>
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
  },
  button: {
    width: '100%',
    textAlign: 'left',
    borderRadius: '0',
    background: '#BFCCD6',
    fontSize: '1.2em'
  }
});

Licensing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Licensing);
