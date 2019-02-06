import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import * as UserEventActions from '../../actions/event.action';
import * as LibraryAction from '../../actions/index';
import * as UserAuthAction from '../../actions/user.action';

import CustomDrawer from './cms.custom.drawer';
import RenderSection from './cms.render.section';
import { UserProfile } from '../user/user.profile';
import { redirect } from '../user/user.redirect';

import './style.css';

const drawerWidth = 240;

/**
 * @author Isaac S. Mwakabira
 * 
 * Connected component, state management
 * 
 */
class CMSIndex extends React.Component {

    constructor() {
        super();
        this.state = {
            link: 'licencing',
            event: 'default',  // default value required when rendering a single resource section
            searchTerm: '',
            doc_title: '',
            open: false,
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
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.capitalize = this.capitalize.bind(this);

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

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

        const { match, history } = this.props;

        // get url navigated to, and change push to the navigation bar
        const prevUrl = `${match.path}/${link}`;
        if (prevUrl) {
            history.push(prevUrl);
        }

    }

    /**
     * Capitalize first letter of this word
     */
    capitalize = (character) => {
        return character && character[0].toUpperCase() + character.slice(1);
    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
        // console.log("Reached this far");
        
    }

    /**
     * Handle cms sidebar button click ie. Licencing, News etc.
     * And renders specific component based on the state that has been set from
     * the user click event.
     * 
     * @param {Event} event
     * 
     */
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
        const { link } = this.state;
        // console.log(this.props);
        // console.log(`${match.url}`);
        const user = UserProfile.get();
        // Check if user is logged in before rendering this page
        // else redirect to login
        if(user === null) {
            return redirect.to({ url: `/login` })
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, {
                            [classes.hide]: this.state.open,
                        })}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Content Management System
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                
                    <CustomDrawer 
                        { ...this.props } 
                        drawerClose={this.handleDrawerClose}
                        handleLink={this.handleLink}
                        capitalize={this.capitalize}
                    />

                </Drawer>

                <main className={classes.content}>

                    <div className={classes.toolbar} />

                    <div className="card">
                        <div className="card-body">
                            <h4 >
                                <a className="heading" href="/#"/*href={`/`+ link}*/>
                                    { this.capitalize(link) }
                                </a>
                            </h4>
                            <RenderSection
                                link={ link } 
                                handleClick={ this.handleClick } 
                                handleChange={ (e) => { this.handleChange(e) } }
                                props={this.props}
                            />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

// styles
const styles = theme => ({
    root: {
      display: 'flex',
      background: '#eeeeee'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#15B371',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing.unit * 7 + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9 + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
});

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
        // logout
        logout: (user) => { dispatch(UserAuthAction.logout(user)) }
    };

}

CMSIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(CMSIndex)
);
