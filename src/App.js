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

import AppHeader, { CMSCustomHeader } from './components/header/index';
import CMSIndex from './components/cms';
import { UserContext } from './components/user/user.context';

class App extends Component {

  constructor(){
    super()

    this.state = {
      height: 0
    }

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
    console.log(this.state)
    return (
      <div style={wrapper}>

        <Router>

          <div style={content}>

            <UserContext.Consumer>
              {  
                context => {
                  console.log(context.state.isWebsite);
                  
                  switch (context.state.isWebsite) {
                    case true:
                      
                      return <AppHeader />;

                    case false:
                      
                      return <CMSCustomHeader />;

                    default:

                      return <AppHeader />;
                  }
                  
                }
              }
            </UserContext.Consumer>

            <Route exact path="/" component={Home} />
            <UserPrivateRoute path="/cms" component={CMSIndex} />
            <Route exact path="/licensing" component={Licensing} />
            <Route exact path="/financing" component={Financing} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/directory" component={Directory} />
            <Route exact path="/gis" component={GIS} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news/:id" component={NewsItemDetails} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" render={ () => <UserLogin /> } />
            <Route exact path="/register" render={ () => <UserRegistration /> } />
            
          </div>

        </Router>

        <Footer/>

      </div>
    );

  }
}

export default App;
