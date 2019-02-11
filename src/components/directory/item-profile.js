import React, { Component } from 'react';
import {Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import { Jumbotron, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/AlternateEmail'
import WebIcon from '@material-ui/icons/Web'
import PostIcon from '@material-ui/icons/LocalPostOffice'

import './directory.css'


class ItemProfile extends Component {
  render(){

    const { classes } = this.props;

    
    return (
        <div>
            <Jumbotron>
                <div className={classes.headerPart}>
                    <h4>Escom</h4>
                    <img className={classes.image} src={require("../../../src/assets/img/escom-logo.png")}/>
                </div>
                
                
                <h4>Our Mission</h4>
                <p>
                    This is a simple hero unit, a simple Jumbotron-style component for 
                    calling extra attention to featured content or information.
                </p>

                <h4>Our Mission</h4>
                <p>
                    This is a simple hero unit, a simple Jumbotron-style component for 
                    calling extra attention to featured content or information.
                </p>
                <hr className="my-2" />
                <h4>About US</h4>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                
            </Jumbotron>


            <Row className={classes.contactCards}>
                <Col lg='3' md='12' sm='12'>
                    <Card className={classes.cardHeight}>
                    <CardBody >
                        <PostIcon style={{ fontSize: 50 }}/>
                        <h4 class="card-title">Postal Address:</h4>
                        <p>P.O.Box 7617, Zomba Malawi</p>
                    </CardBody>
                    </Card>
                </Col>
                <Col lg='3' md='12' sm='12'>
                    <Card className={classes.cardHeight}>
                    <CardBody >
                        <PhoneIcon style={{ fontSize: 50 }}/>
                        <h4 class="card-title">Call Us:</h4>
                        <p>(+47) 925 05 362</p>
                    </CardBody>
                    </Card>
                </Col>
                <Col lg='3' md='12' sm='12'>
                    <Card className={classes.cardHeight}>
                    <CardBody>
                        <EmailIcon style={{ fontSize: 50 }}/>
                        <h4 class="card-title">Email Us:</h4>
                        <p><a href="mailto:psemberekajr@gmail.com">psemberekajr@gmail.com</a></p>
                    </CardBody>
                    </Card>
                </Col>
                <Col lg='3' md='12' sm='12'>
                    <Card className={classes.cardHeight}>
                    <CardBody>
                        <WebIcon style={{ fontSize: 50 }}/>
                        <h4 class="card-title">Website:</h4>
                        <p><a href="https://github.com/Smembe812">@Smembe812</a></p>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
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
