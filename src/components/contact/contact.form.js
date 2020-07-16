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
import ContactAddress from '@material-ui/icons/LocalPostOffice';

import './text.field.css';

/**
 * Single custom text field
 * 
 * @author Isaac S. Mwakabira
 */
export const TextField = ({ icon, value }) => {

    return <>
        <div className="field col-md-12 col-sm-12">
            <span className={`inline icon-field`}>{icon}</span>
            <div className="inline text-field">{value}</div>
        </div>
    </>

}

export const SidebarDefault = ({ 
    col, 
    ...props 
}) => (<div className={col}>
    <ul className="nav nav-pills nav-stacked">
        {
            props.children
        }
    </ul>
</div>)

const SendButton = ({ 
    text, 
    ...other 
}) => (<Button
        style={{ alignSelf: 'center' }}
        type="submit"
        disabled={!(other.fullname && other.email && 
            other.message && other.subject)}
        intent="success"
        text={ text }
    />
);

export const ContactInfo = withStyles(styles)(() => {
    return (<div className='margin-fix form-row'>
        <BootstrapGridColumn>
            <div className='form-row'>
                <h6 style={{ 
                        marginLeft: `1.5em`, 
                        marginTop: `1em`, 
                        marginRight: `1.5em` 
                    }}
                >
                    <h2>Contact Us</h2>
                </h6>
            </div>
            <SidebarDefault>
                <TextField icon={<ContactAddress />} value={`Ministry of Agriculture, P/Bag X, Lilongwe 3`} />
                <TextField icon={<ContactMail />} value={`info@namis.gov.mw`} />
                <TextField icon={<ContactMobile />} value={`+265 (1) 770 688`} />
                <TextField icon={<ContactFax />} value={`+265 (1) 770 094`} />
            </SidebarDefault>
        </BootstrapGridColumn>
    </div>)
})

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

        if (fullname && email && subject && message) {
            // define sub-category structure
            const paylooad = {
                fullName: fullname,
                email: email,
                subject: subject,
                message: message
            }

            // send message
            this.props.contactUs(paylooad);
        }

    }

    render() {

        const { fullname, email, message, subject, general } = this.state;

        const { contact_us } = this.props;

        /**
         * Only redirect if and when one of these are value set
         * and contact_us is not null.
         */
        if (contact_us !== null && (message !== undefined || email !== undefined)) {
            // then redirect user accordingly
            if (contact_us) {
                if (contact_us.success !== null && contact_us.success) {
                    // set contact_us to null
                    Object.assign(this.state, { contact_us: null });
    
                    return redirect.to({ url: `/faqs` });
                }
            }
        }

        return (<form className="container" autoComplete="off"
                onSubmit={(e) => this.handleSubmit(e)}
            >
                <div className='form-row'>
                    <BootstrapGridColumn>
                        {/* <div className='margin-fix form-row'>
                            <h3>Any questions? Please send us a message!</h3>
                        </div> */}
                        <div className='form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="fullname"
                                    value={fullname}
                                    label="Fullname*"
                                    type="text"
                                    placeholder="Your fullname..."
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name='email'
                                    label='Email*'
                                    type='email'
                                    placeholder='Your email...'
                                    value={email}
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className="form-group">
                            <BootsrapTextField
                                value={subject}
                                name='subject'
                                label='Subject*'
                                type='text'
                                placeholder='Your message subject...'
                                handleChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <BootsrapTextareaField
                                value={message}
                                name='message'
                                label='Message*'
                                type='text'
                                placeholder='Your message...'
                                rows={4}
                                handleChange={this.handleChange}
                            />
                        </div>

                        {
                            general ? 
                                general.isLoading ? <SendButton text="Sending..." {...this.state} /> 
                                : <SendButton text="Send" {...this.state} />
                            : <SendButton text="Send" {...this.state} />
                        }
                    </BootstrapGridColumn>
                </div>
            </form>
        );

    }

}

ContactInfo.propTypes = {
    classes: PropTypes.object.isRequired,
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(ContactForm));
