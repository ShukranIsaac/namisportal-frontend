import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import './home.css';
import Footer from '../footer';
import * as HomeActions from '../../actions/home.action';
import { HomeSubCategory, filterSection } from './home.subcategory';
import { ProgressLoader } from '../loader.component.wrapper';

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
    
    const { home } = this.props;

    if (home.subCategories === null || home.subCategories === undefined) {
      return <div className="loader" />
    }

    const main_section = filterSection(home.subCategories, "Information for Mini-Grid Developers");
    
    return (
      <>
        <div className='landing-info'>
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

                <HomeSubCategory props={ home.subCategories } section="Licensing" />

                <HomeSubCategory props={ home.subCategories } section="GIS" />

                <HomeSubCategory props={ home.subCategories } section="Library" />

                <HomeSubCategory props={ home.subCategories } section="Financing" />

                <HomeSubCategory props={ home.subCategories } section="Directory" /> 

                <HomeSubCategory props={ home.subCategories } section="News" /> 

              </Row>
            </Container>
          </div>

        <Footer/>
      </>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    home: state.home.home
  }

}

const mapDispatchToProps = (dispatch) => {
  
  return {
    fetchHome: (name) => { dispatch(HomeActions.fetchHomeDetails(name)) },
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressLoader('home')(Home));
