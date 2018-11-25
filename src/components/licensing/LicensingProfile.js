import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MainContentWrapper from '../MainContentWrapper';

class LicensingProfile extends Component {

  expPanel = (props) => {

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary className={ props.classes.button } expandIcon={<ExpandMoreIcon />}>
          <Typography className={ props.classes.heading }>
            {
              props.capacity !== undefined && props.capacity !== null ?
              <div>{ props.capacity }</div> : <div>{`Step`}</div>
            }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>details of listed steps</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

  }

  licenseTypeHeading = (props) => {

    return (
      <Card className={props.classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>{ props.headerText }</b>
          </Typography>
          <Typography className={props.classes.title} color="textSecondary" gutterBottom>
            The process for obtaining a { (props.headerText).toLowerCase() } for the profile defined
            above entails the following steps. Further details are available by
            clicking on each step
          </Typography>
        </CardContent>
      </Card>
    );

  }

  render(){

    const { classes, capacity } = this.props;

    return (
      <div>
        { this.licenseTypeHeading({classes, headerText: "Generation Licence"}) }
        <div className={classes.expPanel}>
          { this.expPanel({classes, capacity})}
        </div>
        { this.licenseTypeHeading({classes, headerText: "Distribution Licence"}) }
        <div className={classes.expPanel}>
          { this.expPanel({classes, capacity})}
        </div>
      </div>
    );
  }

}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: `100%`,
  },
  content: {
    height: `100%`,
    width: `80%`,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 0,
    minWidth: 0, // So the Typography noWrap works
  },
  expPanel: {
    margin: theme.spacing.unit * 2,
  },
  title: {
    fontSize: 14,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    width: '100%',
    borderRadius: '0',
    background: '#BFCCD6',
    fontSize: '1.1em'
  }
});

LicensingProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((MainContentWrapper)(LicensingProfile));
