import React, { Fragment } from 'react';

import SearchInputControl from '../forms/search.form.field';

import './library.css';

/**
 * List all documents by category groups
 * @author Isaac S. Mwakabira
 * 
 * @param {JSON} docs
 * @param {Function} handleClick
 * @param {Function} handleChange
 * @returns {Fragment} fragment
 */
export const ListLibraryDocuments = ({ docs: { resource_plan }, handleClick, handleChange }) => {
    
    return (
        <Fragment>

            <SearchInputControl 
                id="search_id"
                name="search_docs"
                placeholder="Search for specific document..."
                handleClick={ handleClick }
                handleChange={ (e) => handleChange(e) }
            />

            <ul>
                {
                    resource_plan && resource_plan.map( (object, index) => {
                        
                        return (
                            <Fragment>
                                <li id={index}>
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

}
