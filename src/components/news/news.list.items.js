import React, { Fragment } from 'react';

import { Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile, { profile } from '../user/user.profile';
import ButtonControls from '../cms/cms.controls';

/**
 * List of all news items
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Props} Props 
 */
const ListNewsArticles = ({ 
    articles, 
    handleClick, 
    general, 
    classes 
}) => {

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

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />

            {
                articles !== null && articles.length === 0 && (<NoDataCard
                    header={`No articles`}
                    intent={Intent.SUCCESS}
                />)
            }

            <ul >
                {
                    articles !== null && 
                    (articles.length > 0 && articles.map(({ 
                        _id, 
                        title 
                    }, index) => {

                        return (
                            <li key={index}>
                                {
                                    !profile.canWrite({ user })
                                        ? <a href="#/">{title}</a>
                                        : <a
                                            name="edit" id={_id}
                                            key={_id} href={`${'/news/' + title}`}
                                            onClick={(e) => handleClick(e)}
                                            disabled={!profile.canWrite({ user })}
                                        >
                                            {title}
                                        </a>
                                }
                            </li>
                        );

                    }))
                }
            </ul>

            {
                general !== null && (general.isLoading && <div 
                    className="loader" 
                    style={{ marginTop: `40px` }}
                />)
            }
        </Fragment>
    );
}

export default withStyles(styles)(ListNewsArticles);