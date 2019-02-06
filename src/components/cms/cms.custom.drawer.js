import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { ListItem, List, Divider } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import SideBarWrapper from '../SideBarWrapper';

const drawer_controls = [
    { name: 'licencing', button: <Button className="bp3-minimal" icon="take-action" text="Licencing"/>},
    { name: 'financing', button: <Button className="bp3-minimal" icon="dollar" text="Financing"/>},
    { name: 'directory', button: <Button className="bp3-minimal" icon="manual" text="Directory"/>},
    { name: 'library', button: <Button className="bp3-minimal" icon="document" text="Library"/>},
    { name: 'gis', button: <Button className="bp3-minimal" icon="geosearch" text="GIS"/>},
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
        <Fragment>

            <List className={classes.margin}>
                {
                    drawer_controls.map((control, index) => (
                        <ListItem button key={control.name} onClick={(e) => handleLink(e, control.name)}>
                            { 
                                control.button 
                            }
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {config.map((control, index) => (
                    <ListItem button key={control.name} onClick={(e) => handleLink(e, control.name)}>
                        { control.button }
                    </ListItem>
                ))}
            </List>

        </Fragment>
    );

}

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
  
  export default withStyles(styles)(SideBarWrapper(CustomDrawer));