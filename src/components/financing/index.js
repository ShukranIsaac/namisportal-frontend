import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Card, CardBody, Row } from 'reactstrap'
import { withStyles } from '@material-ui/core';
import ParticlesComponent from '../user/particles';
import * as CMSAction from '../../actions/cms.action';

/**
 * Renders financing component
 * 
 * @author Paul Sembereka (Pablo)
 * @author Isaac S. Mwakabira
 * 
 */
class Financing extends Component {

  componentDidMount() {

    // check if we already data for this category in state
    if(this.props.maincategory !== null) {

    }

    // fetch category
    this.props.category('Financing');

  }

  render(){

    const { maincategory, general } = this.props;

    const header = {
      textAlign: 'center',
    }

    return (
      <div className = "page-content">

        <ParticlesComponent />
        
        <Container>
          <Row>
            {
              general && (
                !general.isLoading ? (
                  (maincategory !== undefined && maincategory !== null) && (
                    maincategory.subCategories[0] !== undefined && (
                      <Card>
                        <CardBody>
                          <p style={header}><strong>{ maincategory.subCategories[0].name }</strong></p>
                          <div dangerouslySetInnerHTML={{ __html: maincategory.subCategories[0].about }} />
                        </CardBody>
                      </Card>
                    )
                  )
                ) : <p className="loader" />
              )
            }
          </Row>
        </Container>
      </div> 
    );
    
  }

}

const styles = {
  header: {
    textAlign: 'center',
  },
  financing: {
    marginBottom: 8,
    borderRadius: 0
  }
}

const mapStateToProps = (state) => {
    
  return {
    general: state.general.general,
    maincategory: state.cms.maincategory,
  };

}

const mapDispatchToProps = (dispatch) => {

  return {
      // Financing
      category: (name) => { dispatch(CMSAction.fetchCategory(name)) },
  };

}

Financing.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Financing));
