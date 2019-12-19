import React, { Fragment } from 'react';

import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile, { profile } from '../user/user.profile';

/**
 * List of all news items
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Props} Props 
 */
const ListNewsArticles = ({ articles, handleClick, general, classes }) => {

    const user = UserProfile.get();

    return (
        <Fragment>

            <ButtonControl
                intent={Intent.NONE}
                value="New Article"
                name="create"
                handleClick={e => handleClick(e)}
                disabled={!profile.canWrite({ user })}
            />

            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />
            <div className={classes.margin} />

            <ul>
                {
                    general && (
                        !general.isLoading ?
                            articles !== null && articles.length !== 0 ?
                                articles.map(({ _id, title }, index) => {

                                    return (
                                        <li key={index}>
                                            {
                                                !profile.canWrite({ user })
                                                    ? <a href="#/">{title}</a>
                                                    : <a
                                                        name="edit" id={_id}
                                                        key={_id} href={`${'/faqs/' + title}`}
                                                        onClick={(e) => handleClick(e)}
                                                        disabled={!profile.canWrite({ user })}
                                                    >
                                                        {title}
                                                    </a>
                                            }
                                        </li>
                                    );

                                })
                                : <NoDataCard
                                    header={`No articles`}
                                    style={{ marginTop: `30px` }}
                                    intent={Intent.WARNING}
                                />

                            : <div className="loader" />
                    )
                }
            </ul>

        </Fragment>
    );

}

export default withStyles(styles)(ListNewsArticles);