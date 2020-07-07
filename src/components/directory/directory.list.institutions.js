import React, { Fragment } from 'react';
import { Row, } from 'reactstrap';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile, { profile } from '../user/user.profile';
import ButtonControls from '../cms/cms.controls';

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
export const ListDirectoryInstitution = (withStyles(styles)(({
    stakeholders,
    handleClick,
    general, classes
}) => {
    // authenticated user
    const user = UserProfile.get();

    return (
        <Fragment>
            <ButtonControls 
                keys={['create']}
                user={ user }
                handleClick={handleClick}
            />

            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />

            <Divider />

            <ul className="list-group list-group-flush">
            {
                general && (!general.isLoading ? (
                (stakeholders && stakeholders.length > 0) 
                    ? (<Fragment>
                        {
                            stakeholders && stakeholders.map(({
                                _id,
                                name
                            }, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li id={_id} 
                                            key={_id}
                                            className="list-group-item">
                                            {
                                                !profile.canEdit({ user })
                                                ? <a href="#/">{name}</a>
                                                : <a
                                                    href={`${'directory/' + name}`}
                                                    onClick={(e) => { handleClick(e) }}
                                                    name="edit"
                                                    id={_id}
                                                >
                                                    {name}
                                                </a>
                                            }
                                        </li>
                                    </Fragment>
                                );
                            })
                        }
                    </Fragment>) : <div>No stakeholders</div>) 
                    : <Row><div style={{ marginTop: `40px` }} 
                        className="loader" />
                    </Row>
                )
            }
            </ul>
        </Fragment>
    );
}))