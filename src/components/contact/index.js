import React, { Component } from 'react';
import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import ContactForm from './contact.form';

class Contact extends Component {

  render(){

    const { classes } = this.props;

    return (
      <>

        <Flex
          wrap
          align='top'
          justify='center'
          m={1}
          w={1}
          p={3}
          className='landing-info'>
          <Box w={1/2} p={1}>
            <Card elevation={Elevation.TWO}>
              <Typography variant="h5" component="h3">
                Contact Us
              </Typography>
              <br />
              <Typography variant="caption">
              The Working Group welcomes questions and comments about this site.
              Please use the form or contacts here given to contact us.
              </Typography>
              <Typography variant="caption">
                <br />
                For any questions:
                <br />
                Email us at <a href="#sub-labels-and-columns" className={classes.link}>
                  questions@grid.mw
                </a>
                <br /><br />
                Physical Address:<br />
                Mini-grids Malawi,<br />890 West Point<br />Blantyre
              </Typography>
            </Card>
          </Box>
          <Box w={1/2} p={1}>

            <Card elevation={Elevation.TWO}>

              <ContactForm />

            </Card>

          </Box>
        </Flex>

      </>
    );

  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: `100%`,
  },
  details: {
    alignItems: 'center',
  },
  helper: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Contact);
