import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card } from 'reactstrap';

import CustomColumn from '../news/custom.column';

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
export const FAQ = ({
    fetchFAQuestions,
    ...props
}) => {
    useEffect(() => {
        fetchFAQuestions("Faqs");
    }, [fetchFAQuestions])

    const { questions, general } = props;
    const text = "The following are some of the frequently asked questions. If you have not been helped, please contact us through the link given."

    return (
        <div className="page-content">
            <Container>
                <Row>
                    {
                        questions && (
                            <NoDataCard
                                text={text}
                                header={`Frequently asked questions`}
                                intent={Intent.PRIMARY}
                            />
                        )
                    }
                    
                    <CustomColumn sm='12' md='12' lg='12'>
                    {
                        questions ? (questions.subCategories &&
                        questions.subCategories.length !== 0 
                        && questions.subCategories.map(({
                                name,
                                subCategories
                            }, index) => {
                                // if this category has question render, 
                                // else don't
                                if (subCategories.length !== 0) {
                                    return (
                                    <QuestionCategory 
                                        key={name} index={index} 
                                        name={name} 
                                    >
                                    {
                                        subCategories.length !== 0 
                                        ? subCategories.map((question, index) => {

                                            return <QuestionListItem 
                                            key={index} 
                                            question={question} 
                                        />

                                        }) : <NoDataCard 
                                            header={`No Frequently asked questions`} 
                                            intent={Intent.PRIMARY} 
                                        />
                                    }
                                    </QuestionCategory>);

                                } else {
                                    return (
                                        <QuestionCategory 
                                            key={name} 
                                            index={index} 
                                            name={name}
                                        >
                                            <NoDataCard 
                                                header={'No Frequently asked questions'} 
                                                intent={Intent.SUCCESS} 
                                            />
                                        </QuestionCategory>
                                    );
                                }
                            }) 
                        )
                        : <Card>
                            <NoDataCard 
                                text="No Frequently asked questions"
                                header="FAQS" 
                                intent={Intent.PRIMARY} 
                            />
                        </Card>
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

const mapStateToProps = (state) => ({
    questions: state.cms.maincategory,
    general: state.general.general,
})

const mapDispatchToProps = (dispatch) => ({
    fetchFAQuestions: (name) => { dispatch(CMSAction.fetchCategory(name)) },
    subCategory: (id) => { dispatch(CMSAction.fetchSubCategory(id)) },
})

export default connect(mapStateToProps, 
    mapDispatchToProps)(FAQ);
