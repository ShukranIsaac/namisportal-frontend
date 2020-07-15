import React, { 
    Fragment, 
    useState, 
    useEffect
} from 'react';
import PropTypes from 'prop-types';

import './library.css';
import { Divider, withStyles, FormControl, Paper } from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from '../contact/form.styles';
import UserProfile, { profile } from '../user/user.profile';
import ButtonControls from '../cms/cms.controls';
import Toast from '../../toastfy';

/**
 * List all documents by category groups
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const ListLibraryDocuments = ({
    maincategory,
    handleFilteredResource,
    fetchCategoryDocs,
    filters: FiltersContainer,
    sub_cate_documents,
    archiveCategory,
    ...props
}) => {
    const [state, setState] = useState({ lock: false });
    
    useEffect(() => {
        // if resources not null
        if (maincategory !== null && !state.lock) {
            if (maincategory.subCategories.length !== 0) {
                // set lock to true
                setState({ lock: true })
            }
        }
    }, [maincategory, state.lock])

    const handleChange = (value) => {
        // if resources not null
        if (maincategory !== null) {
            // then iterate through the subcategories
            // and filter the chosen section
            const filteredResource = maincategory.subCategories.length !== 0 && 
            maincategory.subCategories.filter(resource => {

                if (value !== null && resource !== null) {
                    // check if the chosen resource from the drop down list
                    // equals one of the resources/subCategories
                    // in Library
                    if (resource.name === value) {
                        return resource;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            });

            // was anything returned
            if (filteredResource && filteredResource.length !== 0) {
                if (state.lock) {
                    // fetch its documents
                    fetchCategoryDocs(filteredResource[0]._id);

                    setState({ lock: false, });

                    handleFilteredResource(filteredResource[0])
                }
            }
        }
    }

    const firstLetter = (str) => {
        return str.toLowerCase().split(' ').map((word, index) => {
            return word.charAt(0).toUpperCase();
        }).join('');
    }

    const libraryItems = (sub_cate_documents) => {
        return (<ul className="list-group list-group-flush">
            {
                sub_cate_documents.map((document, index) => {

                    return (
                        <Fragment key={document.name}>
                            <li 
                                id={index} 
                                className="list-group-item"
                                key={document.name}>
                                {/* <div style={{ marginTop: `0.5em` }}>
                                    {`${document.name}(${document.filename})`}
                                </div> */}
                                {
                                    !profile.canWrite({ user })
                                    ? <a href="#/">
                                        {`${document.name}(${document.filename})`}
                                    </a> : <a
                                        href={`${'/library/' + document.name}`}
                                        onClick={(e) => handleClick(e)}
                                        name="edit"
                                        id={document._id}
                                    >
                                        {`${document.name}(${document.filename})`}
                                    </a>
                                }
                            </li>
                        </Fragment>
                    );
                })
            }
        </ul>);
    }

    const handleDeleteFilter = value => {
        // if resources not null
        if (maincategory !== null) {
            // then iterate through the subcategories
            // and filter the chosen section
            const filteredResource = maincategory.subCategories.length !== 0 && 
            maincategory.subCategories.filter(resource => {

                if (value !== null && resource !== null) {
                    // check if the chosen resource from the drop down list
                    // equals one of the resources/subCategories
                    // in Library
                    if (resource._id === value) {
                        return resource;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            });

            // was anything returned
            if (filteredResource && filteredResource.length !== 0) {
                if (state.lock) {
                    // fetch its documents
                    fetchCategoryDocs(filteredResource[0]._id);

                    setState({ lock: false, });

                    handleFilteredResource(filteredResource[0])
                }

                if (sub_cate_documents.length > 0) {
                    Toast.emit({
                        autoClose: sub_cate_documents.length > 0,
                        type: Toast.TYPES.WARN,
                        message: "Please delete all its contents first. And try again!"
                    });
                } else {
                    archiveCategory(filteredResource[0], user.token, "Library")
                }
            }
        }
    }

    const { 
        classes, 
        general, 
        handleClick
    } = props;

    // authenticated user
    const user = UserProfile.get();

    return (
        <Fragment>
            <ButtonControls 
                keys={['create']}
                user={ user }
                handleClick={handleClick}
            />

            <div className={classes.margin} />

            <Divider />

            <div className={classes.margin} />

            { /** filter categories here */}
            <FormControl>
                <Paper elevation={0}>
                    <FiltersContainer 
                        handleChange={ handleChange }
                        maincategory={ maincategory }
                        capitalize={ firstLetter }
                        handleDeleteFilter={handleDeleteFilter}
                        classes={classes}
                    />
                </Paper>
            </FormControl>

            {
                sub_cate_documents ? (
                    sub_cate_documents.length !== 0 ? (
                        <Fragment>
                            {
                                libraryItems(sub_cate_documents)
                            }
                        </Fragment>
                    ) : <div>No documents found</div>
                ) : <div>No documents found</div>
            }

            {
                general && (
                    general.isLoading && (<div 
                        style={{ marginTop: `50px` }} 
                        className="loader" 
                    />))
            }
        </Fragment>
    );

};

ListLibraryDocuments.propTypes = {
    classes: PropTypes.object.isRequired,
    filters: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(
            React.Component
        )
    ]),
};

ListLibraryDocuments.defaultProps = ({
    filters: ({ 
        maincategory,
        handleChange,
        handleDeleteFilter,
        classes
    }) => { 
        return (<Fragment>
            <div className={classes.chipsRoot}>
                {
                    maincategory && (
                        maincategory.subCategories && (
                            maincategory.subCategories.map(({
                                _id,
                                name,
                            }) => {
                                return (
                                    <Chip 
                                        key={_id}
                                        // avatar={
                                        //     <Avatar>
                                        //         {capitalize(name)}
                                        //     </Avatar>
                                        // }
                                        label={name}
                                        clickable
                                        variant="outlined"
                                        onClick={ (e) => handleChange(name) }
                                        deleteIcon={<DeleteIcon 
                                                style={{ color: 'red'}} 
                                            />
                                        }
                                        onDelete={e => handleDeleteFilter(_id)}
                                    />
                                )
                            })
                        )
                    )
                }
            </div>
        </Fragment>)
    }
})

export default withStyles(styles, {
    withTheme: true
})(ListLibraryDocuments);