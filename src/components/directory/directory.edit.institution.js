import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RenderBootstrapField from '../forms/form.bootstrap.field';
import { Divider } from '@material-ui/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import styles from '../contact/form.styles';

/**
 * @author Isaac S. Mwakabira
 * 
 */
class EditDirectoryInstitution extends Component {

    constructor() {
        super();
        this.state = {
            institution: {},
        }

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
        
        this.setState({[event.target.name]: event.target.value});
  
    }

    handleSubmit = (event) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		event.preventDefault();
        
    }

    render() {

        const { classes, directory, handleClick  } = this.props;
        
        /**
         * If the institution is not defined and has no data
         * just return.
         */
        if( directory[0] === null && directory[0] === undefined ) return <Fragment/>;
        
        return (
            <Fragment>

                <form onSubmit = { this.handleSubmit }>

                    <ButtonControl 
                        intent={Intent.NONE} 
                        value="New Institution"
                        name="create"
                        handleClick={e => handleClick(e) }
                    />

                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>
                    <div className={ classes.margin }/>

                    <Divider />

                    <RenderBootstrapField
                        classes={ classes }
                        label='Institution Name'
                        defaultValue="Edit Institution Name..."
                        value={ directory[0].name }
                        name="name"
                        type="text"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        label='Mission Statement'
                        defaultValue="Edit mission statement..."
                        value={ directory[0].details.mission }
                        name="mission"
                        type="text"
                        multiline={true}
                        rows="1000"
                        onChange={ this.handleChange }
                    />

                    <RenderBootstrapField
                        classes={ classes }
                        label={ directory[0].name }
                        defaultValue="Edit institution summary..."
                        value={ directory[0].details.mission }
                        name="summary"
                        type="text"
                        multiline={true}
                        rows="1000"
                        onChange={ this.handleChange }
                    />

                    <div className={ classes.margin } />
                    <div className={ classes.margin } />
                    <div className={ classes.margin } />

                    <ButtonControl 
                        intent={Intent.PRIMARY} 
                        value="Save"
                        name="save"
                        handleClick={e => this.handleSubmit(e) }
                    />

                    <ButtonControl 
                        intent={Intent.SUCCESS} 
                        value="Publish" 
                        name="publish"
                        handleClick={e => handleClick(e) } 
                    />

                    <ButtonControl 
                        intent={Intent.WARNING} 
                        value="Unpublish" 
                        name="unpublish"
                        handleClick={e => handleClick(e) } 
                    />

                    <ButtonControl 
                        intent={Intent.DANGER} 
                        value="Archive"
                        name="archive"
                        handleClick={e => handleClick(e) } 
                    />
                
                </form>

            </Fragment>
        );

    }

}

EditDirectoryInstitution.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditDirectoryInstitution);