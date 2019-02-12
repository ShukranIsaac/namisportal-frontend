import React, { Component, Fragment } from 'react';
import { Card, CardBody, Row, Container } from 'reactstrap'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ContactForm from './contact.form';
import './style.css'

class Contact extends Component {

  render(){

    const { classes } = this.props;

    return (
      <Fragment>
        <div className = "page-content">
          <Container>
            
            <Row>
                <Card>
                  <CardBody style={{textAlign: 'center'}}>
                    <h4><strong>Contact Us</strong></h4>
                    <p>
                      The Working Group welcomes questions and comments about this site.
                      Please use the form below or contacts here given to contact us.
                    </p>
                    <p>
                      <br />
                      <h4>For any questions:</h4>
                      <p>
                        Email us at <a href="mailto:questions@grid.mw" className={classes.link}> questions@grid.mw </a>
                      </p>
                      <br />
                      <h4>Physical Address:</h4>
                      <p>
                        Mini-grids Malawi,<br />890 West Point<br />Blantyre
                      </p>
                    </p>
                  </CardBody> 
                </Card>
            </Row>

            <Row>
                <Card className={classes.width100}>
                  <CardBody>
                    <h4 style={{textAlign: 'center'}}>Feel free to ask anything</h4>
                    <ContactForm />
                  </CardBody> 
                </Card>
            </Row>
          </Container>
          
        </div>
      </Fragment>
    );

  }
}

const styles = theme => ({
  width100: {
    width: '100%'
  },
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
