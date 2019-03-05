import React, { Fragment } from 'react';

// import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';

/**
 * List all home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const ListHomeSubcategory = ({
    category: { subCategories },
    handleClick,
}) => {
    // console.log(subCategories)
    if(subCategories !== null && subCategories !== undefined) {
        
        return (
            <Fragment>
                
                <ButtonControl 
                    intent={Intent.NONE} 
                    value="New SubCategory"
                    name="create"
                    handleClick={e => handleClick(e) }
                />
    
                {/* <Divider /> */}
                <div className='app-sections' style={{ marginTop: '-53px' }}>
                    <Row>

                        {
                            subCategories !== undefined && subCategories.map(({ name, about, _id }) => {

                                return(
                                    <Col sm='12' md='8' lg='6'>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4>
                                                    <a name="edit" id={_id} key={_id} href="/#" onClick={(e) => handleClick(e)}>
                                                        { name }
                                                    </a>
                                                </h4>
                                                <p>{ about.substring(0, 150) }</p>

                                                <Button name="edit" id={_id} intent="primary" text="Edit" onClick={(e) => handleClick(e)} />
                                            </div>
                                        </div>
                                    </Col>
                                );

                            })
                        }

                    </Row>
                </div>
    
            </Fragment>
        );
    
    } else {

        return <div className="loader" />

    }

    
}
