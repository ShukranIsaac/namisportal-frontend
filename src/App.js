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

import ForgotPassword from './components/user/user.forgot.password';

// Load Styling
import './style.css';

import "./App.css";
import Footer from './components/footer';
import NewsItemDetails from './components/news/news.item.details';

import AppHeader from './components/header/index';
import CMSIndex from './components/cms';
import ItemProfile from './components/directory/item-profile';
import Breadcrumbs from './components/breadcrumbs/crumbs/breadcrumbs';
import BreadRoute from './components/breadcrumbs/breadcrumb.route';
import PageNotFound from './components/page.not.found';

const defaultHeight = 0;

const wrapper = {
    minHeight: '100vh',
    position: 'relative'
}

const content = {
    paddingBottom: defaultHeight,
}

export const Wrapper = ({ component, children }) => {

    return (
        <div style={content}>
            <AppHeader />

            {component !== "GIS" ? <Breadcrumbs className="demo__crumbs" /> : null}

            {children}

            {component !== "GIS" ? <Footer /> : null}
        </div>
    )

}

export default withRouter(() => {
    
    return (
        <div style={wrapper}>
            <Router>
                <Switch>
                    <BreadRoute path="/" exact render={props => <Wrapper><Home {...props} /></Wrapper>} />
                    <UserPrivateRoute path="/cms" component={CMSIndex} />
                    <BreadRoute title="Licensing" exact path="/licensing" render={props => <Wrapper><Licensing {...props} /></Wrapper>} />
                    <BreadRoute title="Financing" exact path="/financing" render={props => <Wrapper><Financing {...props} /></Wrapper>} />
                    <BreadRoute title="Library" exact path="/library" render={props => <Wrapper><Library {...props} /></Wrapper>} />
                    <BreadRoute title="Directory" exact path="/directory" render={props => <Wrapper><Directory {...props} /></Wrapper>} />
                    <BreadRoute title="Stakeholder" exact path="/directory/:id" render={props => <Wrapper><ItemProfile {...props} /></Wrapper>} />
                    <Route exact path="/gis" render={props => <Wrapper component={`GIS`}><GIS {...props} /></Wrapper>} />
                    <BreadRoute title="News" exact path="/news" render={props => <Wrapper><News {...props} /></Wrapper>} />
                    <BreadRoute title="Article" exact path="/news/:id" render={props => <Wrapper><NewsItemDetails {...props} /></Wrapper>} />
                    <BreadRoute title="Faqs" exact path="/faqs" render={props => <Wrapper><FAQ {...props} /></Wrapper>} />
                    <BreadRoute title="Contact" exact path="/contact" render={props => <Wrapper><Contact {...props} /></Wrapper>} />
                    <BreadRoute exact path="/login" render={props => <UserLogin {...props} />} />
                    <BreadRoute exact path="/register" render={props => <UserRegistration {...props} />} />
                    <BreadRoute exact path="/forgotpassword" render={props => <ForgotPassword {...props} /> } />
                    <BreadRoute title="404 Not Found" render={PageNotFound} />
                </Switch>
            </Router>
        </div>
    );

});
