import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ContactForm from './contact.form';
import './style.css'

import * as UserAuthAction from '../../actions/user.action';

const Contact = ({
    ...props
}) => {

    return (<div className="container">
            <div className="row">
                <ContactForm {...props} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {

    return {
        general: state.general.general,
        contact_us: state.user.contact_us,
        contact: state.user.contact,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        // fetch contact details
        fetchContact: (name) => { dispatch(UserAuthAction.fetchContact(name)) },
        // contact us message, don't authenticate this route
        // since any user of the system can send a message.
        contactUs: (data) => { dispatch(UserAuthAction.contact(data)) },
    };

}

const styles = theme => ({
    width100: {
        width: '100%'
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: `100%`,
    },
    details: {
        alignItems: 'center',
    },
    helper: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, 
    mapDispatchToProps)(Contact));
