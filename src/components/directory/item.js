import React, { Component } from 'react';
import {Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './directory.css';
import Config from '../../config';

class Item extends Component {

  render(){

    const { classes, stakeholder } = this.props;

    console.log(stakeholder.image);

    if(stakeholder !== null && stakeholder !== undefined) {

      return (
        <Row>
          <Col lg='12'>
            <div style={{margin: '2.5px 0'}}>
              <Card id={ stakeholder._id} className={classes.card}>
                <CardBody className={classes.paddindUnset}>
                  <div style={{  display: 'grid', gridTemplateColumns: '20% 80%'}}>

                    <CardImg src={ `https://dry-springs-19364.herokuapp.com` + stakeholder.image } />

                    <div>
                      <h4>
                        <a href={`${ '/directory/' + stakeholder.name }`} onClick={ (e) => this.props.handleClick(e) }>
                          { stakeholder.name }
                        </a>
                      </h4>
                      <p>{ stakeholder.about }</p>
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
