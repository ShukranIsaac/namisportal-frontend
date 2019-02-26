import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Card, CardBody, Row } from 'reactstrap'
import { withStyles } from '@material-ui/core';

import * as CMSAction from '../../actions/cms.action';

/**
 * Renders financing component
 * 
 * @author Paul Sembereka (Pablo)
 * 
 */
class Financing extends Component {

  componentDidMount() {
    // fetch category
    this.props.category('Financing');
  }

  render(){

    const { classes, subcategory } = this.props;


    if(subcategory !== undefined && subcategory !== null) {
    const header = {
      textAlign: 'center',
    }
        if(subcategory.subCategories[0] !== undefined ){
          return (
            <div className = "page-content">
              <Container>
                <Row>
                    <Card>
                      <CardBody>
                        <p style={header}><strong>{ subcategory.subCategories[0].name }</strong></p>
                        <div dangerouslySetInnerHTML={{ __html: subcategory.subCategories[0].about }} />
                      </CardBody> 
                    </Card>
                </Row>
              </Container>
              
            </div>
              
          );
        }else{
          return <div className="loader" />
        }
          
    
    } else {
      // else return loader
      return <div className="loader" />
    }
    
    
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
    subcategory: state.cms.subcategory,
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
