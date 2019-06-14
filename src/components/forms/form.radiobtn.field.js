import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import { InputLabel } from '@material-ui/core';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

/**
 * Select a feature to add
 * 
 * @author Isaac S. Mwakabira
 */
const RadioButtons = ({
  classes, selectedValue,
  handleRadioBtnChange,
}) => {

  return (
    <div>

      <Radio
        checked={selectedValue === 'marep_center'}
        onChange={ (e) => handleRadioBtnChange(e) }
        value="marep_center"
        name="marep_center"
        aria-label="Marep Center"
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
      <InputLabel shrink htmlFor="option-open-radio">Marep Center</InputLabel>

      <Radio
        checked={selectedValue === 'transformer'}
        onChange={ (e) => handleRadioBtnChange(e) }
        value="transformer"
        name="transformer"
        aria-label="Transformer"
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
      <InputLabel shrink htmlFor="option-open-radio">Transformer</InputLabel>

      <Radio
        checked={selectedValue === 'power_plant'}
        onChange={ (e) => handleRadioBtnChange(e) }
        value="power_plant"
        name="power_plant"
        aria-label="Power Plant"
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
      <InputLabel shrink htmlFor="option-open-radio">Power Plant</InputLabel>

      <Radio
        checked={selectedValue === 'substation'}
        onChange={ (e) => handleRadioBtnChange(e) }
        value="substation"
        name="substation"
        aria-label="SubStation"
        classes={{
          root: classes.root,
          checked: classes.checked,
        }}
      />
      <InputLabel shrink htmlFor="option-open-radio">Sub-station</InputLabel>

      <Radio
          checked={selectedValue === 'distribution_line'}
          onChange={ (e) => handleRadioBtnChange(e) }
          value="distribution_line"
          name="distribution_line"
          aria-label="Distribution Line"
          classes={{
              root: classes.root,
              checked: classes.checked,
          }}
      />
      <InputLabel shrink htmlFor="option-open-radio">Distribution Line</InputLabel>
    </div>
  );

}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
