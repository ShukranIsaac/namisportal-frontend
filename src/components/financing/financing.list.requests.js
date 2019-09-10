import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Divider, Button } from '@blueprintjs/core';
import { withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import { Row, Col } from 'reactstrap';

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

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Subcategory"
                name="create"
                handleClick={ e => handleClick(e) }
            />

            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />
            <div className={classes.margin} />

            <div className='app-sections' style={{ marginTop: '-53px' }}>
                {
                    general && (
                        !general.isLoading ? (
                            ((maincategory !== null && maincategory !== undefined)) && maincategory !== undefined && (
                                <Fragment>
                                    <Row>
                                        <Col key={ maincategory.about } sm='12' md='8' lg='6'>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4>
                                                        <a 
                                                            name="edit" id={maincategory._id} 
                                                            key={maincategory._id} href="/cms" 
                                                            onClick={ (e) => handleClick(e) }
                                                        >
                                                            { maincategory.name }
                                                        </a>
                                                    </h4>
                                                    <p>{ maincategory.about !== undefined && maincategory.about.substring(0, 150) }</p>

                                                    <Button 
                                                        name="edit" id={maincategory._id} 
                                                        disabled={ false } intent="primary" 
                                                        text="Edit" onClick={(e) => handleClick(e)} 
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        {
                                            maincategory.subCategories !== undefined 
                                            && (maincategory.subCategories.length !== 0 && maincategory.subCategories.map(({ name, about, _id }, index) => {
                                                
                                                if (about === undefined) {
                                                    return null;
                                                }

                                                return(
                                                    <Col key={ index } sm='12' md='8' lg='6'>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h4>
                                                                    <a 
                                                                        name="edit" id={_id} 
                                                                        key={_id} href="/cms" 
                                                                        onClick={ (e) => handleClick(e) }
                                                                    >
                                                                        { name }
                                                                    </a>
                                                                </h4>
                                                                <p 
                                                                    dangerouslySetInnerHTML={{ 
                                                                        // if text length more than 150, render a small portion.
                                                                        __html: about !== undefined ? (about.length >= 140 ? about.substring(0, 150) : about) : ''
                                                                    }}
                                                                ></p>

                                                                <Button 
                                                                    name="edit" id={_id} 
                                                                    disabled={ false } intent="primary" 
                                                                    text="Edit" onClick={(e) => handleClick(e)} 
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                );

                                            }))
                                        }
                                    </Row>
                                </Fragment>
                            )
                        ) : <div style={{ marginTop: `40px` }} className="loader" />
                    )
                }
            </div>

        </Fragment>
    );

}))

ListFinancingRequests.propTypes = {
    classes: PropTypes.object.isRequired,
}