import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/home';
import Contact from './components/contact';
import Directory from './components/directory';
import FAQ from './components/faq';
import GIS from './components/gis';
import News from './components/news';
import Financing from './components/financing';
import Library from './components/library';
import Licensing from './components/licensing';
import UserLogin from './components/user/user.login';
import UserRegistration from './components/user/user.register';

import UserPrivateRoute from './components/user/private.route';

import "./App.css";
import Footer from './components/footer';
import NewsItemDetails from './components/news/news.item.details';

import AppHeader from './components/header/index';
import CMSIndex from './components/cms';

class App extends Component {

  constructor({match}){
    super()

    this.state = {
      height: 0
    }

  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (document.getElementById('footer') !== null){
      const height = document.getElementById('footer').clientHeight;
      this.setState({height})
    }
    
  }

  render() {

    const wrapper = {
      minHeight: '100vh',
      position: 'relative'
    }

    const content = {
      paddingBottom: this.state.height,
    }
    return (
      <div style={wrapper}>

        <Router>

          <div style={content}>

         
            <Route exact path="/" render={() => (<><AppHeader /> <Home/> <Footer/></>)} />
            <UserPrivateRoute path="/cms" component={CMSIndex} />
            <Route exact path="/licensing" render={() => (<><AppHeader /> <Licensing/> <Footer/></>)} />
            <Route exact path="/financing" render={() => (<><AppHeader /> <Financing/> <Footer/></>)} />
            <Route exact path="/library" render={() => (<><AppHeader /> <Library/> <Footer/></>)} />
            <Route exact path="/directory" render={() => (<><AppHeader /> <Directory/> <Footer/></>)} />
            <Route exact path="/gis" render={() => (<><AppHeader /> <GIS/></>)} />
            <Route exact path="/news" render={() => (<><AppHeader /> <News/> <Footer/></>)} />
            <Route exact path="/news/:id" render={() => (<><AppHeader /> <NewsItemDetails/> <Footer/></>)} />
            <Route exact path="/faq" render={() => (<><AppHeader /> <FAQ/> <Footer/></>)} />
            <Route exact path="/contact" render={() => (<><AppHeader /> <Contact/> <Footer/></>)} />
            <Route exact path="/login" render={ () => <UserLogin /> } />
            <Route exact path="/register" render={ () => <UserRegistration /> } />
            
          </div>

        </Router>
        
      </div>
    );

  }
}

export default withRouter(App);
