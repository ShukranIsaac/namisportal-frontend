import React, { Fragment } from 'react';

import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';

/**
 * List of all news items
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Props} Props 
 */
const ListNewsArticles = ({ articles, handleClick, general, classes }) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Article"
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

            <ul>
                {
                    general !== null && (
                        general !== undefined && general.isLoading !== undefined && !general.isLoading ?
                            articles !== null && articles.length !== 0 ? 
                                articles.map(({ _id, title }, index) => {

                                    return (
                                        <li key={ index }>
                                            <a id={ _id } href={`${ '/news/' + title }`} onClick={ (e) => handleClick(e) } name="edit">
                                                { title }
                                            </a>
                                        </li>
                                    );

                                })
                            : <NoDataCard header={ `No articles` } style={{ marginTop: `30px` }} intent={ Intent.WARNING } />
                        
                        : <div className="loader" />
                    )
                }
            </ul>

        </Fragment>
    );

}

export default withStyles(styles)(ListNewsArticles);