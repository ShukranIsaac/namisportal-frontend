import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

/**
 * Enhanced table head
 * 
 * @author Isaac S. Mwakabira
 */
export class EnhancedTableHead extends React.Component {

    rows = [
        { id: 'date', numeric: false, disablePadding: true, label: 'Date Created' },
        { id: 'fullname', numeric: true, disablePadding: false, label: 'Fullname' },
        { id: 'username', numeric: true, disablePadding: false, label: 'Username' },
        { id: 'userroles', numeric: true, disablePadding: false, label: 'Roles' },
    ];
            
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
  
    render() {

        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {
                            numSelected > 1 ? (
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={numSelected === rowCount}
                                    onChange={onSelectAllClick}
                                />
                            ) : null
                        }
                    </TableCell>

                    {
                        this.rows.map(row => (
                            <TableCell
                                key={row.id} align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >

                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,)
                    }
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

/**
 * Users table toolbar - User accounts list header menu composition
 * 
 * @author Isaac S. Mwakabira
 */
class EnhancedTableToolbar extends React.Component {

    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { handleAccountClick, numSelected, classes, selectedAccount } = this.props;
        const { open } = this.state;

        return (
            <Toolbar className={classNames(classes.root, { [classes.highlight]: numSelected > 0, })}>
            
                <div className={classes.title}>
                    {
                        numSelected > 0 ? (
                            <Typography color="inherit" variant="subtitle1">
                                {
                                    numSelected > 1 ? `${ numSelected + ' selected' }` : null
                                } 
                            </Typography>
                        ) : (<Typography variant="h6" id="tableTitle"></Typography>)
                    }
                </div>

                <div className={classes.actions}>
                    {
                        numSelected > 0 ? (
                            <Fragment>
                                {
                                    numSelected === 1 ? (
                                        <Fragment>
                                            <Tooltip title="Edit">
                                                <IconButton 
                                                    name="edit" 
                                                    aria-label="Edit" 
                                                    onClick={ (e) => handleAccountClick(e) }
                                                    id={selectedAccount._id}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton aria-label="Delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Fragment>
                                    ) : (
                                        <Tooltip title="Delete">
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Tooltip title="More actions">
                                    <IconButton 
                                        aria-label="More actions" 
                                        buttonRef={ node => {
                                            this.anchorEl = node
                                        }}
                                        aria-owns={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
                                    >
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            id="menu-list-grow"
                                            style={{ 
                                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' 
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleClose}>
                                                    <MenuList>
                                                        <MenuItem onClick={this.handleClose}>
                                                            New account
                                                        </MenuItem>
                                                        <MenuItem name="edit" onClick={ (e) => {
                                                                    // close menu first then go to edit page
                                                                    this.handleClose(e);
                                                                    handleAccountClick(e);
                                                                }
                                                            }
                                                        >
                                                            Edit profile
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Fragment>
                        )
                    }
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

const menuStyles = theme => ({
    root: {
      display: 'flex',
    //   paddingRight: theme.spacing.unit,
    },
    paper: {
      marginRight: theme.spacing.unit * 2,
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

export default withStyles(menuStyles)(EnhancedTableToolbar);