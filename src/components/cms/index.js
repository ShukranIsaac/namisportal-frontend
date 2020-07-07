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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import * as UserEventActions from '../../actions/event.action';
import * as LibraryAction from '../../actions/index';
import * as UserAuthAction from '../../actions/user.action';
import * as HomeAction from '../../actions/home.action';
import * as CMSAction from '../../actions/cms.action';
import * as Stakeholder from '../../actions/stakeholder.action';
import * as NewsAction from '../../actions/news.action';
import * as GisAction from '../../actions/gis.action';

import CustomDrawer from './cms.custom.drawer';
import RenderSection from './cms.render.section';
import UserProfile from '../user/user.profile';
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
            link: UserProfile.get() !== null
                && (UserProfile.get().roles.admin || UserProfile.get().roles.writer
                    || UserProfile.get().roles.publisher ? 'home' : 'accounts'),
            event: 'default',  // default value required when rendering a single resource section
            searchTerm: '',
            doc_title: '',
            open: true,
            category: null,
            selectedDistrict: null,
            openMenu: false,
            anchorEl: null
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
        this.categoryClick = this.categoryClick.bind(this);
        this.handleProfileEdit = this.handleProfileEdit.bind(this)

    }

    handleFilteredResource = (filter) => filter && this.setState({ filteredResource: filter });

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        const user = UserProfile.get();
        if (user !== null) {
            if (user.roles.admin || user.roles.writer || user.roles.publisher) {
                this.props.homeSubcategory("Home");
                this.props.defaultItem();
            }

            if (!(user.roles.admin || user.roles.publisher || user.roles.writer) && this.state.link !== "logout") {
                this.props.fetchUser(user._id, user.token);
                this.props.editItem();
            }
        }

    }

    componentDidUpdate(prev, next) {
        // if a non admin user account was edited
        // and link equals logout
        const user = UserProfile.get();
        // if user exists
        if (user !== null) {
            if (!(user.roles.admin || user.roles.publisher || user.roles.writer) && this.state.link !== "logout") {
                this.props.editItem();
            }
        }

    }

    handleLink = (e, link) => {

		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
        e.preventDefault();

        // Set state: which section has been visited
        this.setState({ link });

        const roles = UserProfile.get().roles;
        // fetch this component data is this link is clicked
        if (roles.admin || roles.writer || roles.publisher) {
            this.fetchComponent(link)

            // then call default event action so that when a new section is visited on link change 
            // the app should set state to deafult and show home page for that section.
            // Not maintaining the previous section state
            this.props.defaultItem();
        } else {
            if (this.state.link !== "logout") {
                this.props.fetchUser(UserProfile.get()._id, UserProfile.get().token);
                // check previous user_event
                if (this.props.event === 'edit') {
                    this.props.defaultItem();
                } else {
                    this.props.editItem();
                }
            }
        }

        // 
        if (this.state.link === "home") {
            // if no home categories exists,
            // create one to start.
            if (this.props.home) {
                if (this.props.home.length === 0) {
                    this.props.createItem();
                }
            }
        }

        if (this.state.link === "logout") {
            this.props.defaultItem();
        }

    }

    /**
     * Fetch component/category data from API depending on the link visited
     * in the CMS index page
     */
    fetchComponent = (link) => {

        // check which link has been visited
        switch (link) {

            case 'library':
                /**
                 * Fetch all library docs
                 */
                // this.props.fetchLibraryDocs();
                this.props.category(this.capitalize(link));
                break;
            case 'home':
                /**
                 * Fetch all home sub category
                 */
                this.props.homeSubcategory(this.capitalize(link));
                break;
            case 'directory':
                /**
                 * Fetch all directory of stakeholders and their details
                 */
                this.props.fetchStakeholders();
                this.props.category(this.capitalize(link));
                break;
            case 'financing':
                /**
                 * Financing
                 */
                this.props.category(this.capitalize(link));
                break;
            case 'faqs':
                /**
                 * Frequently asked questions
                 */
                this.props.category(this.capitalize(link));
                break;
            case 'licensing':
                /**
                 * Licensing
                 */
                this.props.category(this.capitalize(link));
                break;
            case 'news':
                /**
                 * News
                 */
                this.props.fetchNewsArticles();
                break;
            case 'accounts':
                /**
                 * All user accounts
                 */
                const user = UserProfile.get();
                // check if the user exist ie. logged in
                if (user !== null && user.roles.admin) {
                    this.props.fetchUsers(user);
                } else {

                }
                break;
            case 'gis':
                /**
                 * Fetch all gis filters
                 */
                this.props.fetchFilters();
                // fetch plant filters
                // this.props.powerPlantFilters();
                break
            default:
                break;
        }

    }

    /**
     * Capitalize first letter of this word
     */
    capitalize = (character) => {

        return character && character[0].toUpperCase() + character.slice(1);

    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value }, () => {
            //set and fetch district which has been selected
            const { gis_filters } = this.props;
            const { district_name, region_name } = this.state;
            if (district_name !== undefined && district_name !== "") {
                // region index
                const index = gis_filters.findIndex(o => o.properties.name === region_name);
                // filter district selected
                let district = gis_filters[index].districts[gis_filters[index].districts.findIndex(o => o.properties.name === district_name)];
                // then set state and 
                // prevent page from refreshing
                this.setState({ selectedDistrict: district }, () => {

                    const { selectedDistrict } = this.state;

                    if (selectedDistrict !== null && selectedDistrict !== undefined) {
                        // make request
                        this.props.gisFeatures(selectedDistrict._id);
                    }

                })
            }
        });

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

    /**
     * On click single category
     */
    categoryClick = (categoryId) => {

        // fetch category(sub)
        this.props.subCategory(categoryId);

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
        switch (event.currentTarget.name) {
            case 'publish':
                this.props.publishItem();
                break;
            case 'edit':

                this.props.editItem();
                // get cms component name, ie. current component
                const { link } = this.state;
                if (link === 'home') {

                    // fetch category
                    this.props.subCategory(event.currentTarget.id);
                } else if (link === 'directory') {

                    // fetch stakeholder
                    this.props.fetchSingleStakeholder(event.currentTarget.id)
                } else if (link === 'news') {

                    // fetch news article
                    this.props.fetchArticle(event.currentTarget.id)
                } else if (link === 'accounts') {

                    // fetch logged in user
                    const user = UserProfile.get();
                    if (user !== null) {
                        if (user.token !== null && user.token !== undefined) {
                            // fetch account to edit
                            this.props.fetchUser(event.currentTarget.id, user.token);
                        }
                    }

                } else if (link === 'faqs') {
                    /**
                     * To edit clicked question in the list
                     * Fetch logged in user,
                     * Then fetch question/category to edit
                     */

                    const user = UserProfile.get();
                    if (user !== null) {
                        if (user.token !== null && user.token !== undefined) {
                            // fetch account to edit
                            this.props.fetchQuestion(event.currentTarget.id);
                        }
                    }

                } else if (link === 'licensing') {

                    /**
                     * To edit clicked license step in the list
                     * Then fetch category to edit
                     */
                    this.props.subCategory(event.currentTarget.id);
                    // this.props.reload()

                } else if (link === 'financing') {

                    /**
                     * To edit chosen financing category
                     * Then fetch category to edit
                     */
                    this.props.subCategory(event.currentTarget.id);

                } else if(link === 'library') {

                    // fetch the document to be edited
                    this.props.downloadFile(event.currentTarget.id)

                } else {
                    /** 
                     * do nothing, 
                     * completely nothing wamva eti
                     */
                    // this.props.defaultItem();
                }

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

    handleProfileMenu = (event) => {
        this.setState({ openMenu: true, anchorEl: event.currentTarget })
    }

    handleProfileEdit = (event) => {
        this.setState({
            openMenu: false,
            anchorEl: null,
            link: 'accounts',
            /**
             * This synthetic event is reused for performance reasons. 
             * If you're seeing this, you're accessing the method `currentTarget` on a released/nullified 
             * synthetic event. This is a no-op function. If you must keep the original synthetic event around,
             * use event.persist(). See https://fb.me/react-event-pooling for more information.
             * 
             * To avoid the above error, set state here so that we can use the id in the callback function
             * to fetch a new user. Instead of accessing the id directlry from the event.
             */
            accountId: event.currentTarget.id
        }, () => {
            // load logged in user
            if (this.state.link === 'accounts') {

                // fetch logged in user
                const user = UserProfile.get();
                if (user !== null) {
                    if (user.token !== null && user.token !== undefined) {
                        // fetch account to edit
                        this.props.fetchUser(this.state.accountId, user.token);
                    }
                }

                this.props.editItem();

            }
        })
    }

    handleProfileClose = () => {
        this.setState({ openMenu: false, anchorEl: null })
    }

    handleLogout = (event) => {
        // cloese menu
        this.setState({ openMenu: false, anchorEl: null });
        // handle logout
        this.handleLink(event, event.currentTarget.id)
    }

    handleProfile = () => {

        const auth = UserProfile.get();
        const { classes } = this.props;

        return (
            <div>
                <span>
                    {auth != null && auth.username} |
                    <IconButton
                        aria-label="Account of current user"
                        title={`Logged in as ${auth != null && auth.username}`}
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleProfileMenu}
                        color="inherit"
                        className={classes.marginRight}
                    >
                        <AccountCircle />
                    </IconButton>
                </span>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.openMenu}
                    onClose={this.handleProfileClose}
                >
                    {
                        (auth.roles.admin || auth.roles.writer || auth.roles.publisher) && (
                            <MenuItem
                                onClick={this.handleProfileEdit}
                                id={auth._id}
                            >
                                My account
                            </MenuItem>
                        )
                    }
                    <MenuItem onClick={this.handleLogout} id="logout">Logout</MenuItem>
                </Menu>
            </div>
        );

    }

    render() {

        const { classes, general, actionType } = this.props;
        const { link, } = this.state;

        // get loggedin user
        const user = UserProfile.get();
        // Check if user is logged in before rendering this page
        // else redirect to login
        if (user === null) {
            return redirect.to({ url: `/login` })
        } else {
            // TODO logout users if roles changed
            // user is already logged in 
            // but certain roles assigned to them have changed
            // log them out first then redirect to login page
        }
        // console.log(this.props.loaded)
        if (general !== null) {
            // isLoading or not
            if (!general.isLoading && actionType === 'REQUEST_CATEGORY') {
                // console.log(this.props.subcategory)
                Object.assign(this.state, { category: this.props.subcategory });
            }
        }

        return (
            <div className={classes.root}>

                <CssBaseline />

                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                    style={{ backgroundColor: "#0171D0" }}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, { [classes.hide]: this.state.open })}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                            <a
                                href="/#" style={{ color: `white` }}
                                onClick={(event) => redirect.toExternalLink({ url: '/', event })}
                            >
                                Admin - Namis Portal
                            </a>
                        </Typography>

                        {user && this.handleProfile()}

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
                        {...this.props}
                        {...this.state}
                        drawerClose={this.handleDrawerClose}
                        handleLink={this.handleLink}
                        capitalize={this.capitalize}
                    />

                </Drawer>

                <main className={classes.content}>

                    <div className={classes.toolbar} />

                    <div className="card">
                        <div className="card-body">

                            {
                                !this.state.open ?
                                    <div>
                                        <h4 >
                                            <a className="heading" href="/#"/*href={`/`+ link}*/>
                                                {this.capitalize(link)}
                                            </a>
                                        </h4>
                                    </div>
                                    : <div></div>
                            }

                            <RenderSection
                                link={link}
                                handleClick={this.handleClick}
                                // categoryClick={ this.categoryClick }
                                handleChange={(e) => { this.handleChange(e) }}
                                props={this.props}
                                {...this.state}
                                capitalize={this.capitalize}
                                handleFilteredResource={ this.handleFilteredResource }
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
        background: '#eeeeee',
        flexGrow: 1,
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
    highlight: {
        background: '#dcdde1'
    },
    menuProfileButton: {
        marginRight: theme.spacing.unit * 2,
    },
    title: {
        flexGrow: 1,
    },
    chipsRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        marginBottom: '1em',
        '& > *': {
            marginRight: theme.spacing.unit * 0.9,
        }
    },
});

const mapStateToProps = (state) => {

    return {
        errored: state.news.errored,
        general: state.general.general,
        actionType: state.cms.actionType,
        features: state.cms.features,
        user_event: state.event.event,
        library: state.library.library,
        sub_cate_documents: state.library.library_sub_cate_documents,
        loaded: state.library.loaded,
        document: state.library.document,
        home: state.home.home,
        subcategory: state.cms.subcategory,
        maincategory: state.cms.maincategory,
        question: state.cms.question,
        stakeholder: state.stakeholder.stakeholder,
        stakeholders_list: state.stakeholder.stakeholders_list,
        article: state.news.article,
        articles: state.news.articles,
        users: state.user.users,
        user: state.user.user,
        gis_filters: state.gis_filters.gis_filters,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        // general category
        editItem: () => { dispatch(UserEventActions.edit()) },
        publishItem: () => { dispatch(UserEventActions.publish()) },
        saveItem: () => { dispatch(UserEventActions.save()) },
        defaultItem: () => { dispatch(UserEventActions.initial()) },
        unpublishItem: () => { dispatch(UserEventActions.unpublish()) },
        deleteItem: () => { dispatch(UserEventActions.remove()) },
        archiveItem: () => { dispatch(UserEventActions.archive()) },
        createItem: () => { dispatch(UserEventActions.create()) },
        reload: () => { dispatch(UserEventActions.reload()) },
        // Library category
        fetchLibrary: (id, name, type) => { 
            dispatch(LibraryAction.fetchLibrary(id, name, type)) 
        },
        fetchLibraryDocs: () => { dispatch(LibraryAction.fetchAllLibraryDocs()) },
        // library files and documents
        uploadFile: (i, d, t) => { dispatch(LibraryAction.uploadFile(i, d, t)) },
        downloadFile: (i) => { dispatch(LibraryAction.fetchFileDocument(i)) },
        fetchCategoryDocs: (i) => { dispatch(LibraryAction.fetchCategoryDocuments(i)) },
        editDocument: (d, t, o) => { dispatch(LibraryAction.editDocument(d,t,o)) },
        archiveFileDocument: (cat_id, id,token) => { dispatch(LibraryAction.archiveFileDocument(cat_id,id,token)) },
        // logout
        logout: (user) => { dispatch(UserAuthAction.logout(user)) },
        // home and cms home
        homeSubcategory: (c) => { dispatch(HomeAction.fetchHomeCategories(c)) },
        subCategory: (id) => { dispatch(CMSAction.fetchSubCategory(id)) },
        category: (name) => { dispatch(CMSAction.fetchCategory(name)) },
        createCategory: (i, c, t, link) => { dispatch(CMSAction.addCategory(i, c, t, link)) },
        addResourceCategory: (i, c, t, link) => { dispatch(CMSAction.addResourceCategory(i, c, t, link)) },
        editCategory: (s, e, t, state, link) => { dispatch(CMSAction.editCategory(s, e, t, state, link)) },
        editResourceCategory: (s, e, t, state, link) => { dispatch(CMSAction.editResourceCategory(s, e, t, state, link)) },
        archiveCategory: (c, t, link) => { dispatch(CMSAction.archiveCategory(c, t, link)) },
        archiveResourceCategory: (c, t, link) => { dispatch(CMSAction.archiveResourceCategory(c, t, link)) },
        // stakeholders
        createStakeholder: (s, t) => { dispatch(Stakeholder.createStakeholder(s, t)) },
        fetchSingleStakeholder: (i) => { dispatch(Stakeholder.fetchSingleStakeholder(i)) },
        fetchStakeholders: () => { dispatch(Stakeholder.fetchAllStakeholders()) },
        editStakeholder: (i, s, t) => { dispatch(Stakeholder.editStakeholder(i, s, t)) },
        deleteStakeholder: (s, t) => { dispatch(Stakeholder.deleteStakeholder(s, t)) },
        uploadStakeholderLogo: (i, im, t) => { dispatch(Stakeholder.uploadStakeholderLogo(i, im, t)) },
        // news articles
        fetchNewsArticles: () => dispatch(NewsAction.fetchAllArticles()),
        fetchArticle: (id) => dispatch(NewsAction.fetchArticleById(id)),
        editArticle: (id, article, token) => dispatch(NewsAction.editArticle(id, article, token)),
        deleteArticle: (id, token) => dispatch(NewsAction.deleteArticle(id, token)),
        // user accounts
        fetchUsers: (user) => dispatch(UserAuthAction.fetchUsers({ user })),
        fetchUser: (id, token) => dispatch(UserAuthAction.fetchUser(id, token)),
        updateUser: (id, user, token) => dispatch(UserAuthAction.updateUser(id, user, token)),
        deleteAccount: (id, token) => dispatch(UserAuthAction.deleteAccount(id, token)),
        // frequently asked questions
        fetchQuestion: (id) => { dispatch(CMSAction.fetchQuestion(id)) },
        // gis
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        gisFeatures: (district_id) => { dispatch(GisAction.features(district_id)) },
        addFeature: (feature, type, token) => { dispatch(GisAction.addFeature(feature, type, token)) }
    };

}

CMSIndex.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(CMSIndex)
);
