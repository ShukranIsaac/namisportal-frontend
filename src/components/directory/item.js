import React, { Component } from 'react';
import { Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './directory.css';

class Item extends Component {

  render(){

    const { classes, stakeholder } = this.props;

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
                        <NavLink 
                          to={{
                              pathname: `/directory/` + stakeholder.name,
                              state: {
                                stakeholder: stakeholder
                              }
                          }}
                        >
                          { stakeholder.name }
                        </NavLink>
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
