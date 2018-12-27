import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from '../contact/form.styles';

class FAQ extends Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value});

  }

  render(){

    return (
      <>
        <div>FAQ</div>
      </>
    );

  }

}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FAQ);
