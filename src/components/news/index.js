import React, { Component, Fragment } from 'react';
import { Flex } from 'reflexbox';
import { Row } from 'reactstrap';

import CustomColumn from './custom.column';
import NewsListItem from './news.list.item';
import SearchInputControl from '../forms/search.form.field';
import FormLegendField from '../forms/form.legend.field';

class News extends Component {

  constructor(){
    super()

    this.state = {
      isMainOpen: false
    }

    this.toggleMainItem = this.toggleMainItem.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  toggleMainItem = () => {

    this.setState({isOpen: !this.state.isMainOpen});

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value})

  }

  render(){

    return (
      <Fragment>
        <Row style={{ margin: '0px', marginTop: '30px', marginLeft: '60px' }}>

          <CustomColumn sm='12' md='4' lg='2' {...this.state}>

            <form autoComplete='off'>

              <SearchInputControl 
                handleChange={this.handleChange} 
                placeholder="Search for news items..."
                name="news"
              />

            </form>

            <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

              <a href="/news"><FormLegendField value="Latest news"/></a>

              <a href="/faq"><FormLegendField value="Ask questions"/></a>

              <a href="/contact"><FormLegendField value="Contact us"/></a>

            </Flex>

          </CustomColumn>

          <CustomColumn sm='12' md='8' lg='9' onClick={this.toggleMainItem} {...this.state}>

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

          </CustomColumn>

        </Row>
      </Fragment>
    );

  }

}

export default (News);
