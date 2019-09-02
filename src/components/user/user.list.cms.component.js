import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableToolbar from './user.table.headbar';
import { EnhancedTableHead } from './user.table.headbar';
import { algorithms } from './user.sort';
import { TablePaginationActionsWrapped } from './user.table.footer';
import Chip from '@material-ui/core/Chip';
import { UserProfile, profile } from './user.profile';

/**
 * A list of user accounts
 * 
 * @author Isaac S. Mwakabira
 */
class ListUserAccounts extends Component {

    constructor() {
        super();
        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            listOfUsers: [],
            page: 0,
            rowsPerPage: 10,
            selectedAccount: null
        };
    }

    // check assigned roles
    isWriter = ({ user }) => {

        return user.roles !== undefined && (user.roles.writer ? true : false);

    }

    // check assigned roles
    isPublisher = ({ user }) => {

        return user.roles !== undefined && (user.roles.publisher ? true : false);
        
    }

    // check assigned roles
    isAdmin = ({ user }) => {

        return user.roles !== undefined && (user.roles.admin ? true : false);
        
    }

    // counter to store the number of objects we pushed the array
    counter = 0;
    /**
     * create a user list object to be pushed into the listOfUsers array
     * of objects in the accounts method.
     */
    createUserList = (_id, date, fullname, username, writer, publisher, admin, ...userroles) => {

        // incremet counter
        this.counter += 1;
        // return object
        return { id: this.counter, _id, date, fullname, username, userroles, writer, publisher, admin};
        
    }

    accounts = ({ users }) => {

        // check length of users array object
        if(users !== null) {
            
            // if listOfUsers array is not empty
            // do not add more users to it...This should be true only once, when all users 
            // have been loaded from the api
            if(this.state.listOfUsers.length === 0) {
                // map users
                users.map(user => {
                    const name = user.lastName + ' ' + user.firstName;
                    let created = new Date(user.createdDate).toLocaleDateString();
                    
                    // logged in user
                    const auth = UserProfile.get();
                                    
                    // make sure the logged in user is not displayed in the list
                    if (auth._id !== user._id) {

                        // id, name, username, roles, write and publish
                        if (user.roles !== undefined) {
                            this.state.listOfUsers.push(
                                this.createUserList(
                                    user._id,
                                    created,
                                    name,
                                    user.username,
                                    this.isWriter({user}),
                                    this.isPublisher({user}),
                                    this.isAdmin({ user }),
                                    Object.keys(user.roles)
                                )
                            );
                        } else {
                            this.state.listOfUsers.push(
                                this.createUserList(user._id,created,name,user.username,false,false,false,[])
                            );
                        }

                        return null;

                    } else {

                        return null;
                    
                    }
    
                });

            } // else do nothing
        }

    }

    handleRequestSort = (event, property) => {

        const orderBy = property;

        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
    
        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {

        if (event.target.checked) {
            this.setState(state => ({ selected: state.listOfUsers.map(user => user.id) }));
            return;
        }

        this.setState({ selected: [] });

    };

    handleClick = (event, id) => {

        const { selected, listOfUsers } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        // Do this when there is only one user clicked in the list
        if(!(selectedIndex > 1)) {
            // filter the user selected
            const user = listOfUsers.filter(u => u._id === event.currentTarget.id ? u : null)[0];
            // then add the one selected user to selectedAccount object
            Object.assign(this.state, { selectedAccount: user });
        }
    
        this.setState({ selected: newSelected });

    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    /**
     * If user logged in is writer show checkbox
     * If user logged in is publisher show checkbox
     * If user logged in has both show checkbox
     */
    showCheckbox = ({ user, isSelected }) => {
        if(user.roles.writer && !user.roles.publisher) {
            return (
                <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                </TableCell>
            );
        } else if(!user.roles.writer && user.roles.publisher) {
            return (
                <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                </TableCell>
            );
        } else if(user.roles.writer && user.roles.publisher) {
            return (
                <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                </TableCell>
            );
        } else {
            return (<TableCell />);
        }
    }

    render() {

        const { classes, handleAccountClick, general } = this.props;
        const { listOfUsers, selectedAccount, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, listOfUsers.length - page * rowsPerPage);

        // check if it is loading
        if(general !== undefined && general !== null) {
            
            // if loading show loader
            if (!general.isLoading) {

                // load users
                this.accounts(this.props);

            }

        }

        // logged in account
        const loggedInAccount = UserProfile.get();
        // console.log(roles)
        
        // profile access levels
        const showActions = profile.showActions();

        return(
            <>
                {
                    // returned false then then logged in user cannot edit, delete other accounts
                    // registered with the system.
                    <EnhancedTableToolbar 
                        classes={ classes } 
                        numSelected={selected.length} 
                        handleAccountClick={ (e) => handleAccountClick(e) } 
                        handleEditProfileClick={ (e) => handleAccountClick(e) }
                        handleAccountDelete={ (id, token) => this.props.deleteAccount(id, token) }
                        selectedAccount={selectedAccount}
                        showActions={ showActions }
                    />
                }
                
                <div className={classes.tableWrapper}>

                    <Table className={classes.table} aria-labelledby="tableTitle">

                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={listOfUsers.length}
                            showActions={ showActions }
                        />

                        <TableBody>
                            {
                                general !== null && ( 
                                    !general.isLoading ? 
                                    
                                        algorithms.stableSort(listOfUsers, algorithms.sort(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                                    
                                            const isSelected = this.isSelected(user.id);
                                            
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleClick(event, user.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={user.id}
                                                    id={user._id}
                                                    selected={isSelected}
                                                >
                                                    {
                                                        this.showCheckbox({ user: loggedInAccount, isSelected })
                                                    }
                                                    <TableCell component="th" scope="row" padding="none">
                                                        {user.date}
                                                    </TableCell>
                                                    <TableCell align="right">{user.fullname}</TableCell>
                                                    <TableCell align="right">{user.username}</TableCell>
                                                    <TableCell align="right">
                                                        {
                                                            user.userroles.length !== 0 ? user.userroles.map((roles, key) => {
                                                                        
                                                                if(roles.length !== 0) {
        
                                                                    // for each user show the access level/s
                                                                    return (
                                                                        <Fragment key={ key }>
                                                                            {
                                                                                user.writer === true ? (
                                                                                    <Chip
                                                                                        key={roles[0]} 
                                                                                        tabIndex={-1}
                                                                                        label={roles[0]} 
                                                                                        className={classes.chip} 
                                                                                    />
                                                                                ) : <div></div>
                                                                            }
        
                                                                            {
                                                                                user.publisher === true ? (
                                                                                    <Chip
                                                                                        key={roles[1]} 
                                                                                        tabIndex={-1}
                                                                                        label={roles[1]} 
                                                                                        className={classes.chip} 
                                                                                    />
                                                                                ) : <div></div>
                                                                            }

                                                                            {
                                                                                user.admin === true ? (
                                                                                    <Chip
                                                                                        key={roles[2]} 
                                                                                        tabIndex={-1}
                                                                                        label={roles[2]} 
                                                                                        className={classes.chip} 
                                                                                    />
                                                                                ) : <div></div>
                                                                            }
                                                                        </Fragment>
                                                                    );
        
                                                                }
        
                                                                return <div key={ key } />
        
                                                            }) : ''
                                                            
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            );
        
                                        })
                                    
                                    : <TableRow className="loader" />

                                )
                                
                            }

                            {
                                emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )
                            }

                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 30]}
                    component="div"
                    count={listOfUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={ TablePaginationActionsWrapped }
                />
                
            </>
        );

    }

}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: `100%`,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
});

ListUserAccounts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListUserAccounts);