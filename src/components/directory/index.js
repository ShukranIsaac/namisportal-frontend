import React, { Component } from 'react';
import { 
  Container,Card, CardBody, CardImg, Col, Row, 
  Pagination, PaginationItem, PaginationLink 
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DirectoryItem from './item'

import './directory.css';
// import ItemProfile from './item-profile';
import * as Stakeholder from '../../actions/stakeholder.action';


class Directory extends Component {

  componentDidMount() {

    // fetches all stakeholders
    this.props.fetchStakeholders();

  }

  render(){

    const { classes, stakeholders_list } = this.props;

    // progress bar
    if(stakeholders_list === null && stakeholders_list === undefined) {
      return <div className="loader" />
    }
    
    return (
      <div className = "page-content">
        <Container>
          <Row>
            <Col lg='12'>
              <div style={{margin: '2.5px 0'}}>
                <Card className={classes.headerCard}>
                    <CardBody className={classes.paddindUnset}>
                    <h5><strong>Directory</strong></h5>
                      <p>
                        Here a list of some of the stakeholders we work together with
                      </p>
                    </CardBody>
                  </Card>

                </div>
            </Col> 
          </Row>

          <Row>
            <Col lg='12'>
              <div style={{margin: '2.5px 0'}}>
                <Card className={classes.card}>
                      <CardBody className={classes.paddindUnset}>
                        <div style={{  display: 'grid', gridTemplateColumns: '20% 80%'}}>
                          <CardImg src={require("../../../src/assets/img/escom-logo.png")}/>
                          <div>
                            <h4> { stakeholders_list && stakeholders_list[0].name } </h4>
                            <p>{ stakeholders_list && stakeholders_list[0].about }</p>
                          </div>
                        </div>
                    
                    </CardBody>
                </Card>
              </div>
              
            </Col>


          </Row>

          <DirectoryItem { ...this.props } />
          
          <Row>
            
          <Pagination aria-label="Page navigation example" className={classes.paginationStuff}>
            <PaginationItem>
              <PaginationLink className={classes.previous} previous href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
          </Pagination>
          </Row>

          
        </Container>
        
      </div>
        
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
  headerCard: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  previous: {
    borderTopLeftRadius: 'unset',
    borderBottomLeftRadius: 'unset'
  },
  paginationStuff: {
    margin: '5px auto'
  },
});


Directory.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    
  return {
      stakeholders_list: state.stakeholder.stakeholders_list,
  };

}

const mapDispatchToProps = (dispatch) => {

  return {
      // stakeholders
      fetchStakeholders: () => { dispatch(Stakeholder.fetchAllStakeholders()) },
  };

}

export default withStyles(styles, { 
  withTheme: true 
})(connect(mapStateToProps, mapDispatchToProps)(Directory));
