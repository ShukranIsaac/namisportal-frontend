import React, { Fragment } from 'react';

import SearchInputControl from '../forms/search.form.field';

import './library.css';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';

/**
 * List all documents by category groups
 * @author Isaac S. Mwakabira
 * 
 * @param {JSON} docs
 * @param {Function} handleClick
 * @param {Function} handleChange
 * @returns {Fragment} fragment
 */
export const ListLibraryDocuments = (withStyles(styles)(({ 
    docs: { resource_plan }, 
    handleClick, classes,
    handleChange 
}) => {
    
    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Document"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <Divider />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            {
                resource_plan ? (
                    <Fragment>
                        <SearchInputControl 
                            id="search_id"
                            name="search_docs"
                            placeholder="Search for specific document..."
                            handleChange={ handleChange }
                        />
            
                        <ul>
                            {
                                resource_plan && resource_plan.map( (object, index) => {
                                    
                                    return (
                                        <Fragment key={object.name}>
                                            <li id={index} key={object.name}>
                                                <a 
                                                    href={ `${ '/library/' + object.name }` } 
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
            
                    </Fragment>) : <div style={{ marginTop: `50px` }} className="loader" />
                }
            </Fragment>
        );
    })
);