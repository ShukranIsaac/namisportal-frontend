import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import './home.css';
import './marep.css'
import * as HomeActions from '../../actions/home.action';
import { HomeSubCategory } from './home.subcategory';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';

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
    
    return (
      <>
        <div className='landing-info'>
          <div className="container-fluid pl-0" style={{background: 'url(https://www.carbonbrief.org/wp-content/uploads/2015/02/electricity-grid-transformer-tower-1550x804.jpg) no-repeat center', backgroundSize: 'cover'}}>
            <div className="row">
              <div className="col-lg-6 d-flex align-items-center justify-content-center left">
                <h1 className="display-2 re-font-size" style={{color: '#FFF'}}>Welcome</h1>
              </div>
              <div className="col-lg-6 d-flex align-items-center justify-content-start right">
                <div className="jumbotron my-5 w-75 re-w text-left">
                  <h1 className="display-4 re-display-font-size">Minigrid Developers</h1>
                  <p className="lead">
                      This Portal provides comprehensive information for policy makers,
                      investors and other stakeholders interested in the development of renewable
                      energy mini grids in Malawi. 
                  </p>
                  <hr className="my-1"/>
                  <p>
                      It was developed in order to facilitate an
                      accelerated exploitation of renewable energy resources particularly in providing
                      clean and decentralized energy services to grid isolated communities of Malawi.
                      
                  </p>
                  <hr className="my-1"/>
                  <p>It was developed by the Department of Energy Affairs for Malawi Government
                      with support from UNDP and GEF.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          (general !== null && general !== undefined) && (
            !general.isLoading ? (
              home !== null ? (
                // check if home has sub categories defined and not null
                (home.subCategories != null && home.subCategories !== undefined) && (
                  <div className='app-sections'>
                    <Container>
                      <Row>

                        {
                          home.subCategories.length !== 0 ? 
                            home.subCategories.map((section, index) => {
                              // console.log(section)
                              /**
                               * Making sure this main section does not appear twice
                               * on the home component.
                               */
                              if (section.name === 'Information for Mini-Grid Developers') {
                                return null;
                              }

                              return <HomeSubCategory key={ index } subCategories={ home.subCategories } section={ section.name } />

                            })

                          : <NoDataCard header={ `No home subcategories. Please try again!` } intent={Intent.SUCCESS} style={{ textAlign: `center` }} />
                        }

                      </Row>
                    </Container>
                  </div>
                )
              ) : null
            ) : (<div className="loader" />)
          )
        }
      </>
    );

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
