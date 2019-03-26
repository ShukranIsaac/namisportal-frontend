import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Flex } from 'reflexbox';
import { Row } from 'reactstrap';

import * as NewsAction from '../../actions/news.action';

import CustomColumn from './custom.column';
import NewsListItem from './news.list.item';
import FormLegendField from '../forms/form.legend.field';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';

/**
 * News component- frontend
 * 
 * @author Isaac S. Mwakabira
 * 
 */
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

  when = (time) => {
    const t = new Date(time);
    let str, h, now = new Date();
    h = Number(now.getHours() - t.getHours());
    str = ' ' + h + ' hours ago';
    return str;

  }

  // split and splice the string passed
  splitCount = (string) => {

    return ((string.split(' ')).splice(0, 62)).join(' ');

  }

  render(){

    const { general, articles } =  this.props;

    return (
      <Fragment>
        <Row style={{ margin: '0px', marginTop: '30px', marginLeft: '60px' }}>

          <CustomColumn sm='12' md='4' lg='2' {...this.state}>

            <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

              <NavLink to="/news"><FormLegendField value="Latest news"/></NavLink>

              <NavLink to="/faq"><FormLegendField value="Ask questions"/></NavLink>

              <NavLink to="/contact"><FormLegendField value="Contact us"/></NavLink>

            </Flex>

          </CustomColumn>

          <CustomColumn sm='12' md='8' lg='9' onClick={this.toggleMainItem} {...this.state}>

            {
              general !== null ? 

                !general.isLoading ? 

                  articles.length !== 0 ? 
                  
                    articles.map(article => {

                      return <NewsListItem key={ article.title } when={ this.when } splitCount={ this.splitCount } article={ article } { ...this.props } />

                    }) : <NoDataCard text="No articles available" intent={Intent.WARNING} />
              
                : <div className="loader" /> 

              : <NoDataCard text="Ooops!! seems something is wrong." intent={Intent.WARNING} />
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
