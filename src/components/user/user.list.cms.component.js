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
        };
    }

    /**
     * Unless props and/or state changed, do not push new users to listOfUsers array
     * 
     */
    componentDidUpdate(prevProps, presState) {
        
        if(prevProps !== this.props) {
            // then call accounts method to re-render component with new data
            this.accounts(this.props);
        }

    }

    counter = 0;

    createUserList = (date, fullname, username, userroles) => {
        this.counter += 1;
        return { id: this.counter, date, fullname, username, userroles };
    }

    accounts = ({ users }) => {
        // check length of users array object
        if(users !== null) {
            users.map(user => {
                // return console.log(user)
                const name = user.lastName + ' ' + user.firstName;
                let custom, created = new Date(user.createdDate);
                custom = `${ created.getDay() + '/' + created.getMonth() + '/' + created.getFullYear() }`;
                // id, name, username, roles, write and publish
                this.state.listOfUsers.push(this.createUserList(custom, name, user.username, 'Publisher'));
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
            this.setState(state => ({ selected: state.listOfUsers.map(n => n.id) }));
            return;
        }

        this.setState({ selected: [] });

    };

    handleClick = (event, id) => {

        const { selected } = this.state;
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

        const { classes } = this.props;
        const { listOfUsers, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, listOfUsers.length - page * rowsPerPage);

        return(
            <>
                <EnhancedTableToolbar classes={ classes } numSelected={selected.length} />
                
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
                                            <TableCell align="right">{user.userroles}</TableCell>
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
});

ListUserAccounts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListUserAccounts);