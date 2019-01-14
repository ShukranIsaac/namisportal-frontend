import React, { Component } from 'react';
import { Callout,Collapse, Button, Card, Elevation } from '@blueprintjs/core'
import { Flex, Box } from 'reflexbox'
import Panel from '../financing/Panel';

class Financing extends Component {
  render(){
    const containerStyle = {
      width: '80%',
      margin: '0 auto',
    }
    const header = {
      textAlign: 'center',
    }
    const financing = {
      marginBottom: 8,
      borderRadius: 0
    }
    const flexStyle = {
      margin: 'auto',
      background: '#15B371',
      padding: '12%'
    }

    const keyFacts = {
      duration: 'time',
      CompetentAuthority: 'string', 
      prerequisites: [],
      requiredDocuments: []

    }

    return (
      <div style={{width: '100%'}}>
        <div style={header}>
        <Flex 
          p={4}
          align='center'
          justify='center'
          m={1}
          w={1}
          style={flexStyle}>
          <Box w={1} p={1} align='center'>
          <Card elevation={Elevation.TWO}>
          <Card interactive={false} elevation={Elevation.ZERO} style={financing}>
              <p><strong>Licensing</strong></p>
              <p>
              The process for requesting financing support entails the following 
              steps. Further details are available by clicking on each step.

              </p>
          </Card>
            <Panel heading="1. Concept Note"/>
            <Panel heading="2. Concept Note Appraisal"/>
            <Panel heading="3. Prefeasibily Study and draft Business Plan"/>
            <Panel heading="4. Application for Grant"/>
            <Panel heading="5. Preliminary Evaluation of Grant Application"/>
            <Panel heading="6. Feasibility Report and Business Plan"/>
            <Panel heading="7. Final Evaluation of Grant Application"/>
            <Panel heading="8. Disbursement"/>
          </Card>
         
          </Box>
          
          
          </Flex>
        </div>
      </div>
    );
  }
}

export default Financing;


/*import React, { Component } from 'react';
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
              <>{ props.capacity }</>
              : <>`${ 'Step' }`</>
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
*/
