import React, { Fragment } from 'react';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

/**
 * Component to list all requests so far placed by each
 * individual institution.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const ListFinancingRequests = ({
    category,
    handleClick
}) => {

    // console.log(category)
    if(category === null && category === undefined) {
        return <div>No categories</div>
    }

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="Edit Category"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <p>
                {
                    category !== undefined && category.about
                }
            </p>

        </Fragment>
    );

}