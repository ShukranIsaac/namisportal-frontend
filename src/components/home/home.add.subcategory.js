import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import styles from '../contact/form.styles';
import UserProfile from '../user/user.profile';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';
import ButtonControls from '../cms/cms.controls';

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
        this.setState({ 
            [event.target.name]: event.target.value 
        });
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
        const { category } = this.props;
        // get authenticated user token
        const user = UserProfile.get();
        if (user !== null && user.token !== undefined) {

            const { name, shortname, about } = this.state;

            if (name && shortname && about) {
                // home category exists
                console.log(category)
                const category_object = {
                    level: 1,
                    name: name,
                    shortName: shortname,
                    about: about
                }
                // creating new category
                this.props.createCategory(null, category_object, user.token,
                    this.props.capitalize(this.props.link));
            }

        }

    }

    render() {

        const { classes, handleClick } = this.props;
        const { name, shortname, about } = this.state;
        // console.log(this.props.category)

        return (
            <Fragment>
                <ButtonControls 
                    keys={['default']}
                    user={ UserProfile.get() }
                    handleClick={handleClick}
                />
                
                <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
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