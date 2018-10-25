import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { Checkbox, ControlGroup } from "@blueprintjs/core";

import SideBarWrapper from '../SideBarWrapper';

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
      checked_proposed: false,
      checked_lines: false,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
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
          <InputLabel shrink htmlFor="region-open-select">
            Region
          </InputLabel>
          <NativeSelect
            value={this.state.region}
            name="region"
            onChange={ (e) => { this.props.onChange(e) } }
            input={<Input name="region" id="region-open-select" />}
          >
            <option value="">{ `${"--Choose region--"}` }</option>
            { this.props.regions.map((region) => (
                <option value={region.name}>{ region.name }</option>
              ))
            }
          </NativeSelect>
          <FormHelperText><em>Add region filter</em></FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="district-open-select">
            District
          </InputLabel>
          <NativeSelect
            value={this.state.district}
            name="district"
            onChange={ (e) => { this.props.onChange(e) } }
            input={<Input name="district" id="district-open-select" />}
          >
            <option value="">{ `${"--Choose district--"}` }</option>
            { this.props.regions.map((region) => {
                return region.districts.map((district) => (
                    <option value={ district.name }>{ district.name }</option>
                  ))
              })
            }
          </NativeSelect>
          <FormHelperText><em>Add district filter</em></FormHelperText>
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
      </div>
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
    marginBottom: theme.spacing.unit * 2,
    minWidth: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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

export default withStyles(styles)(SideBarWrapper(GridSideBar));
