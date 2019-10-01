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
            value: "Tarrifs"
        };
    }

    componentDidMount() {

        // fetch main category
        this.props.fetchLibrary(null, 'Library', null);
        // fetch default child category
        const { library } = this.props;
        if (library !== null) {
            this.props.fetchLibrary(library._id, this.state.value, 'children');   
        }

    }

    handleChange = (event, value) => {
        this.setState({ value });
        const { library } = this.props;
        this.props.fetchLibrary(library._id, value, 'children');
    };

    renderDocuments(docs) {

        if(docs !== null) {
            return docs && docs.map(({ name, path, summary }, key) => {

                return <Document key={key} name={name} path={path} summary={summary} />
    
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

        const { classes, library } = this.props;
        const { value } = this.state;

        return (
            <div className='page-content'>

                <ParticlesComponent />

                <Container>
                    <Row>
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
                        </div>

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
        library_documents: state.library.library_documents,
    }

}
const mapDispatchToProps = (dispatch) => {

    return {
        fetchLibrary: (id, name, type) => { dispatch(LibraryAction.fetchLibrary(id, name, type)) },
        libraryCategory: (name) => { dispatch(LibraryAction.fetchLibraryCategory(name)) },
        addSubCategory: (id, subcategory) => { dispatch(LibraryAction.addSubCategory(id, subcategory)) },
    }

}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));