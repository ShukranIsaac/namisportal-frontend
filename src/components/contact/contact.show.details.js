import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './style.css'

import * as UserAuthAction from '../../actions/user.action';
import { Intent } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';
import styles from './form.styles';

class CreateContactDetails extends Component {

  componentDidMount() {

    // fetch contact details
    // this.props.fetchContact('Contact');

  }

  render(){

    const { classes, handleClick } = this.props;

    return (
        <Fragment>

            <div>

                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>

                <div>
                    
                    <h4><strong>Contact Details</strong></h4>
                    <p>
                        The Working Group contact details.
                    </p>
                    <p>
                        <br />
                        <p>
                            Email address <a href="mailto:questions@grid.mw" className={classes.link}> questions@grid.mw </a>
                        </p>
                        <br />
                        <h4>Physical Address:</h4>
                        <p>
                            Mini-grids Malawi,<br />890 West Point<br />Blantyre
                        </p>
                    </p>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="Edit Contacts"
                        name="edit"
                        handleClick={e => handleClick(e) }
                    />

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Contact"
                        name="create"
                        handleClick={e => handleClick(e) }
                    />

                </div>

            </div>

        </Fragment>
    );

  }
}

const mapStateToProps = (state) => {
    
  return {
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
      contactUs: (data, user) => { dispatch(UserAuthAction.contact(data, user)) },
  };

}

// const styles = theme => ({
//   link: {
//     color: theme.palette.primary.main,
//     textDecoration: 'none',
//     '&:hover': {
//       textDecoration: 'underline',
//     },
//   },
// });

CreateContactDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateContactDetails));
