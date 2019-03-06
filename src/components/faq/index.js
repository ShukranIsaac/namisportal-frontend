import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import CustomColumn from '../news/custom.column';
import SearchInputControl from '../forms/search.form.field';
import FormLegendField from '../forms/form.legend.field';
import { Flex } from 'reflexbox';

import * as CMSAction from '../../actions/cms.action';
import { NoDataCard } from '../card.text';
import { QuestionListItem } from './question.item';
import QuestionCategory from './question.category';
import { Intent } from '@blueprintjs/core';

/**
 * Frequently asked questions
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class FAQ extends Component {

  componentDidMount() {
    // fetch faqs
    this.props.fetchFAQuestions("Faqs");
  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value})

  }

  render(){

    const { questions } = this.props;
    const text = "The following are some of the frequently asked questions. If you have not been helped, please contact us through the link given."
    
    if(questions !== null && questions !== undefined) {

      const { subCategories } = questions;
      // check if subcategories is not null, ie. has data
      if(subCategories !== null || subCategories.length !== 0) {

        return (
          <>
    
            <Row style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
    
              <CustomColumn sm='12' md='4' lg='2'>
    
                <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>
    
                  <a href="/contact"><FormLegendField value="Contact us"/></a>
    
                </Flex>
    
              </CustomColumn>
    
              <CustomColumn sm='12' md='12' lg='10'>
    
                <NoDataCard text={ text } header={ `Frequently asked questions` } intent={Intent.PRIMARY} />
    
                <form autoComplete='off' style={{ marginTop: '20px' }}>
    
                  <SearchInputControl 
                    handleChange={this.handleChange} 
                    placeholder="Search for previous asked questions..."
                    name="Faqs"
                  />
    
                </form>
    
                {
                  subCategories.length !== 0 && subCategories.map((category, index) => {
                    // console.log(category);

                    // if this category has question render, else don't
                    if(category.subCategories.length !== 0) {

                      return (
                        <QuestionCategory index={ index } name={ category.name } >
  
                          {
                            category.subCategories.length !== 0 ? category.subCategories.map((question, index) => {

                              return <QuestionListItem question={ question } />

                            }) : <NoDataCard header={ `'No data'` } intent={Intent.WARNING} />
                          }
  
                        </QuestionCategory>
                      );

                    } else {

                      return (
                        <QuestionCategory index={ index } name={ category.name }>
  
                          <NoDataCard header={ 'No questions' } intent={Intent.WARNING} />
  
                        </QuestionCategory>
                      );

                    }

                  })

                }
    
              </CustomColumn>
    
            </Row>
    
          </>
        );

      } else {

        return <NoDataCard header="There are no questions to show. Please contact us!!" intent={Intent.SUCCESS} />

      }

    } else {

      return <div className="loader" />

    }

  }

}

const mapStateToProps = (state) => {

  return {
    questions: state.cms.subcategory,
  }

}

const mapDispatchToProps = (dispatch) => {
  
  return {
    fetchFAQuestions: (name) => { dispatch(CMSAction.fetchCategory(name)) },
    subCategory: (id) => { dispatch(CMSAction.fetchSubCategory(id)) },
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
