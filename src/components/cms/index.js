import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as UserEventActions from '../../actions/event.action';
import * as LibraryAction from '../../actions/index';

import CustomColumn from '../news/custom.column';
import { UserContext } from '../user/user.context';
import CustomDrawer from './cms.custom.drawer';
import { RenderSection } from './cms.render.section';

/**
 * @author Isaac S. Mwakabira
 * 
 * Connected component, state management
 * 
 */
class CMSIndex extends Component {

    constructor() {
        super();
        this.state = {
            link: 'licencing',
            event: 'default',  // default value required when rendering a single resource section
            searchTerm: '',
            doc_title: '',
        }

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleLink = this.handleLink.bind(this);
        this.libraryLinkClick = this.libraryLinkClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    /**
     * Test - Unit: redux connected working perfect
     * this.props.editItem();
     */
    componentDidMount() {

        // this.props.editItem();
        // console.log(this.props.user_event);

    }

    componentWillUnmount() {

        /**
         * Set back state to default, to reproduce, uncheck this
         *  and see the effects when moving from one resource to another i.e. edit or create new 
         *  resource in the CMS.
         * 
         */
        this.setState({
            event: 'default',
        });

    }

    handleLink = (e, link) => {

		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
        e.preventDefault();
        
        /**
         * Fetch all library docs
         */
        if (link === 'library' ) this.props.fetchLibraryDocs();

        // Set state
        this.setState({ link });

    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });

        console.log("Reached this far");
        
    }

    libraryLinkClick = (event) => {

        this.setState({ doc_title: event.target.value });

    }

    handleClick = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
        event.preventDefault();
        
        /**
         * change state depending on the button the user clicked in the UI
         * 
         */
        switch(event.currentTarget.name) {
            case 'publish':
                this.props.publishItem();
                break;
            case 'edit':
                this.props.editItem();
                break;
            case 'unpublish':
                this.props.unpublishItem();
                break;
            case 'archive':
                this.props.archiveItem();
                break;
            case 'delete':
                this.props.removeItem();
                break;
            case 'save':
                this.props.saveItem();
                break;
            case 'create':
                this.props.createItem();
                break;
            default:
                this.props.defaultItem();
                break;
        }
        
    }

    render() {
        const { classes } = this.props;

        // console.log(this.state);
        // console.log(this.props);
        
        return (
            <UserContext.Consumer>
                {
                    (context) => {
    
                        return (
                            <Fragment>
                
                                <Flex row="true" align='top' justify='left' m={1} w={1} p={1} style={{ margin: '0px' }}>
                    
                                    <CustomColumn
                                        m={2}
                                        w={1/5}
                                        p={1}
                                        className="format-cms-sidebar">
                                        
                                        <CustomDrawer 
                                            classes={classes} 
                                            handleLink={this.handleLink}
                                        />
                    
                                    </CustomColumn>
                    
                                    <CustomColumn w={1/2} p={1} style={{}}>

                                        <RenderSection 
                                            link={this.state.link} 
                                            handleClick={ this.handleClick } 
                                            handleChange={ this.handleChange }
                                            props={this.props}
                                        />
    
                                    </CustomColumn>
                    
                                </Flex>
                
                            </Fragment>
                        );
    
                    }
                }
            </UserContext.Consumer>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        user_event: state.event.event,
        library: state.library.library,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        // general category
        editItem : () => { dispatch(UserEventActions.edit()) },
        publishItem : () => { dispatch(UserEventActions.publish()) },
        saveItem : () => { dispatch(UserEventActions.save()) },
        defaultItem : () => { dispatch(UserEventActions.initial()) },
        unpublishItem : () => { dispatch(UserEventActions.unpublish()) },
        deleteItem : () => { dispatch(UserEventActions.remove()) },
        archiveItem : () => { dispatch(UserEventActions.archive()) },
        createItem : () => { dispatch(UserEventActions.create()) },
        // Library category
        fetchLibraryDocs: () => { dispatch(LibraryAction.fetchAllLibraryDocs()) },
    };

}

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
    },
});

CMSIndex.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CMSIndex));