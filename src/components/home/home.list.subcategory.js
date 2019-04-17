import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import { UserProfile, profile } from '../user/user.profile';

/**
 * List all home subcategory
 * 
 * @author Isaac S. Mwakabira
 */
export const ListHomeSubcategory = withStyles(styles)(({
    category: { subCategories },
    handleClick, classes
}) => {

    // get the logged in user
    const user = UserProfile.get();

    return (
        <Fragment>
            
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
                    subCategories !== null && subCategories !== undefined ? (<Row>

                        {
                            subCategories !== undefined && subCategories.map(({ name, about, _id }, index) => {
    
                                return(
                                    <Col key={ index } sm='12' md='8' lg='6'>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4>
                                                    <a name="edit" id={_id} key={_id} href="/cms" onClick={ (e) => handleClick(e) }>
                                                        { name }
                                                    </a>
                                                </h4>
                                                <p>{ about.substring(0, 150) }</p>
    
                                                <Button name="edit" id={_id} disabled={ false } intent="primary" text="Edit" onClick={(e) => handleClick(e)} />
                                            </div>
                                        </div>
                                    </Col>
                                );
    
                            })
                        }
    
                    </Row>) : <div className="loader" />
                }
            </div>

        </Fragment>
    );
    
})


ListHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}
