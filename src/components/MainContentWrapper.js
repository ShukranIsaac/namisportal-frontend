import React, { Component } from 'react';

import './wrappers.css';

const MainContentWrapper = (WrappedComponent) => {

  return class MainContentWrapper extends Component {

    render() {
      const { classes } = this.props;

      return (
        <main className={classes.content}>

          <WrappedComponent { ...this.props } />

        </main>
      );
    }
  }
}

export default MainContentWrapper;
