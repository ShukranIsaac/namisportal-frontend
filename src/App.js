import React from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Home from './components/home';
import Directory from './components/directory';
import FAQ from './components/faq';
import News from './components/news';
import Library from './components/library';
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

const wrapper = {
    minHeight: '100vh',
    position: 'relative'
}

export const Wrapper = ({ 
    children, 
    ...props 
}) => (
    <div style={{ paddingBottom: 0 }}>
        <AppHeader />

        <Breadcrumbs />
        
        {children}

        <Footer {...props} />
    </div>
);

export default withRouter(() => {
    return (
        <div style={wrapper}>
            <Router>
                <Switch>
                    <BreadRoute path="/" exact render={props => <Wrapper {...props}><Home {...props} /></Wrapper>} />
                    <UserPrivateRoute path="/admin" component={CMSIndex} />
                    <BreadRoute title="Library" exact path="/library" render={props => <Wrapper {...props}><Library {...props} /></Wrapper>} />
                    <BreadRoute title="Directory" exact path="/directory" render={props => <Wrapper {...props}><Directory /></Wrapper>} />
                    <BreadRoute title="Stakeholder" exact path="/directory/:id" render={props => <Wrapper {...props}><ItemProfile {...props} /></Wrapper>} />
                    <BreadRoute title="News" exact path="/news" render={props => <Wrapper {...props}><News {...props} /></Wrapper>} />
                    <BreadRoute title="Article" exact path="/news/:id" render={props => <Wrapper {...props}><NewsItemDetails {...props} /></Wrapper>} />
                    <BreadRoute title="Faqs" exact path="/faqs" render={props => <Wrapper {...props}><FAQ {...props} /></Wrapper>} />
                    <BreadRoute exact path="/login" render={props => <UserLogin {...props} />} />
                    <BreadRoute exact path="/register" render={props => <UserRegistration {...props} />} />
                    <BreadRoute exact path="/forgotpassword" render={props => <ForgotPassword {...props} /> } />
                    <BreadRoute title="404 Not Found" component={ props => <PageNotFound {...props} />} />
                </Switch>
            </Router>
        </div>
    );
});
