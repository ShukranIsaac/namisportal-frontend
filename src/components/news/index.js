import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card } from 'reactstrap';

import ParticlesComponent from '../user/particles';

import * as NewsAction from '../../actions/news.action';

import CustomColumn from './custom.column';
import NewsListItem from './news.list.item';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import * as moment from 'moment';

/**
 * News component- frontend
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class News extends Component {

    constructor() {
        super()

        this.state = {
            isMainOpen: false
        }

        this.toggleMainItem = this.toggleMainItem.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        // fetch all news items when this component mounts
        this.props.fetchNewsArticles();
    }

    toggleMainItem = () => {

        this.setState({ isOpen: !this.state.isMainOpen });

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }

    when = (time) => {
        const t = new Date(time);
        return moment().subtract(t.getUTCHours() / 24, 'days').calendar();

    }

    // split and splice the string passed
    splitCount = (string) => {

        return ((string.split(' ')).splice(0, 62)).join(' ');

    }

    render() {

        const { general, articles } = this.props;

        return (
            <div className="page-content">

                <ParticlesComponent />

                <Container>
                    <Row style={{ margin: '0px', marginTop: '30px', marginLeft: '60px' }}>
                        <Card>

                            <NoDataCard
                                text={`The list below shows all news articles available.`}
                                header={`News!`}
                                intent={Intent.PRIMARY}
                                style={{ marginBottom: '2em', width: '100%' }}
                            />

                            <CustomColumn sm='12' md='12' lg='12' onClick={this.toggleMainItem} {...this.state}>

                                {
                                    general && !general.isLoading ?

                                        articles.length !== 0 ?

                                            articles.map(article => {

                                                return <NewsListItem key={article.title} when={this.when} splitCount={this.splitCount} article={article} {...this.props} />

                                            })
                                            : <NoDataCard
                                                text={`No articles available`}
                                                header={`Information!`}
                                                intent={Intent.WARNING}
                                            />

                                        : <div className="loader" />
                                }

                            </CustomColumn>
                        </Card>
                    </Row>
                </Container>
            </div>
        );

    }

}

const mapStateToProps = (state) => {

    return {
        errored: state.news.errored,
        general: state.general.general,
        articles: state.news.articles,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchNewsArticles: () => dispatch(NewsAction.fetchAllArticles()),
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(News);
