import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { MuiFormFileinputField } from '../forms/form.fileinput.field';
import UserProfile, { profile } from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';
import Toast from '../../toastfy';

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

    filterCategory = (document_id) => {

        const { maincategory } = this.props;

        return maincategory && maincategory.subCategories.map(category => {

            // for each category
            // search if this id belongs to one of them and
            // return this category
            const documents = category.documents;
            const matched = documents.filter(d_id => d_id === document_id);

            if (matched) {
                return category
            } else {
                return null
            }
        })

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

    handleSubmit = (values) => {
        // prevent default behaviour
        // event.preventDefault();
        const { name, summary } = this.state;

        // category under which this documnet falls
        const { document } = this.props;

        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (name || summary || values) {
                // define sub-category structure
                const data = {
                    name: name,
                    description: summary,
                    file: values.supporting_document
                }

                this.props.editDocument(
                    data, 
                    user.token, 
                    document
                );
                
            }

        }

    }

    archiveDocument = (event) => {

        event.preventDefault();
        // question to be deleted
        const { document, filteredResource } = this.props;
        // if question exists then delete
        if (document !== null && document._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                // filtered resource category has to exist
                if (filteredResource !== null) {
                    this.props.archiveFileDocument(filteredResource, document, user.token);
                } else {
                    Toast.emit({
                        type: Toast.TYPES.INFO,
                        message: "Main Category does not exist. Please try again!"
                    });
                }
            }
        }

    }

    render() {

        const { classes, handleClick, handleSubmit, document, filteredResource, general } = this.props;

        // authenticated user
        const user = UserProfile.get();

        // state
        const { name, summary } = this.state;

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
                                                value={filteredResource ? (this.state.category ? this.state.category : filteredResource.name) : ''}
                                                name="category"
                                                disabled={ true }
                                                label='Category'
                                                placeholder="Edit document catgeory..."
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                        <BootstrapGridColumn>
                                            <BootsrapTextField
                                                value={document ? (this.state.name ? this.state.name : document.name) : ''}
                                                name="name"
                                                label='Name'
                                                placeholder="Edit document name..."
                                                handleChange={this.handleChange}
                                            />
                                        </BootstrapGridColumn>
                                    </div>

                                    <div className="form-group">
                                        <BootsrapTextareaField
                                            name="summary"
                                            value={document ? (this.state.summary ? this.state.summary : document.description) : ''}
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
                        disabled={!(name || summary)}
                        intent="success"
                        text="Save"
                    />

                    <ButtonControl
                        intent={Intent.DANGER}
                        value="Delete"
                        name="archive"
                        handleClick={(e) => this.archiveDocument(e)}
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

export default reduxForm({
    form: 'editLibraryDocument',
    Validate,
    AsyncValidate
})(withStyles(styles)(EditLibraryItem));