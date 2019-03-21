import React, { Component } from 'react';
import { Container,Card, CardBody, Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DirectoryItem from './item';

import './directory.css';
// import ItemProfile from './item-profile';
import * as Stakeholder from '../../actions/stakeholder.action';
import { redirect } from '../user/user.redirect';


class Directory extends Component {

  componentDidMount() {

    // fetches all stakeholders
    this.props.fetchStakeholders();

  }

  handleClick = (e) => {
    // console.log(this.props.stakeholders_list[1].name)
    // console.log(this.props)
    // e.preventDefault();
    // this.props.history.push(`/directory/` + this.props.stakeholders_list[1].name);
    return redirect.to({ url: `/directory/` + this.props.stakeholders_list[1].name, from: this.props });

  }

  render(){

    const { classes, stakeholders_list } = this.props;
    // console.log(this.props.match)
    if(stakeholders_list !== null && stakeholders_list !== undefined) {

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
                          Here is a list of some of the stakeholders we work together with
                        </p>
                      </CardBody>
                    </Card>
                  </div>
              </Col> 
            </Row>

            {
              stakeholders_list.map((stakeholder, index) => {

                return <DirectoryItem key={ stakeholder.name } stakeholder={ stakeholder } handleClick={ this.handleClick } />
                
              })
            }
            
            {
              stakeholders_list.length > 5 ? 
              (<Row>
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
              </Row>) : <Row />
            }
  
          </Container>
          
        </div>
          
      );

    } else {

      return <div className="loader" />

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
