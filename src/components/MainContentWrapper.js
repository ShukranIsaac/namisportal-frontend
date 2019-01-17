import React, { Component } from 'react';

import './wrappers.css';

const MainContentWrapper = (WrappedComponent) => {

  return class MainContentWrapper extends Component {

    render() {
      const { classes } = this.props;

      return (
        <div>

          <WrappedComponent { ...this.props } />

        </div>
      );
    }
  }
}

export default MainContentWrapper;
