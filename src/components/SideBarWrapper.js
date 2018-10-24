import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

import { Button as ButtonBlueprint, ControlGroup } from "@blueprintjs/core";

import './wrappers.css';

const SideBarWrapper = (WrappedComponent) => {

  return class SideBarWrapper extends Component {

    render() {
      const { classes } = this.props;

      return (
        <aside>
          <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <ControlGroup fill={true} vertical={false}>
                <ButtonBlueprint icon="filter">Filter</ButtonBlueprint>
                <ButtonBlueprint icon="arrow-right" />
              </ControlGroup>

              <div id="side-bar-container">
                <form autoComplete="off">

                  <WrappedComponent { ...this.props } />

                </form>
              </div>
          </Drawer>
        </aside>
      );
    }
  }
}

export default SideBarWrapper;
