import React, { Component } from 'react';
import { ControlGroup, FormGroup } from '@blueprintjs/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SideBarWrapper from '../SideBarWrapper';
import SelectDropdown from '../SelectDropdown';

const profileActivities = [
  {
    name: 'Capacity',
    options: [
      { option: "Up to 1 MW" },
      { option: "1 to 10 MW" },
      { option:"No generation" }
    ]
  },
  {
    name: 'Technology',
    options: [
      { option: "Solar" },
      { option: "Wind"},
      { option: "Hydro" },
      { option: "Biomass" }
    ]
  },
  {
    name: 'Hybrid',
    options: [
      { option: "Yes" } ,
      { option: "No" }
    ]
  },
  {
    name: 'Wholesale Selling',
    options: [
      { option: "DNO (With SPPA)" },
      { option: "DNO (Without SPPA)" },
      { option: "N/A (Retail Only)" },
      { option: "N/A (Own Use)" }
    ],
  },
  {
    name: 'Retail Selling',
    options: [
      { option: "Customers in own grid" },
      { option: " Customers in other DNO grid" },
      { option: "Customers in own grid and in other DNO grid" },
      { option: "N/A (No Retail Customers)" }
    ],
  },
  {
    name: 'Own Mini Grid',
    options: [
      { option: "Up to 1 MW" },
      { option: "1 to 10 MW" }
    ]
  }
];

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

                      <SelectDropdown onChange={onChange} key={key} profiles={p} />

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
