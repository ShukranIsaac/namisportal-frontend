import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Elevation } from '@blueprintjs/core'
import { Container, Row } from 'reactstrap';
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
    // console.log(subcategory);

    if(subcategory !== undefined && subcategory !== null) {

      return (
        <div className = "page-content">
          <Container>
            <Row>
            <div>
              <Card elevation={Elevation.TWO}>
                <Card interactive={false} elevation={Elevation.ZERO} className={classes.financing}>
                    <p className={classes.header}><strong>{ subcategory.subCategories[0].name }</strong></p>
                    { subcategory.subCategories[0].about }
                </Card>
              </Card>
            </div>
            </Row>
          </Container>
          
        </div>  
      );
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
