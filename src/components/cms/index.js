import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import { Button } from "@blueprintjs/core";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem } from '@material-ui/core';

import CustomColumn from '../news/custom.column';
import { UserContext } from '../user/user.context';
import FormTextareaField from '../forms/form.textarea.field';
import FormTextInputField from '../forms/form.textinput.field';
import FormFileinputField from '../forms/form.fileinput.field';

import EditNewsItem from '../news/news.edit.item';
import CreateNewsItem from '../news/news.create.item';
import ResourceSection from './section.cms';
import ListNewsArticles from '../news/news.list.items';

import * as UserEventActions from '../../actions/event.action';

const items = [
    { name: 'licencing', button: <Button className="bp3-minimal" icon="take-action" text="Licencing"/>},
    { name: 'financing', button: <Button className="bp3-minimal" icon="dollar" text="Financing"/>},
    { name: 'directory', button: <Button className="bp3-minimal" icon="manual" text="Directory"/>},
    { name: 'library', button: <Button className="bp3-minimal" icon="document" text="Library"/>},
    { name: 'news', button: <Button className="bp3-minimal" icon="applications" text="News"/>},
    { name: 'contact', button: <Button className="bp3-minimal" icon="id-number" text="Contact"/>}
];

const config = [
    { name: 'settings', button: <Button className="bp3-minimal" icon="settings" text="Settings"/>},
    { name: 'notifications', button: <Button className="bp3-minimal" icon="notifications" text="Notifications"/>},
    { name: 'user', button: <Button className="bp3-minimal" icon="user" text="Logout"/>},
];

const CustomDrawer = ({ classes, handleLink }) => {

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >

            <List>
                {
                    items.map((item, index) => (
                        <ListItem button key={item.name} onClick={(e) => handleLink(e, item.name)}>
                            { 
                                item.button 
                            }
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {config.map((item, index) => (
                    <ListItem button key={item.name} onClick={(e) => handleLink(e, item.name)}>
                        { item.button }
                    </ListItem>
                ))}
            </List>

        </Drawer>
    );

}

const RenderSection = ({ link, props, handleClick, handleChange }) => {
    
    switch (link) {

        case 'licencing':
            
            return (
                <FormTextInputField
                    name="title"
                    placeholder="Article title..."
                    type="text"
                    handleChange={ e => {
                        console.log(e.target.value);
                    } }
                />
            );

        case 'financing':
            
            return (
                <FormTextareaField
                    name="content"
                    placeholder="News content..."
                    handleChange={ (e) => {
                        console.log(e.target.value);
                    }}
                />
            );

        case 'directory':
        case 'library':
        case 'notifications':
        case 'news':
            
            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="news" 
                        List={ () => <ListNewsArticles handleClick={ (e) => handleClick(e) } handleChange={ e => handleChange(e) } /> }
                        Edit={ () => <EditNewsItem handleClick={ (e) => handleClick(e) } /> }
                        Create={ () => <CreateNewsItem handleClick={ (e) => handleClick(e) } />}
                    />

                </Fragment>
            );

        case 'user':
        case 'settings':
        case 'contact':
            
            return (
                <FormFileinputField 
                    handleInputChange={ e => {
                        console.log(e.target.value);
                    }} 
                />
            );
    
        default:
            return;
    }
}

/**
 * connected component, state management
 */
class CMSIndex extends Component {

    constructor() {
        super();
        this.state = {
            link: 'licencing',
            event: 'default',  // default value required when rendering a single resource section
            searchTerm: '',
        }

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleLink = this.handleLink.bind(this);
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

    handleLink = (e, link) => {

		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
        e.preventDefault();
        this.setState({ link });

    }

    handleChange = (e) => {

        this.setState({ searchTerm: e.target.value });

        console.log("Reached this far");
        
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
        console.log(this.props);
        
        return (
            <UserContext.Consumer>
                {
                    (context) => {
    
                        return (
                            <Fragment>
                
                                <Flex wrap row align='top' justify='left' m={1} w={1} p={1} style={{ margin: '0px' }}>
                    
                                    <CustomColumn
                                        m={2}
                                        w={1/5}
                                        p={1}
                                        className="format-cms-sidebar">
                                        
                                        <CustomDrawer classes={classes} handleLink={this.handleLink} />
                    
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

// console.log(state.event.event);


    return {
        user_event: state.event.event,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        editItem : () => { dispatch(UserEventActions.edit()) },
        publishItem : () => { dispatch(UserEventActions.publish()) },
        saveItem : () => { dispatch(UserEventActions.save()) },
        defaultItem : () => { dispatch(UserEventActions.initial()) },
        unpublishItem : () => { dispatch(UserEventActions.unpublish()) },
        deleteItem : () => { dispatch(UserEventActions.remove()) },
        archiveItem : () => { dispatch(UserEventActions.archive()) },
        createItem : () => { dispatch(UserEventActions.create()) },
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