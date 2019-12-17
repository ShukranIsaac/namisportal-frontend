import React from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

const defaultHeight = 0;

const wrapper = {
    minHeight: '100vh',
    position: 'relative'
}

const content = {
    paddingBottom: defaultHeight,
}

const Wrapper = (props) => {

    return (
        <div style={content}>
            <AppHeader />
            {props.children}
            <Footer />
        </div>
    )

}

const App = () => {

    return (
        <div style={wrapper}>
            <Router>
                <Switch>
                    <Route exact path="/" render={props => <Wrapper><Home {...props} /></Wrapper>} />
                    <UserPrivateRoute path="/cms" component={CMSIndex} />
                    <Route exact path="/licensing" render={props => <Wrapper><Licensing {...props} /></Wrapper>} />
                    <Route exact path="/financing" render={props => <Wrapper><Financing {...props} /></Wrapper>} />
                    <Route exact path="/library" render={props => <Wrapper><Library {...props}/></Wrapper>} />
                    <Route exact path="/directory" render={props => <Wrapper><Directory {...props}/></Wrapper>} />
                    <Route exact path="/directory/:id" render={props => <Wrapper><ItemProfile {...props} /></Wrapper>} />
                    <Route exact path="/gis" render={props => (<><AppHeader /> <GIS {...props}/></>)} />
                    <Route exact path="/news" render={props => <Wrapper><News {...props}/></Wrapper>} />
                    <Route exact path="/news/:id" render={props => <Wrapper><NewsItemDetails {...props} /></Wrapper>} />
                    <Route exact path="/faqs" render={props => <Wrapper><FAQ {...props}/></Wrapper>} />
                    <Route exact path="/contact" render={props => <Wrapper><Contact {...props}/></Wrapper>} />
                    <Route exact path="/login" render={() => <UserLogin />} />
                    <Route exact path="/register" render={() => <UserRegistration />} />
                </Switch>
            </Router>
        </div>
    );

}

export default withRouter(App);
