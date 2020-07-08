import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import '../cms/style.css';
import UserProfile, { profile } from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import ButtonControls from '../cms/cms.controls';
import CustomCKEditor from '../ckeditor/editor.component';

/**
 * Edit a home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class EditHomeSubcategory extends Component {

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

        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit = (event) => {
        // Prevent default submit action
        event.preventDefault();
        const { name, shortname, editorText } = this.state;
        // category under which this subcategory should 
        // be uploaded to
        const { subcategory } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            let edited_sub_category;
            if (name || shortname|| editorText) {
                // get sub-category structure
                edited_sub_category = {
                    name: name,
                    shortName: shortname,
                    about: editorText
                }

                // then edit this sub category
                this.props.editCategory(subcategory._id, edited_sub_category, user.token, subcategory, this.props.capitalize(this.props.link));
                
            }

        }

    }

    /**
     * Delete category
     */
    archiveCategory = (event) => {
        event.preventDefault();
        // props holds state functions like defaultItem(), saveItem() etc 
        const { subcategory } = this.props;
        // if subcategory exists then delete
        if (subcategory !== null && subcategory._id !== undefined) {
            // then get authenticated user token
            const user = UserProfile.get();
            if (user !== null && user.token !== undefined) {
                this.props.archiveCategory(subcategory, user.token, this.props.capitalize(this.props.link));
            }
        }

    }

    setEditorText = (editor) => {
        this.setState({ editorText: editor.getData() });
    }

    render() {

        const { classes, handleClick, general, subcategory } = this.props;
        const { editorText } = this.state;

        if (subcategory && !editorText) {
            Object.assign(this.state, { editorText: subcategory.about })
        }
        // get authenticated user token
        const user = UserProfile.get();

        return (
            <Fragment>
                <ButtonControls 
                    keys={['default', 'create']}
                    user={ user }
                    handleClick={handleClick}
                />

                <div className={classes.margin} />
                <div className={classes.margin} />

                <Divider />

                <div className={classes.margin} />
                <div className={classes.margin} />

                <form onSubmit={(e) => this.handleSubmit(e)} 
                    autoComplete="off">
                    {
                        subcategory !== null && (
                            <div>
                                <div className="margin-fix form-row">
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={
                                                subcategory !== null 
                                                ? (this.state.name ? this.state.name : subcategory.name) : ''
                                            }
                                            name='name'
                                            label='Name'
                                            disabled={ true }
                                            type='text'
                                            // id={subcategory._id}
                                            placeholder='Edit sub-category name...'
                                            handleChange={this.handleChange}
                                        />
                                    </BootstrapGridColumn>
                                    <BootstrapGridColumn>
                                        <BootsrapTextField
                                            value={
                                                subcategory !== null 
                                                ? (this.state.shortname ? this.state.shortname : subcategory.shortName) : ''
                                            }
                                            name='shortname'
                                            label='Shortname'
                                            type='text'
                                            // id={subcategory._id}
                                            placeholder='Edit sub-category shortname...'
                                            handleChange={this.handleChange}
                                        />
                                    </BootstrapGridColumn>
                                </div>

                                <div className="form-group">
                                    <CustomCKEditor
                                        {...this.state}
                                        label="About"
                                        setEditorText={this.setEditorText}
                                    />
                                </div>
                            </div>
                        )
                    }

                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Button 
                        type="submit" 
                        disabled={false} 
                        intent="primary" 
                        text="Save" 
                    />

                    <Button 
                        className={classes.margin} 
                        disabled={
                            !profile.canDelete({ user })
                        } 
                        intent="danger" 
                        text="Delete" 
                        onClick={(e) => this.archiveCategory(e)} 
                    />

                    <Button 
                        className={classes.margin} 
                        name="default" 
                        intent="primary" 
                        text="Cancel" 
                        onClick={e => handleClick(e)} 
                    />
                </form>

                {
                    general && (general.isLoading && (<div 
                        style={{ marginTop: `40px` }} 
                        className="loader" 
                    />))
                }
            </Fragment>
        );
    }
}

EditHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(EditHomeSubcategory));