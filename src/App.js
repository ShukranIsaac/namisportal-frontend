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

// Load Styling
import './style.css';
// import './app.css';

import "./App.css";
import Footer from './components/footer';
import NewsItemDetails from './components/news/news.item.details';

import AppHeader from './components/header/index';
import CMSIndex from './components/cms';
import ItemProfile from './components/directory/item-profile';
import Breadcrumbs from './components/breadcrumbs/crumbs/breadcrumbs';
import BreadRoute from './components/breadcrumbs/breadcrumb.route';

const defaultHeight = 0;

const wrapper = {
    minHeight: '100vh',
    position: 'relative'
}

const content = {
    paddingBottom: defaultHeight,
}

const PageNotFound = () => {
    return <span style={{ alignItems: 'center' }}>Page not found...</span>;
}

export const Wrapper = ({ component, children }) => {

    return (
        <div style={content}>
            <AppHeader />

            { component !== "GIS" ? <Breadcrumbs className="demo__crumbs" /> : null}

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
                    <BreadRoute title="Home" exact path="/" component={props => <Wrapper><Home {...props} /></Wrapper>} />
                    <UserPrivateRoute path="/cms" component={CMSIndex} />
                    <BreadRoute title="Licensing" exact path="/licensing" component={props => <Wrapper><Licensing {...props} /></Wrapper>} />
                    <BreadRoute title="Financing" exact path="/financing" component={props => <Wrapper><Financing {...props} /></Wrapper>} />
                    <BreadRoute title="Library" exact path="/library" component={props => <Wrapper><Library {...props} /></Wrapper>} />
                    <BreadRoute title="Directory" exact path="/directory" component={props => <Wrapper><Directory {...props} /></Wrapper>} />
                    <BreadRoute title="Stakeholder" exact path="/directory/:id" component={props => <Wrapper><ItemProfile {...props} /></Wrapper>} />
                    <Route exact path="/gis" render={props => <Wrapper component={`GIS`}><GIS {...props} /></Wrapper>} />
                    <BreadRoute title="News" exact path="/news" component={props => <Wrapper><News {...props} /></Wrapper>} />
                    <BreadRoute title="Article" exact path="/news/:id" component={props => <Wrapper><NewsItemDetails {...props} /></Wrapper>} />
                    <BreadRoute title="Faqs" exact path="/faqs" component={props => <Wrapper><FAQ {...props} /></Wrapper>} />
                    <BreadRoute title="Contact" exact path="/contact" component={props => <Wrapper><Contact {...props} /></Wrapper>} />
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/register" component={UserRegistration} />
                    <BreadRoute title="404 Not Found" component={ PageNotFound } />
                </Switch>
            </Router>
        </div>
    );

});
