import React, { Fragment } from 'react';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for financing support or edit an already placed request.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const EditFinancingRequestSupport = ({
    handleClick,
}) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="List Category"
                name="list"
                handleClick={e => handleClick(e) }
            />

            Edit financing

        </Fragment>
    );

}