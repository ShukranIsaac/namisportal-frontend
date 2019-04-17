import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import { profile, UserProfile } from '../user/user.profile';
import ButtonControl from '../forms/buttons/button.default.control';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';

// get the logged in user
const user = UserProfile.get();

/**
 * List all frequently asked questions
 * 
 * @author Isaac S. Mwakabira
 */
const ListFAQS = ({ general, questions, handleClick, classes }) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Question"
                name="create"
                handleClick={e => handleClick(e) }
                disabled={ !profile.canWrite({ user }) }
            />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <Divider />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <NoDataCard header="List of all frequently asked questions." intent={Intent.SUCCESS} />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <ul>
                { 
                    general !== null && (

                        !general.isLoading ? 

                        ((questions !== null && questions !== undefined) && questions.subCategories !== null) && (
                            questions.subCategories.length !== 0 && questions.subCategories.map((category, index) => {

                                // if this category has question render, else don't
                                if (category.subCategories !== undefined && category.subCategories !== null) {
                                    
                                    if(category.subCategories.length !== 0) {
                            
                                        return category.subCategories.length !== 0 && category.subCategories.map(({ name, _id }, index) => {
                                        
                                            return (
                                                <li key={ index }>
                                                    <a 
                                                        name="edit" id={_id} 
                                                        key={_id} href={ `${ '/faqs/' + name }` } 
                                                        onClick={ (e) => handleClick(e) }
                                                    >
                                                        { name }
                                                    </a>
                                                </li>
                                            )
                            
                                        })
                                
                                    } else {
                                
                                        return null;
                                
                                    }

                                } else {

                                    return null;
                                    
                                }

                            })
                        )

                        : <div className="loader" />
                    )
                }
            </ul>
            
        </Fragment>
    );

}

ListFAQS.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(ListFAQS));