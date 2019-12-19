import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Divider } from '@material-ui/core';
import styles from '../contact/form.styles';
import UserProfile from '../user/user.profile';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

/**
 * Create new licensing step
 * 
 * @author Isaac S. Mwakabira
 */
class CreateLicensingStep extends Component {

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
        // prevent default behaviour
        event.preventDefault();
        // get category
        const { maincategory } = this.props;
        const { name, shortname, summary } = this.state;
        // authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            if (name && shortname && summary) {
                // define sub-category structure
                const sub_category = {
                    name: name,
                    shortName: shortname,
                    about: summary
                }

                if (maincategory !== null && maincategory !== undefined) {
                    this.props.createCategory(
                        maincategory._id, 
                        sub_category, 
                        user.token, 
                        this.props.capitalize(this.props.link)
                    );
                    // then change state to default
                    // so that the page redirects and list all licensing items
                    this.props.defaultItem();
                }
            }

        }

    }

    render() {

        // props
        const { classes, handleClick } = this.props;
        const { name, shortname, summary } = this.state;

        return (
            <Fragment>
                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Steps"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <div className='margin-fix form-row'>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                value={this.state.name}
                                name="name"
                                label="Name*"
                                type="text"
                                placeholder="Enter license process step..."
                                handleChange={this.handleChange}
                            />
                        </BootstrapGridColumn>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                name="shortname"
                                type="text"
                                placeholder="Enter license process step shortname..."
                                label="Shortname*"
                                value={this.state.shortname}
                                handleChange={this.handleChange}
                            />
                        </BootstrapGridColumn>
                    </div>

                    <div className="form-group">
                        <BootsrapTextareaField
                            name="summary"
                            value={this.state.summary}
                            placeholder="Enter license process summary..."
                            label="Summary Text*"
                            type="text"
                            rows={10}
                            handleChange={this.handleChange}
                        />
                    </div>

                    <div className={classes.margin} />

                    <Button
                        type="submit"
                        disabled={!(name && shortname && summary)}
                        intent="success"
                        text="Save"
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

CreateLicensingStep.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(CreateLicensingStep));