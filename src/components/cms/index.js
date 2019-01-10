import React, { Fragment, Component } from 'react';
import { Flex } from 'reflexbox';
import { Intent, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem } from '@material-ui/core';

import CustomColumn from '../news/custom.column';
import { UserContext } from '../user/user.context';
import FormTextareaField from '../forms/form.textarea.field';
import FormTextInputField from '../forms/form.textinput.field';
import FormFileinputField from '../forms/form.fileinput.field';
import ButtonControl from '../forms/buttons/button.default.control';
import { TextEditor } from '../forms/editor';

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

const RenderSection = ({ link }) => {

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
                    <TextEditor />

                    <ButtonControl
                        intent={Intent.PRIMARY}
                        value="Edit"
                        handleClick={e => {
                            
                        }}
                    />

                    <ButtonControl
                        intent={Intent.PRIMARY}
                        value="Save"
                        handleClick={e => {
                            
                        }}
                    />

                    <ButtonControl
                        intent={Intent.SUCCESS}
                        value="Publish"
                        handleClick={e => {
                            
                        }}
                    />

                    <ButtonControl
                        intent={Intent.WARNING}
                        value="Unpublish"
                        handleClick={e => {
                            
                        }}
                    />

                    <ButtonControl
                        intent={Intent.DANGER}
                        value="Archive"
                        handleClick={e => {
                            
                        }}
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

class CMSIndex extends Component {

    constructor() {
        super();
        this.state = {
            link: 'licencing',
        }

        this.handleLink = this.handleLink.bind(this);
    }

    handleLink = (e, link) => {

        e.preventDefault();
        this.setState({ link })

    } 

    render() {
        const { classes } = this.props;

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

                                        <RenderSection link={this.state.link} />
    
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

export default withStyles(styles)(CMSIndex);