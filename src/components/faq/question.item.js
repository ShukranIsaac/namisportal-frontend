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
                        Is there a support Policy framework for mini-grid development in Malawi?
                    </h4>
                    <div variant="caption">
                        <i style={{ fontSize: '20px', fontStyle: bold }}>Answer: </i>
                        <p>Minigrid development is supported by the draft Energy Policy 2018 which is advocating for private participation in electricity generation in form of IPPs.The policy also advocate for the Rural Electrification Fund to be funding of off-grid renewable energy technologies which includes minigrids.The draft Policy has adopted a New Global Tracking Framework for measuring electricity access in the country.The new framework takes into account connections from minigrids when measuring electricity access.</p>
                        <p>Minigrid development is also supported in the Malawi Renewable Energy Strategy(MRES) which is promoting clean minigrids and views them as a most economically viable technology solution in areas with a population which has a density above 250 inhabitants per square kilometre and are situated more than 5km from the medium-voltage grid line. The MRES also advocate for capacity building for mnigrid operators; Favourable licencing; Development of quality Minigrid standards; Development of cost-reflective tariffs, among others.</p>
                    </div>
                </div>
    
            </Row>
        );

    } else {

        return <Row />

    }

}