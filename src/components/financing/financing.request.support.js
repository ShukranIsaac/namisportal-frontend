import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import UserProfile from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

/**
 * A multi-step form component for the user to fill when applying or 
 * placing a request for financing support.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class FinancingRequestSupport extends Component {

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
        // category under which this subcategory should 
        // be uploaded to
        const { maincategory } = this.props;
        const { subcategory, shortname, summary } = this.state;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            let sub_category;
            if (subcategory && shortname && summary) {
                // define sub-category structure
                sub_category = {
                    name: subcategory,
                    shortName: shortname,
                    about: summary
                }

                this.props.createCategory(
                    maincategory._id, 
                    sub_category, 
                    user.token,
                    this.props.capitalize(this.props.link)
                );
            }

        }

    }

    render() {

        const { classes, handleClick } = this.props;
        
        const { subcategory, shortname, summary } = this.state;

        return (
            <Fragment>

                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

                    <ButtonControl
                        intent={Intent.NONE}
                        value="List Category"
                        name="default"
                        handleClick={e => handleClick(e)}
                    />

                    <div className={classes.margin} />
                    <div className={classes.margin} />
                    <div className={classes.margin} />

                    <Divider />

                    <div className='margin-fix form-row'>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                value={this.state.subcategory}
                                name="subcategory"
                                label="Name"
                                placeholder="New sub-category name..."
                                type="text"
                                handleChange={this.handleChange}
                            />
                        </BootstrapGridColumn>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                name="shortname"
                                type="text"
                                placeholder="New sub-category shortname..."
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
                            placeholder="New sub-category about..."
                            label="Summary Text*"
                            type="text"
                            rows={10}
                            handleChange={this.handleChange}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        disabled={!(subcategory && shortname && summary)} 
                        intent="success" 
                        text="Save" 
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

FinancingRequestSupport.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(FinancingRequestSupport));