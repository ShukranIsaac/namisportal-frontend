import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import Documents from './documents';
import './library.css';

import Document from './Document';

import * as LibraryAction from '../../actions/index';
import Config from '../../config';
import CustomColumn from '../news/custom.column';
import { Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    chipsRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        marginBottom: '0.5em',
        '& > *': {
            marginRight: theme.spacing.unit * 0.9,
        }
    },
});

class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // set the default library category
            // to be selected
            lock: false
        };
    }

    componentDidMount() {
        // fetch main category
        this.props.fetchLibrary(null, 'Library', null);
        this.setState({ lock: true })
    }

    componentDidUpdate(prev, next) {
        const { library } = this.props;
        const { lock } = this.state;

        if (prev !== undefined) {
            if (prev.library !== this.props.library) {
                if (lock) {
                    // fetch default child category
                    if (library && library !== null && library.subCategories) {
                        if (library.subCategories.length > 0) {
                            this.props.fetchCategoryDocuments(library.subCategories[0]._id);
                            Object.assign({ lock: false });
                        }
                    }
                }
            }
        }
    }

    handleChange = (value) => () => {

        this.setState({ value });

        const resources = this.props.library;

        // if resources not null
        if (resources !== null) {

            // then iterate through the subcategories
            // and filter the chosen section
            const filteredResource = resources.subCategories.length !== 0 
            && resources.subCategories.filter(resource => {

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
                // fetch its documents
                this.props.fetchCategoryDocuments(filteredResource[0]._id);
            }
        }

    };

    toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }

    firstLetter = (str) => {
        return str.toLowerCase().split(' ').map((word) => {
            return word.charAt(0).toUpperCase();
        }).join('');
    }

    renderDocuments(docs) {
        if (docs !== null) {
            return docs && docs.map(({ 
                name, 
                path, 
                description 
            }, key) => <Document
                key={key}
                index={key + 1}
                name={name}
                path={`${Config.REMOTE_PROD_SERVER}/files/${path}`}
                summary={description}
            />);
        }
    }

    render() {

        const { 
            classes, library, general, 
            filters: FiltersContainer 
        } = this.props;

        return (
            <div className='page-content'>
                <Container>
                    <Row style={{ marginTop: '20px' }}>
                    {
                        (library && library.subCategories.length !== 0) ?
                        <div className={classes.root}>
                            <div className={classes.chipsRoot}>
                                <FiltersContainer 
                                    handleChange={ this.handleChange }
                                    library={ library }
                                    capitalize={ this.firstLetter }
                                    {...this.props}
                                />
                            </div>
                            <Documents
                                {...this.props}
                                renderDocuments={this.renderDocuments}
                            />
                        </div> 
                        : <CustomColumn sm='12' md='12' lg='12'>
                            <NoDataCard
                                text={`No information availble to show. Please refresh to reload.`}
                                header={`Information!`}
                                intent={Intent.PRIMARY}
                            />
                        </CustomColumn>
                    }
                    {
                        general && (general.isLoading && (
                                <div style={{ marginTop: `30px` }} 
                                    className="loader" />))
                    }
                    </Row>
                </Container>
            </div>
        );
    }
}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
    filters: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(
            React.Component
        )
    ]),
};

Library.defaultProps = {
    filters: ({ 
        library,
        handleChange,
        classes,
        // capitalize
    }) => {
        return (<Fragment>
            <div className={classes.chipsRoot}>
                {
                    library ? (
                        library.subCategories && (
                            library.subCategories.map(({
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
                                        onClick={ handleChange(name) }
                                        deleteIcon={<DoneIcon />}
                                    />
                                )
                            })
                        )
                    ) : <div>No Filters found</div>
                }
            </div>
        </Fragment>)
    }
}

const mapStateToProps = state => ({
    general: state.general.general,
    library: state.library.library,
    library_documents: state.library.library_sub_cate_documents,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLibrary: (id, name, type) => { 
        dispatch(LibraryAction.fetchLibrary(id, name, type)) 
    },
    libraryCategory: (name) => { 
        dispatch(LibraryAction.fetchLibraryCategory(name)) 
    },
    addSubCategory: (id, subcategory) => { 
        dispatch(LibraryAction.addSubCategory(id, subcategory)) 
    },
    fetchCategoryDocuments: (i) => { 
        dispatch(LibraryAction.fetchCategoryDocuments(i)) 
    }
})

export default withStyles(styles)(connect(mapStateToProps, 
    mapDispatchToProps)(Library));