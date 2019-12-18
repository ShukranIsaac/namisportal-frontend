import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Tarrifs from './Tarrifs';
import './library.css'
import Toolkits from './Toolkits';
import Financing from './Financing';
import PoliciesStratigies from './PoliciesStratigies';
import LegalRegFrameworks from './LegalRegFrameworks';
import ResourcePlan from './ResourcePlan';
import ParticlesComponent from '../user/particles';

import Document from './Document';

import * as LibraryAction from '../../actions/index';
import Config from '../../config';
import CustomColumn from '../news/custom.column';
import { Card, Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // set the default library category
            // to be selected
            value: "Tarrifs",
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
        const { lock, value } = this.state;

        if (prev !== undefined) {
            if (prev.library !== this.props.library) {
                if (lock && value) {
                    // fetch default child category
                    if (library !== null) {
                        this.props.fetchCategoryDocuments(library.subCategories[0]._id);
                        Object.assign({ lock: false });
                    }
                }
            }
        }

    }

    handleChange = (event, value) => {

        this.setState({ value });
        // const { library } = this.props;
        // this.props.fetchLibrary(library._id, value, 'children');

        const resources = this.props.library;

        // if resources not null
        if (resources !== null) {

            // then iterate through the subcategories
            // and filter the chosen section
            const filteredResource = resources.subCategories.length !== 0 && resources.subCategories.filter(resource => {

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
            if (filteredResource) {
                // fetch its documents
                this.props.fetchCategoryDocuments(filteredResource[0]._id);
            }
        }

    };

    renderDocuments(docs) {

        if (docs !== null) {
            return docs && docs.map(({ name, path, filename }, key) => {

                return <Document
                    key={key}
                    index={key + 1}
                    name={name}
                    path={`${Config.REMOTE_PROD_SERVER}/files/${path}`}
                    summary={filename}
                />

            });
        }

    }

    renderCategoryDocs = () => {

        switch (this.state.value) {
            case "Tarrifs":
                return <Tarrifs {...this.props} renderDocuments={this.renderDocuments} />

            case "Deployment Toolkit":
                return <Toolkits {...this.props} renderDocuments={this.renderDocuments} />

            case "Financing Plan":
                return <Financing {...this.props} renderDocuments={this.renderDocuments} />

            case "Legal and Regulatory Frameworks":
                return <LegalRegFrameworks {...this.props} renderDocuments={this.renderDocuments} />

            case "Resource Plan":
                return <ResourcePlan {...this.props} renderDocuments={this.renderDocuments} />

            case "Policies And Strategies":
                return <PoliciesStratigies {...this.props} renderDocuments={this.renderDocuments} />

            default:
                return (<></>);
        }

    }

    render() {

        const { classes, library, general } = this.props;
        const { value } = this.state;

        return (
            <div className='page-content'>

                <ParticlesComponent />

                <Container>
                    <Row>
                        {
                            library ?
                                <div className="card">
                                    <div className="card-body">
                                        <div className={classes.root}>
                                            <AppBar position="static" color="default">
                                                <Tabs
                                                    value={value}
                                                    onChange={this.handleChange}
                                                    indicatorColor="primary"
                                                    textColor="primary"
                                                    variant="scrollable"
                                                    scrollable={true}
                                                    scrollButtons="auto"
                                                >
                                                    {
                                                        library && (
                                                            library.subCategories && (
                                                                library.subCategories.map(category => {

                                                                    return (
                                                                        <Tab
                                                                            key={category.name}
                                                                            label={category.name}
                                                                            id={category._id}
                                                                            value={category.name}
                                                                        />
                                                                    )
                                                                })
                                                            )
                                                        )
                                                    }
                                                </Tabs>
                                            </AppBar>

                                            {
                                                this.renderCategoryDocs()
                                            }
                                        </div>
                                    </div>
                                </div> : <CustomColumn sm='12' md='12' lg='12'>
                                    {
                                        general && (
                                            !general.isLoading ? (
                                                <Card>
                                                    <NoDataCard
                                                        text={`No information availble to show. Please check your device internet connection and refresh.`}
                                                        header={`Information!`}
                                                        intent={Intent.WARNING}
                                                    />
                                                </Card>
                                            ) : <div className="loader" />
                                        )
                                    }
                                </CustomColumn>
                        }

                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        general: state.general.general,
        library: state.library.library,
        library_documents: state.library.library_sub_cate_documents,
    }

}
const mapDispatchToProps = (dispatch) => {

    return {
        fetchLibrary: (id, name, type) => { dispatch(LibraryAction.fetchLibrary(id, name, type)) },
        libraryCategory: (name) => { dispatch(LibraryAction.fetchLibraryCategory(name)) },
        addSubCategory: (id, subcategory) => { dispatch(LibraryAction.addSubCategory(id, subcategory)) },
        fetchCategoryDocuments: (i) => { dispatch(LibraryAction.fetchCategoryDocuments(i)) }
    }

}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));