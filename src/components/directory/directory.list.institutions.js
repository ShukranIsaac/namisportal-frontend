import React, { Fragment } from 'react';
// import SearchInputControl from '../forms/search.form.field';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

/**
 * Lists all institutions in the directory
 * or registered with the Department of Energy through the system
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Object} directory 
 * @param {Function} handleClick
 * @param {Function} handleChange
 * 
 * @returns {Fragment} directory  
 */
export const ListDirectoryInstitution = ({
    stakeholders,
    handleClick,
}) => {

    // console.log(stakeholders);
    if(stakeholders === null && stakeholders === undefined) {
        return <div>No stakeholders</div>
    }

    return (
        <Fragment>

            {/* <SearchInputControl 
                id="search_id"
                name="directory"
                placeholder="Search for specific institution..."
                handleClick={ handleClick }
                handleChange={ (e) => { handleChange(e) } }
            /> */}
            <ButtonControl 
                intent={Intent.NONE} 
                value="New Stakeholder"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <ul>
                {
                    stakeholders && stakeholders.map((stakeholder, index) => {
                        
                        return (
                            <Fragment key={index}>
                                <li id={stakeholder._id} key={stakeholder._id}>
                                    <a 
                                        href={ `${ 'directory/' + stakeholder.name }` } 
                                        onClick={ (e) => { handleClick(e) } }
                                        name="edit"
                                        id={stakeholder._id}
                                    >
                                        { stakeholder.name }
                                    </a>
                                </li>
                            </Fragment>
                        );

                    })
                }
            </ul>

        </Fragment>
    );

}