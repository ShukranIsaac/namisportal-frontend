import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Button } from '@blueprintjs/core';

import styles from './form.styles';
import { redirect } from '../user/user.redirect';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import ContactMail from '@material-ui/icons/ContactMail';
import ContactFax from '@material-ui/icons/ContactPhone';
import ContactMobile from '@material-ui/icons/ContactPhoneOutlined';
import ContactAddress from '@material-ui/icons/Home';

import './text.field.css';

/**
 * Single custom text field
 * 
 * @author Isaac S. Mwakabira
 */
export const TextField = ({ icon, value }) => {

    return <>
        <div className="field col-md-12 col-sm-12">
            <span className={`inline icon-field`}>{ icon }</span>
            <div className="inline text-field">{value}</div>
        </div>
    </>

}

export class SidebarDefault extends React.Component {

    render() {
        const { col } = this.props;

        return (
            <div className={col}>
                <ul className="nav nav-pills nav-stacked">
                    {
                        this.props.children
                    }
                </ul>
            </div>
        );
    }

}

/**
 * Contacts page
 */
class ContactForm extends Component {

    constructor() {
        super();
        this.state = {}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        // state
        const { fullname, email, subject, message } = this.state;

        if (fullname&&email&&subject&&message) {
            // define sub-category structure
            const contact_us = {
                fullName: fullname,
                email: email,
                subject: subject,
                message: message
            }

            // send message
            this.props.contactUs(contact_us);
        }

    }

    render() {

        const { contact_us } = this.props;
        const { fullname, email, message, subject } = this.state;

        if (contact_us !== undefined && contact_us !== null) {
            const { success } = contact_us;
            // then redirect user accordingly
            if (success) {
                return redirect.to({ url: `/faq` });
            }

        }

        return (

            <form
                className={{ style: 'center' }}
                onSubmit={(e) => this.handleSubmit(e)}
                autoComplete="off"
            >
                <div className='margin-fix form-row'>
                    <BootstrapGridColumn>
                        <div className='margin-fix form-row'>
                            {/* <h4 style={{ marginLeft: `2em`, marginTop: `2e` }}><strong>Contact Us</strong></h4> */}
                            <h6 style={{ marginLeft: `1.5em`, marginTop: `1.5em`, marginRight: `1.5em` }}>
                                <p>The Working Group welcomes questions and comments about this site.</p>
                                <p>Please use the email, physical address or form below to contact us.</p>
                            </h6>
                        </div>
                        <SidebarDefault col={`col-md-12 col-md-12`}>
                            <TextField icon={ <ContactAddress /> } value={`Department of Energy Affairs, P/Bag 309, Lilongwe 3`} />
                            <TextField icon={ <ContactMail /> } value={`info@energy.gov.mw`} />
                            <TextField icon={ <ContactMobile /> } value={`+265 (1) 770 688`} />
                            <TextField icon={ <ContactFax /> } value={`+265 (1) 770 094/771954`} />
                        </SidebarDefault>
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <div className='margin-fix form-row'>
                            <h3 style={{ textAlign: 'center' }}>Feel free to ask anything!</h3>
                        </div>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="fullname"
                                    value={this.state.fullname}
                                    label="Fullname*"
                                    type="text"
                                    placeholder="Your fullname..."
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name='email'
                                    label='Email*'
                                    type='email'
                                    placeholder='Your email...'
                                    value={this.state.email}
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className="form-group">
                            <BootsrapTextField
                                value={this.state.subject}
                                name='subject'
                                label='Subject*'
                                type='text'
                                placeholder='Your message subject...'
                                handleChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <BootsrapTextareaField
                                value={this.state.message}
                                name='message'
                                label='Message*'
                                type='text'
                                placeholder='Your message...'
                                rows={8}
                                handleChange={this.handleChange}
                            />
                        </div>

                        <Button
                            style={{ alignSelf: 'center' }}
                            type="submit" 
                            disabled={!(fullname&&email&&message&&subject)}
                            intent="success"
                            text="Send"
                        />
                    </BootstrapGridColumn>
                </div>
            </form>
        );

    }

}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(ContactForm));
