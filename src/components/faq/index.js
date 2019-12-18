import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card, CardBody } from 'reactstrap';

import CustomColumn from '../news/custom.column';
import ParticlesComponent from '../user/particles';

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

        this.setState({ [event.target.name]: event.target.value })

    }

    render() {

        const { questions, general } = this.props;
        const text = "The following are some of the frequently asked questions. If you have not been helped, please contact us through the link given."

        return (
            <div className="page-content">

                <ParticlesComponent />

                <Container>
                    <Row style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
                        <Card>
                            {
                                questions && (
                                    <NoDataCard
                                        text={text}
                                        header={`Frequently asked questions`}
                                        intent={Intent.PRIMARY}
                                    />
                                )
                            }
                            <CardBody>
                                <CustomColumn sm='12' md='12' lg='12'>

                                    {

                                        general ?

                                            !general.isLoading ?

                                                questions ?

                                                    questions.subCategories ?

                                                        questions.subCategories.length !== 0 && questions.subCategories.map((category, index) => {

                                                            // if this category has question render, else don't
                                                            if (category.subCategories.length !== 0) {

                                                                return (
                                                                    <QuestionCategory key={category.name} index={index} name={category.name} >

                                                                        {
                                                                            category.subCategories.length !== 0 ? category.subCategories.map((question, index) => {

                                                                                return <QuestionListItem key={index} question={question} />

                                                                            }) : <NoDataCard header={`No data`} intent={Intent.WARNING} />
                                                                        }

                                                                    </QuestionCategory>
                                                                );

                                                            } else {

                                                                return (
                                                                    <QuestionCategory key={category.name} index={index} name={category.name}>

                                                                        <NoDataCard header={'No questions'} intent={Intent.SUCCESS} />

                                                                    </QuestionCategory>
                                                                );

                                                            }

                                                        })

                                                        : <NoDataCard header="There are no questions to show. Please contact us!!" intent={Intent.SUCCESS} />

                                                    : <NoDataCard
                                                        text={`There are no questions to show! Please check your device internet connection and refresh.`}
                                                        header={`Information!`}
                                                        intent={Intent.WARNING}
                                                    />

                                                : <div className="loader" />

                                            : <NoDataCard header={`No data`} intent={Intent.WARNING} />

                                    }

                                </CustomColumn>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>

            </div>
        );

    }

}

const mapStateToProps = (state) => {

    return {
        questions: state.cms.maincategory,
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
