import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';

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
        this.props.fetchNewsArticles('News');
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
    splitCount = (string) => ((string.split(' '))
    .splice(0, 62)).join(' ');

    render() {

        const { general, articles } = this.props;

        return (
            <div className="page-content">
                <Container>
                    <Row style={{ marginTop: '20px' }}>
                        <CustomColumn sm='12' md='12' lg='12' 
                            onClick={this.toggleMainItem} 
                            {...this.state}
                        >
                            {
                                articles.subCategories && articles.subCategories.length > 0 && <NoDataCard
                                    text={`The list below shows all news articles available.`}
                                    header={`News!`}
                                    intent={Intent.PRIMARY}
                                    style={{ marginBottom: '2em', width: '100%' }}
                                />
                            }
                            {
                                articles.subCategories && articles.subCategories.length > 0 
                                ? articles.subCategories.map((article) => {
                                    return <Fragment>
                                        <NewsListItem key={article.name} 
                                            when={this.when} splitCount={this.splitCount} 
                                            article={article} {...this.props} 
                                        />
                                    </Fragment>

                                })
                                : <NoDataCard
                                text={`No articles available`}
                                header={`Information!`}
                                intent={Intent.PRIMARY}
                            />
                            }
                            {
                                general && (general.isLoading && <div 
                                    style={{ marginTop: `50px` }} 
                                    className="loader" 
                                />)
                            }
                        </CustomColumn>
                    </Row>
                </Container>
            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    errored: state.news.errored,
    general: state.general.general,
    articles: state.news.articles,
})

const mapDispatchToProps = (dispatch) => ({
    fetchNewsArticles: (name) => dispatch(NewsAction.fetchAllArticles(name)),
})

export default connect(mapStateToProps, 
    mapDispatchToProps)(News);
