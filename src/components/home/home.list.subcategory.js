import React, { Fragment } from 'react';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

/**
 * List all home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const ListHomeSubcategory = ({
    category: { subCategories },
    handleClick,
}) => {
    // console.log(subCategories)
    if(subCategories === null && subCategories === undefined) {
        return <div>No sub-categories</div>
    }

    return (
        <Fragment>
            
            <ButtonControl 
                intent={Intent.NONE} 
                value="New SubCategory"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <Divider />

            <ul>
                {
                    subCategories !== undefined && subCategories.map(({ name, _id }) => {

                        return(
                            <li key={name + _id}>
                                <a name="edit" id={_id} key={_id} href="/#" onClick={(e) => handleClick(e)}>
                                    { name }
                                </a>
                            </li>
                        );

                    })
                }
            </ul>

        </Fragment>
    );

}
