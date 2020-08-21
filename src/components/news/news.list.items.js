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
                articles && articles.subCategories 
                && articles.subCategories.length === 0 && (<NoDataCard
                    header={`No articles`}
                    intent={Intent.SUCCESS}
                />)
            }

            <ul className="list-group list-group-flush">
                {
                    articles && articles !== null && articles.subCategories && 
                    (articles.subCategories.length > 0 && articles.subCategories.map(({ 
                        _id, 
                        name 
                    }, index) => {

                        return (
                            <li key={index}
                                className="list-group-item">
                                {
                                    !profile.canWrite({ user })
                                        ? <a href="#/">{name}</a>
                                        : <a
                                            name="edit" id={_id}
                                            key={_id} href={`${'/news/' + name}`}
                                            onClick={(e) => handleClick(e)}
                                            disabled={!profile.canWrite({ user })}
                                        >
                                            {name}
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