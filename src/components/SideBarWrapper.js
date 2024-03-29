import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

import './wrappers.css';

const SideBarWrapper = (WrappedComponent) => {

  return class SideBarWrapper extends Component {

    render() {
      const { classes } = this.props;

      return (
        // <aside>
          <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div id="side-bar-container">
                <form autoComplete="off">

                  <WrappedComponent { ...this.props } />

                </form>
              </div>
          </Drawer>
        // </aside>
      );
    }
  }
}

export default SideBarWrapper;
