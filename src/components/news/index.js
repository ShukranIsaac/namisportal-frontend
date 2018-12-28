import React, { Component } from 'react';
import { Flex } from 'reflexbox';

import NewsColumn from './news.column';
import NewsListItem from './news.list.item';

class News extends Component {

  constructor(){
    super()

    this.state = {
      isMainOpen: false
    }

    this.toggleMainItem = this.toggleMainItem.bind(this);

  }

  toggleMainItem(){

    this.setState({isOpen: !this.state.isMainOpen});

  }

  render(){

    return (
      <>
        <Flex
          wrap
          align='top'
          justify='center'
          m={1}
          w={1}
          p={3}
        >

          <NewsColumn w={1/2} p={1} onClick={this.toggleMainItem} {...this.state}>

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

          </NewsColumn>

        </Flex>
      </>
    );

  }

}

export default News;
