import React, { Fragment } from 'react';

import MultiStepForm from '../forms/form.multistep';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for financing support.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const FinancingRequestSupport = () => {

    return (
        <Fragment>
            <div >

                <div>
                    <MultiStepForm steps={ steps }/>
                </div>

                <div className="container app-footer">
                    <h6>Press 'Enter' or click on progress bar for next step.</h6>
                </div>

            </div>
        </Fragment>
    );

}

const steps = 
    [
        {name: 'Concept Note', },
        {name: 'Note Appraisal', },
        {name: 'Prefeasibility Study and draft Business Plan', },
        {name: 'Application for Grant', },
        {name: 'Preliminary Evaluation of Grant Application', },
        {name: 'Feasibility Report and Business Plan', },
        {name: 'Final Evaluation of Grant Application', },
        {name: 'Disbursement', }
    ];