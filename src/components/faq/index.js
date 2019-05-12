import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

    const { questions, general } = this.props;
    const text = "The following are some of the frequently asked questions. If you have not been helped, please contact us through the link given."

    return (
      <Row style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>

        <CustomColumn sm='12' md='4' lg='2'>

          <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

            <NavLink to="/contact"><FormLegendField value="Contact us"/></NavLink>

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
          
            general !== null && general !== undefined ? 

              !general.isLoading ? 

                questions !== null && questions !== undefined ? 

                  questions.subCategories !== null && questions.subCategories !== undefined ? 

                    questions.subCategories.length !== 0 && questions.subCategories.map((category, index) => {
                      
                      // if this category has question render, else don't
                      if(category.subCategories.length !== 0) {
                    
                        return (
                          <QuestionCategory key={ category.name } index={ index } name={ category.name } >
                    
                            {
                              category.subCategories.length !== 0 ? category.subCategories.map((question, index) => {
                    
                                return <QuestionListItem key={ index } question={ question } />
                    
                              }) : <NoDataCard header={ `No data` } intent={Intent.WARNING} />
                            }
                    
                          </QuestionCategory>
                        );
                    
                      } else {
                    
                        return (
                          <QuestionCategory key={ category.name } index={ index } name={ category.name }>
                    
                            <NoDataCard header={ 'No questions' } intent={Intent.SUCCESS} />
                    
                          </QuestionCategory>
                        );
                    
                      }
                  
                    })

                  : <NoDataCard header="There are no questions to show. Please contact us!!" intent={Intent.SUCCESS} />
                
                : <NoDataCard header="There are no questions to show!!" intent={Intent.WARNING} /> 
              
              : <div className="loader" />

            : <NoDataCard header={ `No data` } intent={Intent.WARNING} />

          }

        </CustomColumn>

      </Row>
    );

  }

}

const mapStateToProps = (state) => {

  return {
    questions: state.cms.subcategory,
    general: state.general.general,
  }

}

const mapDispatchToProps = (dispatch) => {
  
  return {
    fetchFAQuestions: (name) => { dispatch(CMSAction.fetchCategory(name)) },
    subCategory: (id) => { dispatch(CMSAction.fetchSubCategory(id)) },
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
