import React, { Fragment } from 'react';

// import SearchInputControl from '../forms/search.form.field';

import './library.css';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import { UserProfile, profile } from '../user/user.profile';

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
    docs, general,
    handleClick, classes
}) => {

    // authenticated user
    const user = UserProfile.get();
    console.log(docs)

    return (
        <Fragment>

            <ButtonControl
                intent={Intent.NONE}
                value="New Document"
                name="create"
                handleClick={e => handleClick(e)}
                disabled={!profile.canWrite({ user })}
            />

            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />

            {/* <SearchInputControl 
                id="search_id"
                name="search_docs"
                placeholder="Search for specific document..."
                handleChange={ (e) => handleChange(e) }
            /> */}

            {
                general && (
                    !general.isLoading ? (
                        (docs !== null && docs !== undefined) && (
                            (docs.documents !== null && docs.documents !== undefined) && (
                                docs.documents.length !== 0 ? (
                                    <Fragment>

                                        <ul>
                                            {
                                                docs.documents.map((document, index) => {

                                                    return (
                                                        <Fragment key={document.name}>
                                                            <li id={index} key={document.name}>
                                                                {
                                                                    !profile.canWrite({ user })
                                                                        ? <a href="#/">{document.name}</a>
                                                                        : <a
                                                                            href={`${'/library/' + document.name}`}
                                                                            onClick={(e) => handleClick(e)}
                                                                            name="edit"
                                                                            id={document.name}
                                                                        >
                                                                            {document.name}
                                                                        </a>
                                                                }
                                                            </li>
                                                        </Fragment>
                                                    );

                                                })
                                            }
                                        </ul>

                                    </Fragment>
                                ) : <div>No library documents</div>
                            )
                        )
                    ) : (
                            <div style={{ marginTop: `50px` }} className="loader" />
                        )
                )
            }
        </Fragment>
    );
}));