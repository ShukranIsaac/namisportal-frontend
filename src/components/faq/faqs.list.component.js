import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import UserProfile, { profile } from '../user/user.profile';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import ButtonControls from '../cms/cms.controls';

/**
 * List all frequently asked questions
 * 
 * @author Isaac S. Mwakabira
 */
const ListFAQS = ({ 
    general, 
    questions, 
    handleClick, 
    classes 
}) => {

    // get the logged in user
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
                questions && questions.subCategories && (questions.subCategories.length > 0 
                    ? (<NoDataCard 
                    header="List of all frequently asked questions." 
                    intent={Intent.SUCCESS} 
                />) : <NoDataCard 
                    header="No list of frequently asked questions." 
                    intent={Intent.SUCCESS} 
                />)
            }

            <div className={classes.margin} />
            <div className={classes.margin} />

            <ul className="list-group list-group-flush">
                {
                    (questions && questions.subCategories !== null) 
                    && (questions.subCategories.length !== 0 
                        && questions.subCategories.map(({
                            subCategories
                        }, index) => {

                            // if this category has question render, else don't
                            if (subCategories) {

                                if (subCategories.length !== 0) {

                                    return subCategories.map(({ 
                                        name, 
                                        _id 
                                    }, index) => {

                                        return (
                                            <li key={index}
                                                className="list-group-item">
                                            {
                                                !profile.canWrite({ user })
                                                ? <a href="#/">{name}</a>
                                                : <a
                                                    name="edit" id={_id}
                                                    key={_id} href={`${'/faqs/' + name}`}
                                                    onClick={(e) => handleClick(e)}
                                                    disabled={!profile.canWrite({ user })}
                                                >
                                                    {name}
                                                </a>
                                            }
                                            </li>
                                        )

                                    })

                                } else {

                                    return null;

                                }
                            } 
                            return null;
                        })
                    )
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

ListFAQS.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(ListFAQS));