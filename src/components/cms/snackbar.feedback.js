import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = () => withStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: `1em`,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const SnackbarContentWrapper = useStyles()((props) => {
    const { className, message, onClose, variant, classes, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
});

SnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = theme => ({
    margin: {
        margin: `1em`,
    },
});

const RenderSnackbar = (props) => {

    switch (props.type) {

        case 'success':
            return (
                <SnackbarContentWrapper
                    onClose={ (e) => props.handleClose(e) }
                    variant="success"
                    message="This is a success message!"
                />
            );

        case 'warning':
            return (
                <SnackbarContentWrapper
                    variant="warning"
                    className={props.classes.margin}
                    message="This is a warning message!"
                    onClose={ (e) => props.handleClose(e) }
                />
            )

        case 'error':
            return (
                <SnackbarContentWrapper
                    variant="error"
                    className={props.classes.margin}
                    message="This is an error message!"
                    onClose={ (e) => props.handleClose(e) }
                />
            )

        case 'info': 
            return (
                <SnackbarContentWrapper
                    variant="info"
                    className={props.classes.margin}
                    message="This is an information message!"
                    onClose={ (e) => props.handleClose(e) }
                />
            )

        default:
            return;
    }
}

export class CustomizedSnackbars extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    handleClick = () => {
        this.setState({ open: true });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div>
                <Button variant="outlined" className={classes.margin} onClick={this.handleClick}>
                    Open success snackbar
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                    <RenderSnackbar 
                        type={ `success` } 
                        { ...this.state } 
                        { ...this.props } 
                        handleClose= {this.handleClose}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles2)(CustomizedSnackbars);