import React, { Fragment } from 'react';

import SearchInputControl from '../forms/search.form.field';

import './library.css';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

/**
 * List all documents by category groups
 * @author Isaac S. Mwakabira
 * 
 * @param {JSON} docs
 * @param {Function} handleClick
 * @param {Function} handleChange
 * @returns {Fragment} fragment
 */
export const ListLibraryDocuments = ({ 
    docs: { resource_plan }, 
    handleClick, 
    handleChange 
}) => {
    
    // check if resource is defined
    if (resource_plan) {
        
        return (
            <Fragment>
    
                <ButtonControl 
                    intent={Intent.NONE} 
                    value="New Document"
                    name="create"
                    handleClick={e => handleClick(e) }
                />
    
                <SearchInputControl 
                    id="search_id"
                    name="search_docs"
                    placeholder="Search for specific document..."
                    handleClick={ handleClick }
                    handleChange={ handleChange }
                />
    
                <ul>
                    {
                        resource_plan && resource_plan.map( (object, index) => {
                            
                            return (
                                <Fragment key={object.name}>
                                    <li id={index} key={object.name}>
                                        <a 
                                            href="/library/e8g9tyjGh" 
                                            onClick={ (e) => handleClick(e) }
                                            name="edit"
                                            id={object.name}
                                        >
                                            { object.name }
                                        </a>
                                    </li>
                                </Fragment>
                            );
    
                        })
                    }
                </ul>
    
            </Fragment>
        );

    } else {

        return <div className="loader" />

    }

}
