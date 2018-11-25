import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SideBarWrapper from '../SideBarWrapper';

const intended = [
  {
    capacity: ["Up to 1 MW", "1 to 10 MW", "No generation"],
  },
  {
    technology: ["Solar","Wind","Hydro","Biomass"]
  },
  {
    hybrid: ["Yes","No"],
  },
  {
    wholesale_selling: ["DNO (Without SPPA)","DNO (Without SPPA)","N/A (Retail Only)","N/A (Own Use)"],
  },
  {
    retail_selling: ["Customers in own grid"," Customers in other DNO grid","Customers in own grid and in other DNO grid","N/A (No Retail Customers)"],
  },
  {
    own_mini_grid: ["Up to 1 MW", "1 to 10 MW"]
  }
]

class LicensingSidebar extends Component {

  constructor() {
    super();
    this.state = {
      name: [],
      labelWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  formControls = (props) => {

    return (
      <FormControl variant="outlined" className={props.classes.formControl}>
        <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="select-outlined-placeholder"
          >
            { props.value }
        </InputLabel>
        <Select
          native
          value={this.state.capacity}
          onChange={this.props.onChange("capacity")}
          input={
            <OutlinedInput
              id="select-outlined-placeholder"
              name="capacity"
              labelWidth={this.state.labelWidth}
            />
          }
        >
          <option value=""></option>
          {props.intended.map((object) => {

            return object[Object.keys(object)[0]].map((name, key) => {

              return <option key={key} value={name}>{name}</option>;
              
            });

          })}
        </Select>
      </FormControl>
    );
  };

  render(){
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <em className={classes.emText}>
            Please select the options below which apply to the profile of your intended activity:
          </em>
          { this.formControls({classes, intended, value: "Capacity"}) }
          { this.formControls({classes, intended, value: "Technology"}) }
          { this.formControls({classes, intended, value: "Hybrid"}) }
          { this.formControls({classes, intended, value: "Wholesale Selling to"}) }
          { this.formControls({classes, intended, value: "Own Mini-Grid"}) }
          { this.formControls({classes, intended, value: "Retail Electricity Selling to"}) }
        </div>
      </div>
    );
  }

}

// style={getStyles(name, this)}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `100%`,
    height: `100%`,
  },
  emText: {
    margin: theme.spacing.unit * 2,
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
