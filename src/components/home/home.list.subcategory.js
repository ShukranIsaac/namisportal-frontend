import React from 'react';
import PropTypes from 'prop-types';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, } from '@blueprintjs/core';
import { Row, } from 'reactstrap';
import { UserProfile, profile } from '../user/user.profile';
import { CMSHomeSubCategory } from './cms.home.subcategory';

/**
 * List all home subcategory
 * 
 * @author Isaac S. Mwakabira
 */
export const ListHomeSubcategory = ({ 
    category, handleClick, 
    classes, general 
}) => {

    // get the logged in user
    const user = UserProfile.get();

    return (
        <>
            
            <ButtonControl 
                intent={Intent.NONE} 
                value="New SubCategory"
                name="create"
                handleClick={e => handleClick(e) }
                disabled={ !profile.canWrite({ user }) }
            />

            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>
            <div className={ classes.margin }/>

            <Divider />

            <div className='app-sections' style={{ marginTop: '-53px' }}>
                {
                    general && (
                        !general.isLoading ? (
                            (category !== null && category !== undefined) && (<Row>

                                {
                                    category.subCategories !== undefined && category.subCategories.map((section, index) => {
            
                                        return (<CMSHomeSubCategory key={index} section={ section } handleClick={ handleClick } />);
            
                                    })
                                }
            
                            </Row>)
                        ) : (<Row>
                                <div style={{ marginTop: `40px` }} className="loader" />
                            </Row>
                        )
                    )
                }
            </div>

        </>
    );
    
}


ListHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ListHomeSubcategory);