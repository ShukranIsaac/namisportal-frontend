import React, { Component } from 'react';
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
            rowsPerPage: 5,
            selectedAccount: null
        };
    }

    /**
     * Unless props and/or state changed, do not push new users to listOfUsers array
     * 
     */
    componentDidMount() {

        // then call accounts method to re-render component with new data
        this.accounts(this.props);

    }

    // counter to store the number of objects we pushed the array
    counter = 0;
    /**
     * create a user list object to be pushed into the listOfUsers array
     * of objects in the accounts method.
     */
    createUserList = (_id, date, fullname, username, ...userroles) => {
        this.counter += 1;
        return { id: this.counter, _id, date, fullname, username, userroles };
    }

    accounts = ({ users }) => {
        // check length of users array object
        if(users !== null) {
            users.map(user => {
                const name = user.lastName + ' ' + user.firstName;
                let custom, created = new Date(user.createdDate);
                custom = `${ created.getDay() + '/' + created.getMonth() + '/' + created.getFullYear() }`;
                
                const publisher = user.roles !== null && user.roles !== undefined ? user.roles.publisher ? 'Publisher' : 'None' : '';
                const writer = user.roles !== null && user.roles !== undefined ? user.roles.writer ? 'Writer' : 'None' : '';
                
                // id, name, username, roles, write and publish
                this.state.listOfUsers.push(this.createUserList(user._id, custom, name, user.username, [publisher, writer]));
                return null;
            });
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

    render() {

        const { classes, handleAccountClick } = this.props;
        const { listOfUsers, selectedAccount, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, listOfUsers.length - page * rowsPerPage);

        return(
            <>
                <EnhancedTableToolbar 
                    classes={ classes } 
                    numSelected={selected.length} 
                    handleAccountClick={handleAccountClick} 
                    selectedAccount={selectedAccount}
                />
                
                <div className={classes.tableWrapper}>

                    <Table className={classes.table} aria-labelledby="tableTitle">

                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={listOfUsers.length}
                        />

                        <TableBody>
                            {
                                algorithms.stableSort(listOfUsers, algorithms.sort(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
                                
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
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {user.date}
                                            </TableCell>
                                            <TableCell align="right">{user.fullname}</TableCell>
                                            <TableCell align="right">{user.username}</TableCell>
                                            <TableCell align="right">
                                                {
                                                    user.userroles.length !== 0 ? user.userroles.map((roles, key) => {

                                                        for(let index = 0; index < roles.length; index++) {

                                                            if(roles[index] !== "None") {

                                                                // for each user show the access level/s
                                                                return (
                                                                    <Chip
                                                                        key={roles[index]}
                                                                        tabIndex={-1}
                                                                        label={roles[index]}
                                                                        className={classes.chip} 
                                                                    />
                                                                );
    
                                                            }

                                                        }

                                                        return <div key={ key } />

                                                    }) : ''
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );

                                })
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
                    rowsPerPageOptions={[5, 15, 30]}
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