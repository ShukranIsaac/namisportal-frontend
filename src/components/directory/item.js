import React, { Component } from 'react';
import {Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './directory.css'


class Item extends Component {

  render(){

    const { classes, stakeholders_list } = this.props;

    return (
      <Row>
        <Col lg='12'>
          <div style={{margin: '2.5px 0'}}>
            <Card id={stakeholders_list && stakeholders_list[1]._id} className={classes.card} onClick={ (e) => this.props.handleClick(e) }>
              <CardBody className={classes.paddindUnset}>
                <div style={{  display: 'grid', gridTemplateColumns: '20% 80%'}}>
                    <CardImg src={require("../../../src/assets/img/malawi.png")}/>
                    <div>
                    <h4> { stakeholders_list && stakeholders_list[1].name } </h4>
                    <p>{ stakeholders_list && stakeholders_list[1].about }</p>
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
