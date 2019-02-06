import React, { Component, Fragment } from 'react';
import { Flex } from 'reflexbox';

import CustomColumn from '../news/custom.column';
import SearchInputControl from '../forms/search.form.field';
import FormLegendField from '../forms/form.legend.field';

class FAQ extends Component {

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value})

  }

  render(){

    return (
      <Fragment>
        <Flex wrap row={true} align='top' justify='center' m={1} w={1} p={1} style={{ margin: '0px' }}>

          <CustomColumn w={1/4} p={2} {...this.state}>

            <SearchInputControl 
              handleChange={this.handleChange} 
              placeholder="Search for previous asked questions..."
              name="Faqs"
            />

            <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

              <a href="/faq"><FormLegendField value="Ask questions"/></a>

              <a href="/contact"><FormLegendField value="Contact us"/></a>

            </Flex>

          </CustomColumn>

          <CustomColumn w={1/2} p={1} onClick={this.toggleMainItem} {...this.state}>

            <Flex justify="center">
              Nothing to show!!
            </Flex>

          </CustomColumn>

          <CustomColumn w={1/5} p={3}>
            
          </CustomColumn>

        </Flex>
      </Fragment>
    );

  }

}

export default (FAQ);
