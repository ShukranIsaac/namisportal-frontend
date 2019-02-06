// import React, { Fragment, Component } from 'react';
// import { Flex } from 'reflexbox';
// import { Elevation, Card } from "@blueprintjs/core";

// import CustomColumn from '../news/custom.column';
// import { UserContext } from '../user/user.context';
// import FormTextareaField from '../forms/form.textarea.field';
// import FormTextInputField from '../forms/form.textinput.field';
// import FormFileinputField from '../forms/form.fileinput.field';
// import ButtonControl from '../forms/buttons/button.default.control';
// import { TextEditor } from '../forms/editor';

// class CMSIndex extends Component {

//     render() {
//         return (
//             <UserContext.Consumer>
//                 {
//                     (context) => {
    
//                         return (
//                             <Fragment>
                
//                                 <Flex wrap row align='top' justify='left' m={1} w={1} p={1} style={{ margin: '0px' }}>
                    
//                                     <CustomColumn w={1/5} p={0} style={{}}>
                                        
//                                         <Card elevation={Elevation.ZERO}>
//                                             side { `${ context.state.isLoggedIn }` }
//                                         </Card>
                    
//                                     </CustomColumn>
                    
//                                     <CustomColumn w={1/2} p={1} style={{}}>
    
//                                         <FormTextareaField
//                                             name="content"
//                                             placeholder="News content..."
//                                             handleChange={ (e) => {
//                                                 console.log(e.target.value);
//                                             }}
//                                         />
    
//                                         <FormTextInputField
//                                             name="title"
//                                             placeholder="Article title..."
//                                             type="text"
//                                             handleChange={ e => {
//                                                 console.log(e.target.value);
//                                             } }
//                                         />
    
//                                         <FormFileinputField 
//                                             handleInputChange={ e => {
//                                                 console.log(e.target.value);
//                                             }} 
//                                         />
    
//                                         <ButtonControl
//                                             value="Edit"
//                                         />
    
//                                         <TextEditor />
    
//                                     </CustomColumn>
                    
//                                 </Flex>
                
//                             </Fragment>
//                         );
    
//                     }
//                 }
//             </UserContext.Consumer>
//         );
//     }

// }

// export default CMSIndex;


import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Container, Row, Col } from 'reactstrap';

import './style.css'
const drawerWidth = 240;

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

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

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
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
                <div className="card">
                    <div className="card-body">
                      <h4 ><a className="heading" href="/licencing">Licensing</a></h4>
                      <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>

                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>

                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>

                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>
                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>


                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>

                        <p>
                          The Mini-Grids Information Portal's Licensing section provides
                          an overview of procedures, prerequisites and required documentation
                          for obtaining generation, distribution, and supply licenses for small
                          powerplants.
                        </p>
                    </div>
                </div>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
