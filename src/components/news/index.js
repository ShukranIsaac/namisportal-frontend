import React, { Component, Fragment } from 'react';
import { Flex } from 'reflexbox';

import NewsColumn from './news.column';
import NewsListItem from './news.list.item';
import SearchInputControl from './search.form.field';
import FormLegendField from './form.legend.field';

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
        <Flex
          wrap
          row
          align='top'
          justify='left'
          m={1}
          w={1}
          p={1}
          style={{ margin: '0px' }}
        >

          <NewsColumn w={1/4} p={2} {...this.state}>

            <SearchInputControl 
              handleChange={this.handleChange} 
              placeholder="Search for news items..."
              name="news"
            />

            <Flex
              wrap
              column
              align='top'
              justify='left'
              m={1}
              w={1}
              p={1}
              style={{ borderLeft: 'solid #fff000'}}
            >

              <FormLegendField value="Latest news"/>

              <FormLegendField value="Ask questions"/>

              <FormLegendField value="Contact us"/>

              <FormLegendField value="Support"/>

            </Flex>

          </NewsColumn>

          <NewsColumn w={1/2} p={1} onClick={this.toggleMainItem} {...this.state}>

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

            <NewsListItem {...this.props} />

          </NewsColumn>

          <NewsColumn w={1/5} p={3} />

        </Flex>
      </Fragment>
    );

  }

}

export default (News);
