import React, { Component, Fragment } from 'react';
import { Card, CardBody, Row, Container } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ContactForm from './contact.form';
import './style.css'

import * as UserAuthAction from '../../actions/user.action';

class Contact extends Component {

  componentDidMount() {

    // fetch
    // this.props.fetchContact('Contact');

  }

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
                      Please use the email, physical address or form below to contact us.
                    </p>
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
                  </CardBody> 
                </Card>
            </Row>

            <Row>
                <Card className={classes.width100}>
                  <CardBody>
                    <h4 style={{textAlign: 'center'}}>Feel free to ask anything</h4>
                    <ContactForm { ...this.props } />
                  </CardBody> 
                </Card>
            </Row>
          </Container>
          
        </div>
      </Fragment>
    );

  }
}

const mapStateToProps = (state) => {
    
  return {
      contact_us: state.user.contact_us,
      contact: state.user.contact,
  };

}

const mapDispatchToProps = (dispatch) => {

  return {
      // fetch contact details
      fetchContact: (name) => { dispatch(UserAuthAction.fetchContact(name)) },
      // contact us message, don't authenticate this route
      // since any user of the system can send a message.
      contactUs: (data, user) => { dispatch(UserAuthAction.contact(data, user)) },
  };

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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Contact));
