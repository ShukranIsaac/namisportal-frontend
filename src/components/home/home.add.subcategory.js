import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import { UserProfile } from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

/**
 * Add a new home subcategory
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class CreateHomeSubcategory extends Component {

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

    handleChangeMultiple = event => {

        const { options } = event.target;

        const value = [];

        for (let index = 0, optLength = options.length; index < optLength; index += 1) {

            if (options[index].selected) {

                value.push(options[index].value);

            }

        }

        this.setState({ [event.target.name]: value });

    };

    handleSubmit = (event) => {
        event.preventDefault();
        // category under which this subcategory should 
        // be uploaded to
        const { category, props } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            const { name, shortname, about } = this.state;

            let sub_category;
            if (name && shortname && about) {
                // define sub-category structure
                sub_category = {
                    name: name,
                    shortName: shortname,
                    about: about
                }

                // home category exists
                if (category && ( category.length !== 0 )) {
                    // proceeed to adding new subcategories under it
                    this.props.createCategory(category._id, sub_category, user.token,this.props.capitalize(this.props.link));
                } else {
                    // creating new category
                    this.props.createCategory(null, sub_category, user.token,this.props.capitalize(this.props.link));
                }
                // then change state to default
                // so that the page redirects and list all home items
                props.defaultItem();
            }

        }

    }

    render() {

        const { classes, handleClick, category } = this.props;
        const { name, shortname, about } = this.state;

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    {
                        category.length !== 0 && (
                            <ButtonControl
                                intent={Intent.NONE}
                                value="List SubCategories"
                                name="default"
                                handleClick={e => handleClick(e)}
                            />
                        )
                    }

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    <div className="margin-fix form-row">
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                value={this.state.name}
                                name='name'
                                label='Name*'
                                type='text'
                                placeholder='New sub-category name...'
                                handleChange={this.handleChange}
                            />
                        </BootstrapGridColumn>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                value={this.state.shortname}
                                name='shortname'
                                label='Shortname*'
                                type='text'
                                placeholder='New sub-category shortname...'
                                handleChange={this.handleChange}
                            />
                        </BootstrapGridColumn>
                    </div>

                    <div className="form-group">
                        <BootsrapTextareaField
                            name="about"
                            value={this.state.about}
                            placeholder="New sub-category summary..."
                            label="Summary*"
                            type="text"
                            rows={10}
                            handleChange={this.handleChange}
                        />
                    </div>

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Button 
                        type="submit" 
                        disabled={!(name && shortname && about)} 
                        intent="success" text="Save" 
                    />

                    <Button 
                        className={classes.margin} 
                        name="default" intent="primary" 
                        text="Cancel" onClick={e => handleClick(e)} 
                    />

                </form>

            </Fragment>
        );

    }

}

CreateHomeSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(CreateHomeSubcategory));