import React, { Component } from 'react';
import { ControlGroup, FormGroup } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SideBarWrapper from '../SideBarWrapper';
import SelectDropdown from '../SelectDropdown';



class LicensingSidebar extends Component {

  constructor() {
    super();
    this.state = { };
  }

  render(){
    const { classes, onChange, filters } = this.props;

    if (filters === undefined && filters === null) {

        return <></>;

    }

    return (
      <>
      <div className={classes.root}>
          <em className={classes.emText}>
            Please select the options below which apply to the profile of your intended activity:
          </em>

          <ControlGroup fill={false} vertical={true}>

            {
              filters.map((p, key) => {

                  return (
                    <FormGroup key={key} label={p.name}>

                      <SelectDropdown onChange={ (e) => onChange(e) } key={key} profiles={p} />

                    </FormGroup>
                  );

              })
            }

          </ControlGroup>

        </div>
      </>
    );
  }

}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `100%`,
    height: `100%`,
    padding: '20px',
  },
  emText: {
    marginBottom: theme.spacing.unit * 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: `90%`,
    maxWidth: `100%`,
  },
  drawerPaper: {
    position: 'relative',
    width: `100%`,
  },
});

LicensingSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarWrapper(LicensingSidebar));
