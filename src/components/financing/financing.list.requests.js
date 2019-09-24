import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Divider } from '@blueprintjs/core';
import { withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import { UserProfile, profile } from '../user/user.profile';
import CustomizedSnackbars from '../cms/snackbar.feedback';

/**
 * Component to list all requests so far placed by each
 * individual institution.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const ListFinancingRequests = (withStyles(styles)(({
    maincategory,
    handleClick,
    general,
    classes,
}) => {

    // authenticated account
    const user = UserProfile.get();
    
    return (
        <Fragment>

            <ButtonControl
                intent={Intent.NONE}
                value="New Subcategory"
                name="create"
                handleClick={e => handleClick(e)}
                disabled={!profile.canWrite({ user })}
            />

            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />

            <ul>
                {
                    general && (
                        !general.isLoading ? (
                            maincategory !== null ? (
                                maincategory.subCategories.length !== 0 ? (
                                    maincategory.subCategories.map((category, index) => {

                                        // if category has no name, do not render
                                        if (category.name !== undefined) {
                                            return (
                                                <li key={index}>
                                                    {
                                                        !profile.canWrite({ user })
                                                            ? <a href="#/">{category.name}</a>
                                                            : <a
                                                                href={`${'/steps/' + category.name}`}
                                                                onClick={(e) => handleClick(e)}
                                                                name="edit"
                                                                id={category._id}
                                                            >
                                                                {category.name}
                                                            </a>
                                                    }
                                                </li>
                                            );
                                        } else {

                                            return <div>No content. Please add!</div>;

                                        }

                                    })
                                ) : <div>No content. Please add!</div>
                            ) : <div>No content</div>
                        ) : <div style={{ marginTop: `50px` }} className="loader" />
                    )
                }
            </ul>

            {
                general ? (
                    general.hasErrored !== undefined ? (
                        general.hasErrored && <CustomizedSnackbars type="error" />
                    ) : null
                ) : null
            }

        </Fragment>
    );

}))

ListFinancingRequests.propTypes = {
    classes: PropTypes.object.isRequired,
}