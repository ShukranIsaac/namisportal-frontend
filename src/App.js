import React, { Component } from 'react';
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

class App extends Component {
  constructor(){
    super()
    this.state = {height: 0}
  }

  componentDidMount() {
    const height = document.getElementById('footer').clientHeight;
    this.setState({height})
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

          <AppHeader />

          <Route exact path="/" component={Home} />
          <UserPrivateRoute exact path="/cms" component={Home} />
          <Route path="/licensing" component={Licensing} />
          <Route path="/financing" component={Financing} />
          <Route path="/library" component={Library} />
          <Route path="/directory" component={Directory} />
          <Route path="/gis" component={GIS} />
          <Route exact path="/news" component={News} />
          <Route exact path="/news/:id" component={NewsItemDetails} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={UserLogin} />
          <Route path="/register" component={UserRegistration} />
          
        </div>

      </Router>
      <Footer/>
      </div>
    );

  }
}

export default App;
