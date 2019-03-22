import React from 'react';
import {Card, CardBody, Col, Row } from 'reactstrap'
import { Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/AlternateEmail'
import WebIcon from '@material-ui/icons/Web'
import PostIcon from '@material-ui/icons/LocalPostOffice'

import './directory.css'
import { redirect } from '../user/user.redirect';

/**
 * Renders a single directory stakeholder profile details
 * 
 * @author Paul Sembereka
 * @author Isaac S. MWakabira
 * 
 * @param {Object} classes
 * @param {Object} location 
 */
const ItemProfile = ({ classes, location }) => {

  const { state: { stakeholder } } = location;
  
  return (
    <div>
        <Jumbotron>
            <div className={classes.headerPart}>
                <h4>{ stakeholder.name }</h4>
            </div>
            
            <h4>Our Mission</h4>
            <p>{ stakeholder.mission }</p>

            <h4>Our Vision</h4><p>{ stakeholder.vision }</p>

            <hr className="my-2" />
            <h4>About US</h4><p>{ stakeholder.about }</p>
            
        </Jumbotron>

        <Row className={classes.contactCards}>
            <Col lg='3' md='12' sm='12'>
                <Card className={classes.cardHeight}>
                  <CardBody >
                      <PostIcon style={{ fontSize: 50 }}/>
                      <h4 className="card-title">Postal Address:</h4>
                      <p>P.O.Box 7617, Zomba Malawi</p>
                  </CardBody>
                </Card>
            </Col>
            <Col lg='3' md='12' sm='12'>
                <Card className={classes.cardHeight}>
                  <CardBody >
                      <PhoneIcon style={{ fontSize: 50 }}/>
                      <h4 className="card-title">Call Us:</h4>
                      <p>{ stakeholder.contacts.telephone }</p>
                  </CardBody>
                </Card>
            </Col>
            <Col lg='3' md='12' sm='12'>
                <Card className={classes.cardHeight}>
                  <CardBody>
                      <EmailIcon style={{ fontSize: 50 }}/>
                      <h4 className="card-title">Email Us:</h4>
                      <p>
                        <a href={`${ 'mailto:' + stakeholder.contacts.email }`}>
                          { stakeholder.contacts.email }
                        </a>
                      </p>
                  </CardBody>
                </Card>
            </Col>
            <Col lg='3' md='12' sm='12'>
                <Card className={classes.cardHeight}>
                  <CardBody>
                      <WebIcon style={{ fontSize: 50 }}/>
                      <h4 className="card-title">Website:</h4>
                      <p>
                        <a 
                          href={ stakeholder.contacts.website } 
                          onClick={ (e) => redirect.toExternalLink({ 
                              url: stakeholder.contacts.website, event: e 
                            }) 
                          }
                        >
                          { stakeholder.contacts.website }
                        </a>
                      </p>
                  </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  );

}

const styles = theme => ({
  headerPart: {
    marginBottom: 'inherit'
  },
  paddindUnset: {
    padding: 'unset'
  },
  image: {
      maxWidth: '200px',
      maxHeight: '200px'
  },
  contactCards: {
    textAlign: 'center'
  },
  cardHeight: {
    minHeight: '212px'
  }
});


ItemProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ItemProfile);
