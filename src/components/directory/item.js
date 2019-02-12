import React, { Component } from 'react';
import {Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './directory.css'


class Item extends Component {
  render(){

    const { classes } = this.props;

    
    return (
        <Row>
        <Col lg='12'>
            <div style={{margin: '2.5px 0'}}>
            <Card className={classes.card}>
                    <CardBody className={classes.paddindUnset}>
                    <div style={{  display: 'grid', gridTemplateColumns: '20% 80%'}}>
                        <CardImg src={require("../../../src/assets/img/malawi.png")}/>
                        <div>
                        <h4> Lizard </h4>
                        <p>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </p>
                        </div>
                    </div>
                
                </CardBody>
            </Card>
            </div>
            
        </Col>
        </Row> 
    );
  }
}

const styles = theme => ({
  card: {
    margin: '0 auto',
    maxWidth: '80%',
    cursor: 'pointer'
  },
  paddindUnset: {
    padding: 'unset'
  },
});


Item.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Item);
