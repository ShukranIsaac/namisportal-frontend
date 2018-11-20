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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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
          {props.names.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
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
          { this.formControls({classes, names, value: "Capacity"}) }
          { this.formControls({classes, names, value: "Technology"}) }
          { this.formControls({classes, names, value: "Hybrid"}) }
          { this.formControls({classes, names, value: "Wholesale Selling to"}) }
          { this.formControls({classes, names, value: "Own Mini-Grid"}) }
          { this.formControls({classes, names, value: "Retail Electricity Selling to"}) }
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
    height: `100%`
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
