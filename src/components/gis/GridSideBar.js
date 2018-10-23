import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { Button as ButtonB, Checkbox, ControlGroup } from "@blueprintjs/core";

import './grid.css';

/*
 *  To accept props from main grid
 */
class GridSideBar extends Component {

  constructor() {
    super();
    this.state = {
      to_be_electrified: false,
      electrified: false,
      region: '',
      district: '',
      districtOpen: false,
      regionOpen: false,
      checked_proposed: false,
      checked_lines: false,
    };
  }

  handleClose = () => {
    this.setState({
      districtOpen: false,
      regionOpen: false,
    });
  };

  handleOpen = () => {
    this.setState({
      districtOpen: true,
      regionOpen: true,
    });
  };

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
              <ButtonB icon="filter">Filter</ButtonB>
              <ButtonB icon="arrow-right" />
            </ControlGroup>

            <div>
              <form id="side-bar-container" autoComplete="off">
                <div className={ classes.search }>
                  <div className="form-group row">
                    <div className="bp3-input-group">
                      <span className="bp3-icon bp3-icon-search"></span>
                      <input
                          className="bp3-input"
                          type="search" name="search"
                          placeholder="Search for min-grid location"
                          dir="auto" id="search_place"
                          onChange={ (e) => { this.props.onChange(e) } } />
                    </div>
                  </div>
                </div>
                <div className={classes.grow} />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.electrified}
                        onChange={ () => { this.props.onChecked("electrified") } }
                        value="Electrified"
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Electrified"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.to_be_electrified}
                        onChange={ () => { this.props.onChecked("to_be_electrified") } }
                        value="To be electrified"
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="To be electrified"
                  />
                </FormGroup>

                <div className={classes.grow} />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="region-open-select">Region</InputLabel>
                  <Select
                    open={this.state.regionOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.region}
                    onChange={ (e) => { this.props.onChange(e) } }
                    inputProps={{
                      name: 'region',
                      id: 'region-open-select',
                    }}
                  >
                    <MenuItem value="default">
                      <em>{ `${"--Choose region--"}` }</em>
                    </MenuItem>
                    { this.props.regions.map((region) => (
                        <MenuItem value={region.name}>{ region.name }</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="district-open-select">District</InputLabel>
                  <Select
                    open={this.state.districtOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.district}
                    onChange={ (e) => { this.props.onChange(e) } }
                    inputProps={{
                      name: 'district',
                      id: 'district-open-select',
                    }}
                  >
                    <MenuItem value="default">
                      <em>{ `${"--Choose district--"}` }</em>
                    </MenuItem>
                    { this.props.regions.map((region) => {
                        return region.districts.map((district) => (
                            <MenuItem value={ district.name }>{ district.name }</MenuItem>
                          ))
                      })
                    }
                  </Select>
                </FormControl>

                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.electrified}
                        onChange={ () => { this.props.onChecked("electrified") } }
                        value="checked_lines"
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label={ `${"33/11kV Lines"}` }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.to_be_electrified}
                        onChange={ () => { this.props.onChecked("checked_proposed") } }
                        value="proposed"
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label={ `${"Proposed 33/11kV Lines"}` }
                  />
                </FormGroup>
              </form>
            </div>
        </Drawer>
      </aside>
    );
  }
}

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: `100%`,
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    marginRight: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 0,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 110,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 0,
      width: 'auto',
    },
  },
});

GridSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridSideBar);
