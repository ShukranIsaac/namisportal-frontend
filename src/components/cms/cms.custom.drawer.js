import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { ListItem, List, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FinancingIcon from '@material-ui/icons/AttachMoney';
import DocumentIcon from '@material-ui/icons/InsertDriveFile'
import GisIcon from '@material-ui/icons/Map'
import LicencingIcon from '@material-ui/icons/Gavel'
import DirectoryIcon from '@material-ui/icons/LocalLibrary'
import NewsIcon from '@material-ui/icons/LibraryBooks'
// import ContactIcon from '@material-ui/icons/ContactMail'
// import AccountIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import LogoutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import FAQIcon from '@material-ui/icons/QuestionAnswer';
import { UserProfile } from '../user/user.profile';

const drawer_controls = [
    { name: 'home', button: <HomeIcon /> },
    { name: 'licensing', button: <LicencingIcon /> },
    { name: 'financing', button: <FinancingIcon /> },
    { name: 'directory', button: <DirectoryIcon /> },
    { name: 'library', button: <DocumentIcon /> },
    { name: 'gis', button: <GisIcon /> },
    { name: 'news', button: <NewsIcon /> },
    // { name: 'contact', button: <ContactIcon/>},
    { name: 'faqs', button: <FAQIcon /> }
];

const config = [
    { name: 'accounts', button: <PersonAddIcon /> },
    // { name: 'profile', button: <AccountIcon />},
    { name: 'logout', button: <LogoutIcon /> },
];

/**
 * Custom material-ui drawer
 * 
 * @author Paul S. Sembereka
 * @author Isaac S. Mwakabira
 * 
 * @param {Object} classes 
 * @param {Theme} theme
 * @param {Function} handleLink
 * @param {Function} capitalize
 * @param {Function} drawerClose
 * 
 */
const CustomDrawer = ({
    classes,
    theme,
    handleLink,
    capitalize,
    drawerClose,
    link,
    home
}) => {
    // console.log(home)
    const auth = UserProfile.get();

    return (
        <Fragment>

            <div className={classes.toolbar}>
                <IconButton onClick={drawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>

            <Divider />

            <List>
                {
                    auth.roles.admin && drawer_controls.map(({ name, button }) => {
                        // 
                        if (home.length === 0) {
                            if (name === 'home') {
                                return (
                                    <ListItem
                                        button
                                        key={name}
                                        onClick={(e) => handleLink(e, name)}
                                        className={`${link === name && classes.highlight}`}
                                    >
                                        <ListItemIcon>{button}</ListItemIcon>
                                        <ListItemText primary={capitalize(name)} />
                                    </ListItem>
                                );
                            }
                        } else {
                            return (
                                <ListItem
                                    button
                                    key={name}
                                    onClick={(e) => handleLink(e, name)}
                                    className={`${link === name && classes.highlight}`}
                                >
                                    <ListItemIcon>{button}</ListItemIcon>
                                    <ListItemText primary={capitalize(name)} />
                                </ListItem>
                            );
                        }

                    })
                }
            </List>

            {
                auth.roles.admin && <Divider />
            }

            <List>
                {config.map(({ name, button }) => (
                    <ListItem
                        button
                        key={name}
                        onClick={(e) => handleLink(e, name)}
                        className={`${link === name && classes.highlight}`}
                    >
                        <ListItemIcon>{button}</ListItemIcon>
                        <ListItemText primary={capitalize(name)} />
                    </ListItem>
                ))}
            </List>

            {
                !auth.roles.admin && <Divider />
            }

        </Fragment>
    );

}

// styles
const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: `100%`,
    },
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2,
        minWidth: 'auto',
    },
    legend: {
        marginTop: theme.spacing.unit * 3,
    },
    margin: {
        marginLeft: theme.spacing.unit * 0,
    },
});

CustomDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomDrawer);