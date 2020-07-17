import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, withStyles } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile from '../user/user.profile';
import { CMSHomeSubCategory } from './cms.home.subcategory';
import ButtonControls from '../cms/cms.controls';

/**
 * List all home subcategory
 * 
 * @author Isaac S. Mwakabira
 */
export const ListHomeSubcategory = ({
    category, handleClick,
    classes, general
}) => {
    const [modal, setModal] = useState();

    // get the logged in user
    const user = UserProfile.get();

    const renderReadMore = summary => (summary.length > 250) ? 
        (<span onClick={() => setModal(!modal)} 
            className="badge badge-info" 
            style={{ cursor: 'pointer' }}>
                { !modal ? 'Read more...': 'Read less...' }
        </span>) : "";

    const dangerouslyRender = (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />
    }

    const loader = () => general && (general.isLoading && (<div 
        style={{ marginTop: `40px` }} 
        className="loader" 
    />))

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

            <ul className='list-group list-group-flush'>
                {
                    (category && category !== null && category !== undefined) && (
                        <>
                            {
                                !(category instanceof Array) 
                                ? <CMSHomeSubCategory 
                                    renderReadMore={renderReadMore}
                                    dangerouslyRender={dangerouslyRender}
                                    modal={modal}
                                    setModal={setModal}
                                    section={ category }
                                    handleClick={handleClick}
                                /> : loader()
                            }

                            {
                                category.subCategories !== undefined && 
                                category.subCategories.map((section, index) => {
                                    return (<CMSHomeSubCategory 
                                        renderReadMore={renderReadMore}
                                        dangerouslyRender={dangerouslyRender}
                                        modal={modal}
                                        setModal={setModal}
                                        section={ section }
                                        handleClick={handleClick}
                                    />);
                                })
                            }
                        </>
                    )
                }
            </ul>

            {
                loader()
            }
        </Fragment>
    );
}


ListHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ListHomeSubcategory);