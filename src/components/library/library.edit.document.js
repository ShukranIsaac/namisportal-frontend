import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import { UserProfile, profile } from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditLibraryItem extends Component {

    constructor() {
        super();
        this.state = {}

        /**
         * Bind events to each Function, so that they can be passed without args 
         * i.e this.handleChange
         * 
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

	/**
	 * On change, update the app's React state with event type value.
	 *
	 * @param {Event} event
	 */
    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target === 'files' ? event.target.files[0] : event.target.value
        });

    }

    handleSubmit = (event) => {
        // prevent default behaviour
        event.preventDefault();
        const { name, shortname, summary, supporting_document } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (name || shortname || summary || supporting_document) {
                // define sub-category structure
                const data = {
                    name: name,
                    shortName: shortname,
                    about: summary,
                    file: supporting_document
                }

                console.log(data)
                // this.props.createStakeholder(data, user.token);
                // then change state to default
                // so that the page redirects and list all home items
                this.props.defaultItem();
            }

        }

    }

    render() {

        const { classes, handleClick, handleSubmit, subcategory, general } = this.props;

        // authenticated user
        const user = UserProfile.get();

        // state
        const { name, shortname, summary, supporting_document } = this.state;

        return (
            <Fragment>

                <form onSubmit={handleSubmit(values => this.handleSubmit(values))} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Documents"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    {
                        general && (
                            !general.isLoading ? (
                                <Fragment>
                                    <div className='margin-fix form-row'>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                value={subcategory ? (this.state.category ? this.state.category : subcategory.name) : ''}
                                                name="category"
                                                label='Category'
                                                placeholder="Edit document category..."
                                                handleChange={this.handleChange}
                                                disabled={true}
                                            />
                                        </BootstrapGridColumn>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                value={subcategory ? (this.state.name ? this.state.name : subcategory.name) : ''}
                                                name="name"
                                                label='Name'
                                                placeholder="Edit document name..."
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                name="shortname"
                                                type="text"
                                                placeholder="Edit document shortname..."
                                                label="Shortname"
                                                value={subcategory ? (this.state.shortname ? this.state.shortname : subcategory.shortName) : ''}
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                    </div>

                                    <div className="form-group">
                                        <BootsrapTextareaField
                                            name="summary"
                                            value={subcategory ? (this.state.summary ? this.state.summary : subcategory.about) : ''}
                                            placeholder="Edit document summary..."
                                            label="Summary Text"
                                            type="text"
                                            rows={10}
                                            handleChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="margin-fix form-row" style={{ width: `30%` }}>
                                        <BootstrapGridColumn>
                                            <MuiFormFileinputField
                                                id="pdf_document"
                                                placeholder="Upload PDF Document*"
                                                classes={classes}
                                                type="file"
                                                name='supporting_document'
                                                handleFileChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                    </div>
                                </Fragment>
                            ) : <div style={{ marginTop: `50px` }} className="loader" />
                        )
                    }

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Button
                        type="submit"
                        disabled={!(name || shortname || summary || supporting_document)}
                        intent="success"
                        text="Save"
                    />

                    <ButtonControl
                        intent={Intent.DANGER}
                        value="Delete"
                        name="archive"
                        handleClick={e => handleClick(e)}
                        disabled={!profile.canDelete({ user })}
                    />

                    <Button
                        className={classes.margin}
                        name="default" 
                        intent="primary"
                        text="Cancel"
                        onClick={e => handleClick(e)}
                    />

                </form>

            </Fragment>
        );

    }

}

EditLibraryItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(EditLibraryItem));