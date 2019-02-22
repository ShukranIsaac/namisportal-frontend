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
import ItemProfile from './components/directory/item-profile';

class App extends Component {

  constructor(){
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
          <>
            <Route exact path="/" render={() => (<div style={content}><AppHeader /> <Home/> <Footer/></div>)} />
            <UserPrivateRoute path="/cms" component={CMSIndex} />
            <Route exact path="/licensing" render={() => (<div style={content}><AppHeader /> <Licensing/> <Footer/></div>)} />
            <Route exact path="/financing" render={() => (<div style={content}><AppHeader /> <Financing/> <Footer/></div>)} />
            <Route exact path="/library" render={() => (<div style={content}><AppHeader /> <Library/> <Footer/></div>)} />
            <Route exact path="/directory" render={() => (<div style={content}><AppHeader /> <Directory { ...this.props } { ...this.state} /> <Footer/></div>)} />
            <Route exact path="/directory/:id" render={() => (<div style={content}><AppHeader /> <ItemProfile { ...this.props } { ...this.state} /> <Footer/></div>)} />
            <Route exact path="/gis" render={() => (<><AppHeader /> <GIS/></>)} />
            <Route exact path="/news" render={() => (<div style={content}><AppHeader /> <News/> <Footer/></div>)} />
            <Route exact path="/news/:id" render={() => (<div style={content}><AppHeader /> <NewsItemDetails/> <Footer/></div>)} />
            <Route exact path="/faq" render={() => (<div style={content}><AppHeader /> <FAQ/> <Footer/></div>)} />
            <Route exact path="/contact" render={() => (<div style={content}><AppHeader /> <Contact/> <Footer/></div>)} />
            <Route exact path="/login" render={ () => <UserLogin /> } />
            <Route exact path="/register" render={ () => <UserRegistration /> } />
          </> 

        </Router>
        
      </div>
    );

  }
}

export default withRouter(App);
