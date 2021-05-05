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
    const [activeElement, setActiveElement] = useState();

    // get the logged in user
    const user = UserProfile.get();

    const renderReadMore = ({ about, _id }) => (about.length > 250) ? 
        (<span onClick={e => { setModal(!modal); setActiveElement(e.target.id) }} 
            className="badge badge-info" 
            id={_id}
            style={{ cursor: 'pointer' }}>
                { !modal || activeElement !== _id ? 'Read more...': 'Read less...' }
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
                    (category !== null && category !== undefined) && (
                        <>
                            {
                                category.map((section, index) => {
                                    return (<CMSHomeSubCategory 
                                        renderReadMore={renderReadMore}
                                        dangerouslyRender={dangerouslyRender}
                                        modal={modal}
                                        setModal={setModal}
                                        section={ section }
                                        activeElement={activeElement}
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