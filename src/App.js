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

const Wrapper = ({ footer, children }) => {

    return (
        <div style={content}>
            <AppHeader />

            {children}

            {!footer ? <Footer /> : null}
        </div>
    )

}

export default withRouter(() => {

    return (
        <div style={wrapper}>
            <Router>
                <Switch>
                    <Route exact path="/" render={props => <Wrapper><Home {...props} /></Wrapper>} />
                    <UserPrivateRoute path="/cms" component={CMSIndex} />
                    <Route exact path="/licensing" render={props => <Wrapper><Licensing {...props} /></Wrapper>} />
                    <Route exact path="/financing" render={props => <Wrapper><Financing {...props} /></Wrapper>} />
                    <Route exact path="/library" render={props => <Wrapper><Library {...props} /></Wrapper>} />
                    <Route exact path="/directory" render={props => <Wrapper><Directory {...props} /></Wrapper>} />
                    <Route exact path="/directory/:id" render={props => <Wrapper><ItemProfile {...props} /></Wrapper>} />
                    <Route exact path="/gis" render={props => <Wrapper footer={false}><GIS {...props} /></Wrapper>} />
                    <Route exact path="/news" render={props => <Wrapper><News {...props} /></Wrapper>} />
                    <Route exact path="/news/:id" render={props => <Wrapper><NewsItemDetails {...props} /></Wrapper>} />
                    <Route exact path="/faqs" render={props => <Wrapper><FAQ {...props} /></Wrapper>} />
                    <Route exact path="/contact" render={props => <Wrapper><Contact {...props} /></Wrapper>} />
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/register" component={UserRegistration} />
                </Switch>
            </Router>
        </div>
    );

});
