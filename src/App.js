import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Navbar, Alignment } from "@blueprintjs/core";

import Home from './components/home'
import Contact from './components/contact'
import Directory from './components/directory'
import FAQ from './components/faq'
import GIS from './components/gis'
import TASF from './components/tasf'
import News from './components/news'
import Financing from './components/financing'
import Library from './components/library'
import Licensing from './components/licensing'

import "./App.css"
class App extends Component {

  render() {
    return (

      <Router>
        <div>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Link to="/">
                <Navbar.Heading>Malawi Mini Grids</Navbar.Heading>
              </Link>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <Navbar.Divider />
              <Link to="/">
                <Button className="bp3-minimal" icon="home" text="Home" />
              </Link>
              <Link to="/licensing">
                <Button className="bp3-minimal" icon="take-action" text="Licensing" />
              </Link>
              <Link to="/financing">
                <Button className="bp3-minimal" icon="dollar" text="Financing" />
              </Link>
              <Link to="/library">
                <Button className="bp3-minimal" icon="document" text="Library" />
              </Link>
              <Link to="/directory">
                <Button className="bp3-minimal" icon="manual" text="Directory" />
              </Link>
              <Link to="/gis">
                <Button className="bp3-minimal" icon="geosearch" text="GIS" />
              </Link>
              <Link to="/news">
                <Button className="bp3-minimal" icon="applications" text="News" />
              </Link>
              <Link to="/faq">
                <Button className="bp3-minimal" icon="help" text="FAQ" />
              </Link>
              <Link to="/tasf">
                <Button className="bp3-minimal" icon="briefcase" text="TASF" />
              </Link>
              <Link to="/contact">
                <Button className="bp3-minimal" icon="id-number" text="Contact" />
              </Link>

              <Navbar.Divider />
              <Link to="/user">
                <Button className="bp3-minimal" icon="user" />
              </Link>
              <Button className="bp3-minimal" icon="notifications" />
            <Button className="bp3-minimal" icon="cog" />
            </Navbar.Group>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route path="/licensing" component={Licensing} />
          <Route path="/financing" component={Financing} />
          <Route path="/library" component={Library} />
          <Route path="/directory" component={Directory} />
          <Route path="/gis" component={GIS} />
          <Route path="/news" component={News} />
          <Route path="/faq" component={FAQ} />
          <Route path="/tasf" component={TASF} />
          <Route path="/contact" component={Contact} />
        </div>

      </Router>
    );

  }
}

export default App;
