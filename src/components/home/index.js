import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import './home.css';
import * as HomeActions from '../../actions/home.action';
import { HomeSubCategory, filterSection } from './home.subcategory';
import { ProgressLoader } from '../loader.component.wrapper';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import ParticlesComponent from '../user/particles';

/**
 * @author Paul Sembereka
 * @author Isaac S. Mwakabira
 * 
 */
class Home extends Component {

  componentDidMount() {

    this.props.fetchHome('Home');

  }

  render(){
    
    const { home, general } = this.props;

    if (home !== null) {
      if (home.subCategories !== null && home.subCategories !== undefined) {

        const main_section = filterSection(home.subCategories, "Information for Mini-Grid Developers");
     
        return (
          <>
            <div className='landing-info'>

              <ParticlesComponent />
              
              <Container>
                <Row>
                  <Col sm='12' md='12' lg={{ size: 8, offset: 2 }}>
                    <div className="card">
                      <div className="card-body">
                          <h4 className="heading">
                            <a href="/">{ main_section.name }</a>
                          </h4>
                          <p>{ main_section.about.substring(0, 500) }</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className='app-sections'>
              <Container>
                <Row>

                  {
                    home.subCategories.length !== 0 ? 
                      home.subCategories.map((section, index) => {

                        /**
                         * Making sure this main section does not appear twice
                         * on the home component.
                         */
                        if (section.name === 'Information for Mini-Grid Developers') {
                          return null;
                        }

                        return <HomeSubCategory key={ index } props={ home.subCategories } section={ section.name } />

                      })

                    : <NoDataCard header={ `No home subcategories. Please try again!` } intent={Intent.SUCCESS} style={{ textAlign: `center` }} />
                  }

                </Row>
              </Container>
            </div>
          </>
        );

      } else {

        return <div className="loader" />
        
      }
    }
  }
}

const mapStateToProps = (state) => {

  return {
    home: state.home.home,
    general: state.general.general,
  }

}

const mapDispatchToProps = (dispatch) => {
  
  return {
    fetchHome: (name) => { dispatch(HomeActions.fetchHomeDetails(name)) },
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressLoader('home')(Home));
