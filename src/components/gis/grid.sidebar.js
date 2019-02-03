import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, /* Field */ } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import SideBarWrapper from '../SideBarWrapper';

import './grid.css';
import SearchInputControl from '../forms/search.form.field';
import { red, blue, yellow, grey } from '@material-ui/core/colors';
import { FormCheckboxControl } from '../forms/form.checkbox.field';

/**
 *  Side bar, renders gis sidebar with form filters.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class GridSideBar extends Component {

  constructor() {
    super();
    this.state = {
      to_be_electrified: false,
      marep_center: false,
      checked_proposed: false,
      checked_33_line: false,
      checked_potential: false,
      checked_existing: false,
      meters_checked: false,
      distribution_lines: false,
      proposed_distr_lines: false,
      ground_transformers: false,
      up_transformers: false,
    };
  }

  /**
   * Renders mapped object filter options (regions)
   * 
   * @param {Object} gis_filters
   * @returns {Option} fragment
   * 
   */
  renderRegions = ({gis_filters}) => {

    return gis_filters.map(({ properties, _id }) => {

      return <Fragment key={_id}>
        <option value={ properties.name } key={ _id }>{ properties.name }</option>
      </Fragment>

    });

  }

  /**
   * Filter and return chosen region with itsdistricts
   * else return nothing.
   * 
   * @param {Object} gis_filters
   * @returns {Object} region
   * 
   */
  filterDistrictsPerRegion = (gis_filters) => {

    return gis_filters.filter((region) => {

      if (region.properties.name === this.props.region) {

        return region;

      }

      return null;

    });

  }

  /**
   * Renders mapped object filter options (districts)
   * 
   * @param {Object} gis_filters
   * @returns {Option} fragment
   * 
   */
  renderDistricts = ({gis_filters}) => {

    if (this.props.region !== undefined && this.props.region !== null) {

      return this.filterDistrictsPerRegion(gis_filters).map(({districts}) => {

        return districts.map(({ properties, _id }) => {

            return <Fragment key={ _id }>
              <option value={ properties.name } key={ _id }>{ properties.name }</option>
            </Fragment>

          }
        );
      })

    }

  }

  /**
   * Renders search input control
   * 
   * @param {Object} classes
   * @returns {Option} fragment
   * 
   */
  searchInputControl = ({classes}) => {

      return (
        <Fragment>
          <div className={ classes.search }>
            <SearchInputControl
              id="search_place"
              name="search"
              placeholder="Search for min-grid location"  
              handleChange={ (e) => { this.props.onChange(e) } }
            />
          </div>
        </Fragment>
      );

  }

  /**
   * Renders districts and regions component parts
   * 
   * @param {String} helperText
   * @param {String} name
   * @returns {Fragment} district || region
   */
  selectInputControl = ({ helperText, name }) => {

      return <Fragment>
        <InputLabel shrink htmlFor="region-open-select">
          { name }
        </InputLabel>

        {
            name === "Region" ? (
              <NativeSelect
                value={this.state.region}
                name="region"
                onChange={ (e) => { this.props.onChange(e) } }
                input={<Input key={this.state.region} name="region" id="region-open-select" />}
              >
                <option value="">{ `${"--Select region--"}` }</option>
                { this.renderRegions(this.props) }
              </NativeSelect>
            ) : (
              <NativeSelect
                value={this.state.district}
                name="district"
                onChange={ (e) => { this.props.onChange(e) } }
                input={<Input key={this.state.district} name="district" id="district-open-select" />}
              >
                <option value="">{ `${"--Select district--"}` }</option>
                { this.renderDistricts(this.props) }
              </NativeSelect>
            )
        }

        <FormHelperText><em>{ helperText }</em></FormHelperText>
      </Fragment>

  }

  legendMarkerIcon = (color) => {

    return (
      <span className={ color }>
        <i className="material-icons md-18">location_on</i>
      </span>
    );

  }

  legendLineIcon = (color) => {

    return (
      <span className={ color }>
        <i className="material-icons md-18">timeline</i>
      </span>
    );

  }

  render() {

    const { classes } = this.props;

    return (
      <div>

        { this.searchInputControl(this.props)}

        <div className={classes.grow} />

        <FormControl className={classes.formControl} key="region">

          {
            this.selectInputControl({
              helperText: "Select region filter",
              name: "Region"
            })
          }

        </FormControl>

        <FormControl className={classes.formControl} key="district">

          {
            this.selectInputControl({
              helperText: "Select district filter",
              name: "District"
            })
          }

        </FormControl>

        <div className={classes.grow} />

        <FormGroup row className={classes.margin}>

          <FormCheckboxControl 
            name='marep_center' 
            value='Electrified(Marep)' 
            isChecked={ this.props.marep_center }
            classes={ classes }
            handleChange={ (e) => { this.props.onChecked(e) } }
          />

          { this.legendMarkerIcon(classes.marep) }

          <FormCheckboxControl
            name='to_be_electrified'
            value='To be electrified'
            isChecked={ this.props.to_be_electrified }
            classes={ classes }
            handleChange={ (e) => { this.props.onChecked(e) } }
          />

          { this.legendMarkerIcon(classes.to_be_electrified) }

        </FormGroup>

        <div className={classes.grow} />

        <FormGroup row key="meters" className={classes.margin}>

          <FormCheckboxControl
            name='meters_checked'
            value='Meters'
            isChecked={ this.props.meters_checked }
            classes={ classes }
            handleChange={ (e) => { this.props.onChecked(e) } }
          />

          { this.legendMarkerIcon(classes.meters) }

        </FormGroup>

        <div className={classes.grow} />

        <FormControl>

          <FormLabel component="legend"><b>Mini Grids</b></FormLabel>
          <FormGroup row key="mini_hydros" className={classes.margin}>

            <FormCheckboxControl
              name='existing'
              value='Existing'
              isChecked={ this.props.checked_existing }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendMarkerIcon(classes.existing) }

            <FormCheckboxControl
              name='potential'
              value='Potential'
              isChecked={ this.props.checked_potential }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendMarkerIcon(classes.potential) }

          </FormGroup>

          <FormLabel component="legend"><b>Distribution Lines</b></FormLabel>
          <FormGroup row key="distribution_lines" className={classes.margin}>
            
            <FormCheckboxControl
              name='distribution_lines'
              value='33kV Lines'
              isChecked={ this.props.distribution_lines }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendLineIcon(classes.line_33_s) }

            <FormCheckboxControl
              name='proposed_distr_lines'
              value='Proposed Lines'
              isChecked={ this.props.proposed_distr_lines }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendLineIcon(classes.proposed) }

          </FormGroup>

          <FormLabel component="legend"><b>Transformers</b></FormLabel>
          <FormGroup row key="transformers" className={classes.margin}>
            
            <FormCheckboxControl
              name='ground_transformers'
              value='Ground'
              isChecked={ this.props.ground_transformers }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendMarkerIcon(classes.ground) }

            <FormCheckboxControl
              name='up_transformers'
              value='Overhead'
              isChecked={ this.props.up_transformers }
              classes={ classes }
              handleChange={ (e) => { this.props.onChecked(e) } }
            />

            { this.legendMarkerIcon(classes.overhead) }

          </FormGroup>

        </FormControl>

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
  legend: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    marginLeft: theme.spacing.unit * 2,
  },
  to_be_electrified: {
    color: grey[400],
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  marep: {
    color: red[400],
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  meters: {
    color: `#9b59b6`,
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  existing: {
    color: `#2c3e50`,
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  potential: {
    color: `#1abc9c`,
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  line_33_s: {
    color: blue[700],
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  proposed: {
    color: `#4cd137`,
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  ground: {
    color: yellow[400],
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
  overhead: {
    color: `#273c75`,
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * -2,
  },
});

GridSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'gis_sidebar',
})(withStyles(styles)(SideBarWrapper(GridSideBar)));
