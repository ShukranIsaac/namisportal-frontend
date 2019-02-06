import React, { Component } from 'react';
import { connect } from 'react-redux';

import './home.css'
import Footer from '../footer';
import { WhichHeaderComponent } from '../which.header.component';
import * as HomeActions from '../../actions/home.action';
import { HomeSubCategory, filterSection } from './home.subcategory';

/**
 * @author Paul Sembereka
 * @author Isaac S. Mwakabira
 * 
 */
class Home extends Component {
  
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {

    this.props.fetchHomeDetails();

  }

  render(){

    const { home } = this.props;
    
    if (home.length === 0) {
      return <div className="loading">Loading...</div>
    }

    const main_section = filterSection(home, "Information for Mini-Grid Developers");

    return (
      <>
        <div className='landing-info'>
          <div className = "row top-card">
            <div className="card">
              <div className="card-body">
                  <h4 className="heading">
                    <a href="/">{ main_section.name }</a>
                  </h4>
                  <p>{ main_section.about }</p>
              </div>
            </div>
          </div>
        </div>
        <div className = "card-container">
          <div className = "row">

            <HomeSubCategory props={ home } section="Licencing" />

            <HomeSubCategory props={ home } section="Financing" />

            <HomeSubCategory props={ home } section="Library" />

          </div>

          <br></br>
          <div className = "row">

            <HomeSubCategory props={ home } section="GIS" /> 

            <HomeSubCategory props={ home } section="Directory" /> 

            <HomeSubCategory props={ home } section="TASF" /> 

          </div>
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
    fetchHomeDetails: () => { dispatch(HomeActions.fetchHomeDetails()) },
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WhichHeaderComponent('app_header')(Home));
