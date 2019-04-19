import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Col, Row} from 'reactstrap';

import Drawer from '@material-ui/core/Drawer';

import SideBarWrapper from '../SideBarWrapper';

import './grid.css';
import SearchInputControl from '../forms/search.form.field';
import { red, blue, yellow, grey } from '@material-ui/core/colors';
import { FormCheckboxControl } from '../forms/form.checkbox.field';
import { SelectInputControl } from '../forms/form.selectinput.field';

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
      eleven_kv_lines: false,
      ground_transformers: false,
      up_transformers: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    
    if (prevState !== nextProps) {
      return Object.assign(prevState, nextProps);
    }

    return null;
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

      return <option value={ properties.name } key={ _id }>{ properties.name }</option>

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

      if (region.properties.name === this.props.region_name) {

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
    // console.log(gis_filters)
    if (this.props.region_name !== undefined && this.props.region_name !== null) {

      return this.filterDistrictsPerRegion(gis_filters).map(({districts}) => {

        return districts.map(({ properties, _id }) => {

            return <option value={ properties.name } key={ _id }>{ properties.name }</option>

          }
        );
      })

    }

  }

  /**
   * Renders plant type filters
   */
  renderTypeFilters = ({ power_plant_filters }) => {

    if (power_plant_filters !== null) {

      return power_plant_filters[1].plantTypes.map((option, index) => {
        // console.log(option)
        return <option value={ option } key={ index }>{ option }</option>

      })

    }

  }

  /**
   * Renders capacities filter options
   */
  renderPlantCapacityFilters = ({ power_plant_filters }) => {

    if (power_plant_filters !== null) {
      
      return power_plant_filters[0].capacities.map((option, index) => {
        // console.log(option)
        return <option value={ option } key={ index }>{ option }</option>

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
            Label="search place"
            placeholder="Search for min-grid location"  
            handleChange={ (e) => { this.props.onChange(e) } }
          />
        </div>
      </Fragment>
    );

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

    // console.log(this.props.power_plant_filters)
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        >

        <div className={classes.grow} />
          <div style={{width: '100%'}}>
            <Row>
              <Col lg='12'>
                <FormControl className={classes.formControl} key="region">

                  <SelectInputControl 
                    name='region_name' 
                    label="Region"
                    helperText='Select region filter' 
                    {...this.props} 
                    {...this.state}
                    onChange={ (e) => { this.props.onChange(e) } }
                  >

                    <option value="">{ `${"--Select region--"}` }</option>
                    { this.renderRegions(this.props) }

                  </SelectInputControl>

                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <FormControl className={classes.formControl} key="district">

                  <SelectInputControl 
                    name='district_name' 
                    label="District"
                    helperText='Select district filter' 
                    {...this.props} 
                    {...this.state}
                    onChange={ (e) => { this.props.onChange(e) } }
                  >

                    <option value="">{ `${"--Select district--"}` }</option>
                    { this.renderDistricts(this.props) }

                  </SelectInputControl>

                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
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
              </Col>
            </Row>
            {/* <Row>
              <Col lg='12'>
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
              </Col>
            </Row> */}
            <Row>
              <Col lg='12'>

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
                      name='eleven_kv_lines'
                      value='11kV Lines'
                      isChecked={ this.props.eleven_kv_lines }
                      classes={ classes }
                      handleChange={ (e) => { this.props.onChecked(e) } }
                    />

                    { this.legendLineIcon(classes.proposed) }

                  </FormGroup>

                  <FormLabel component="legend"><b>Transformers</b></FormLabel>
                  <FormGroup row key="transformers" className={classes.margin}>
                    
                    <FormCheckboxControl
                      name='ground_transformers'
                      value='ground'
                      isChecked={ this.props.ground_transformers }
                      classes={ classes }
                      handleChange={ (e) => { this.props.onChecked(e) } }
                    />

                    { this.legendMarkerIcon(classes.ground) }

                    <FormCheckboxControl
                      name='up_transformers'
                      value='overhead'
                      isChecked={ this.props.up_transformers }
                      classes={ classes }
                      handleChange={ (e) => { this.props.onChecked(e) } }
                    />

                    { this.legendMarkerIcon(classes.overhead) }

                  </FormGroup>

                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <FormLabel component="legend"><b>Power Plants</b></FormLabel>
                <FormControl className={classes.formControl} key="plant_type">

                    <SelectInputControl
                      name='type'
                      label="Type"
                      helperText='Select plant type'
                      {...this.props}
                      {...this.state}
                      onChange={ (e) => this.props.typeChanged(e) }
                    >

                      <option value="">{ `${"--Plant type--"}` }</option>
                      { this.renderTypeFilters(this.props) }

                    </SelectInputControl>

                </FormControl>

                <FormControl className={classes.formControl} key="capacity">
                  
                    <SelectInputControl
                      name='capacity'
                      label="Capacity"
                      helperText='Select plant capacity'
                      {...this.props}
                      {...this.state}
                      onChange={ (e) => this.props.capacityChanged(e) }
                    >

                      <option value="">{ `${"--Select capacity--"}` }</option>
                      { this.renderPlantCapacityFilters(this.props) }

                    </SelectInputControl>

                </FormControl>
              </Col>
            </Row>
          </div>
      </Drawer>
    );
  }
}

const drawerWidth = '20%';
const styles = theme => ({
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
    marginBottom: theme.spacing.unit * 1,
    minWidth: 'auto',
  },
  legend: {
    marginTop: theme.spacing.unit * 3,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: '70px',
    flex: 'unset',
    display: 'unset',
    flexDirection: 'unset',
  },
  toolbar: theme.mixins.toolbar,
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

export default withStyles(styles)(SideBarWrapper(GridSideBar));
