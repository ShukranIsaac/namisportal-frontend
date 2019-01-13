import React from 'react';
import { ListItem, List, Divider, Drawer } from '@material-ui/core';
import { Button } from '@blueprintjs/core';

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

export default CustomDrawer;