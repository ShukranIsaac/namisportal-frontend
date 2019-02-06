import React, { Fragment } from 'react';
import SearchInputControl from '../forms/search.form.field';

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
    directory,
    handleClick, 
    handleChange
}) => {

    return (
        <Fragment>

            <SearchInputControl 
                id="search_id"
                name="directory"
                placeholder="Search for specific institution..."
                handleClick={ handleClick }
                handleChange={ (e) => { handleChange(e) } }
            />

            <ul>
                {
                    directory && directory.map( (object, index) => {
                        
                        return (
                            <Fragment key={object.name}>
                                <li id={index} key={object.name}>
                                    <a 
                                        href="/directory/e8g9tyjGh" 
                                        onClick={ (e) => { handleClick(e) } }
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