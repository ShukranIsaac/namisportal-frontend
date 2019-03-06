import React from 'react';

import { bold } from 'react-icons-kit/feather/bold';
import { Row } from 'reactstrap';

/**
 * Render this question
 * 
 * @author Isaac S. Mwakabira
 * @param {Object} text 
 */
export const QuestionListItem = ({ question }) => {

    if (question !== null) {
        // console.log(question)

        return (
            <Row>
                      
                <div>
                    <h4 className="heading" style={{ marginTop: '20px' }}>
                    <i style={{ fontSize: '20px', fontStyle: bold }}>Q. </i>
                        { question.name }
                    </h4>
                    <div variant="caption">
                        <i style={{ fontSize: '20px', fontStyle: bold }}>Answer: </i>
                        <div dangerouslySetInnerHTML={{ __html: question.about }} />
                    </div>
                </div>
    
            </Row>
        );

    } else {

        return <Row />

    }

}