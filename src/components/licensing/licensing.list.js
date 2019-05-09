import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import { Intent } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';

/**
 * List all licensing steps
 * 
 * @author Isaac S. Mwakabira
 */
export const ListLicensing = (withStyles(styles)(({
    classes,
    handleClick,
    subcategory,
    general,
}) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Step"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <Divider />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <ul>
                {
                    general && (
                        !general.isLoading ? (
                            subcategory !== null && (
                            subcategory.subCategories.length !== 0 && (
                                subcategory.subCategories.map((category, index) => {

                                    // if category has no name, do not render
                                    if(category.name !== undefined) {
                                        return (
                                            <Fragment key={category.name}>
                                                <li key={index}>
                                                    <a 
                                                        href={ `${ '/steps/' + category.name }` } 
                                                        onClick={ (e) => handleClick(e) }
                                                        name="edit"
                                                        id={category._id}
                                                    >
                                                        { category.name }
                                                    </a>
                                                </li>
                                            </Fragment>
                                        );
                                    } else {

                                        return null;

                                    }

                                })
                            )
                        )) : <div style={{ marginTop: `50px` }} className="loader" />
                    )
                }
            </ul>

        </Fragment>
    )
    
}))

ListLicensing.propTypes = {
    classes: PropTypes.object.isRequired,
}