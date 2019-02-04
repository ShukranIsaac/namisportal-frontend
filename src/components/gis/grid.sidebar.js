import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { Container, Col, Row} from 'reactstrap'

import Drawer from '@material-ui/core/Drawer';

import Icon from '@material-ui/core/Icon';
// import red from '@material-ui/core/colors/red';
// import blue from '@material-ui/core/colors/blue';
// import yellow from '@material-ui/core/colors/yellow';

import SideBarWrapper from '../SideBarWrapper';

import './grid.css';
import SearchInputControl from '../forms/search.form.field';

/*
 *  To accept props from main grid
 */
class GridSideBar extends Component {

  constructor() {
    super();
    this.state = {
      to_be_electrified: false,
      marep_center: false,
      checked_proposed: false,
      checked_33_line: false,
      meters_checked: false,
      distribution_lines: false
    };
  }

  renderRegions = ({gis_filters}) => {
    
    
    return gis_filters.map(({name}, key) => {

      return <>
        <option value={ name } key={ name }>{ name }</option>
      </>

    });

  }

  filterDistrictsPerRegion = (gis_filters) => {

    return gis_filters.filter((region) => {

      if (region.name === this.props.region) {

        return region;

      }

      return;
    });

  }

  renderDistricts = ({gis_filters}) => {

    if (this.props.region !== undefined && this.props.region !== null) {

      return this.filterDistrictsPerRegion(gis_filters).map(({districts}) => {

        return districts.map(({name}, key) => {

            return <>
              <option value={ name } key={ name }>{ name }</option>
            </>

          }
        );
      })

    }

  }

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

  selectInputControl = ({ helperText, name }) => {

      return <>
        <InputLabel shrink htmlFor="region-open-select">
          { name }
        </InputLabel>

        {
            name === "Region" ? (
              <NativeSelect
                value={this.state.region}
                name="region"
                onChange={ (e) => { this.props.onChange(e) } }
                input={<Input name="region" id="region-open-select" />}
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
      </>

  }

  checkBoxControl = ({ name, value, isChecked, classes }) => {

      return <>
        <FormControlLabel
          control={
            <Checkbox
              checked={ isChecked }
              onChange={ (e) => { this.props.onChecked(e) } }
              value={ value }
              color="primary"
              name={ name }
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label={ value }
        />
      </>

  }

  render() {

    const { classes } = this.props;

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
          <Container>
            <Row>
              <Col lg='12'>
                <FormControl className={classes.formControl} key="region">

                  {
                    this.selectInputControl({
                      helperText: "Add region filter",
                      name: "Region"
                    })
                  }

                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
              <FormControl className={classes.formControl} key="district">

              {
                this.selectInputControl({
                  helperText: "Add district filter",
                  name: "District"
                })
              }

              </FormControl>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <div className={classes.grow} />

                <FormGroup row>

                  {
                    this.checkBoxControl({
                      name: 'marep_center',
                      value: 'Marep Centers',
                      isChecked: this.props.marep_center,
                      classes: classes
                    })
                  }

                  {
                    this.checkBoxControl({
                      name: 'to_be_electrified',
                      value: 'To be electrified',
                      isChecked: this.props.to_be_electrified,
                      classes: classes
                    })
                  }

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <div className={classes.grow} />

                <FormGroup row key="meters">

                  {
                    this.checkBoxControl({
                      name: 'meters_checked',
                      value: 'Meters',
                      isChecked: this.props.meters_checked,
                      classes: classes
                    })
                  }

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <div className={classes.grow} />

                <FormGroup row key="distribution_lines">

                  {
                    this.checkBoxControl({
                      name: 'distribution_lines',
                      value: 'Distribution Lines',
                      isChecked: this.props.distribution_lines,
                      classes: classes
                    })
                  }

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='12'>
                <div className={classes.grow} />
                <div className={classes.legend}>

                  <FormLabel component="legend">Legend (Key)</FormLabel>
                  
                  <FormGroup row>

                    <Icon>colour-helper</Icon>

                  </FormGroup>

                </div>
              </Col>
            </Row>
          </Container>
        

       

        

        

        

        
      </Drawer>
    );
  }
}

const drawerWidth = 270;
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
    marginBottom: theme.spacing.unit * 2,
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
    top: 'unset',
    flex: 'unset',
    display: 'unset',
    flexDirection: 'unset',
  },
  toolbar: theme.mixins.toolbar,
});

GridSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarWrapper(GridSideBar));
