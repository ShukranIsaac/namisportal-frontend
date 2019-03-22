import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import { Row } from 'reactstrap';

import * as NewsAction from '../../actions/news.action';

import CustomColumn from './custom.column';
import NewsListItem from './news.list.item';
// import SearchInputControl from '../forms/search.form.field';
import FormLegendField from '../forms/form.legend.field';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';

class News extends Component {

  constructor(){
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

    this.setState({isOpen: !this.state.isMainOpen});

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value})

  }

  render(){

    const { general, articles } =  this.props;

    return (
      <Fragment>
        <Row style={{ margin: '0px', marginTop: '30px', marginLeft: '60px' }}>

          <CustomColumn sm='12' md='4' lg='2' {...this.state}>

            <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

              <a href="/news"><FormLegendField value="Latest news"/></a>

              <a href="/faq"><FormLegendField value="Ask questions"/></a>

              <a href="/contact"><FormLegendField value="Contact us"/></a>

            </Flex>

          </CustomColumn>

          <CustomColumn sm='12' md='8' lg='9' onClick={this.toggleMainItem} {...this.state}>

            {
              general !== null ? 

                !general.isLoading ? 

                  articles.length !== 0 ? 
                  
                    articles.map(article => {

                      return <NewsListItem key={ article.title } article={ article } { ...this.props } />

                    }) : <NoDataCard text="No articles available" intent={Intent.WARNING} />
              
                : <div className="loader" /> 

              : <div className="loader" />
            }

          </CustomColumn>

        </Row>
      </Fragment>
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
