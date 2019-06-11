import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import { FormControl, Paper, withStyles } from '@material-ui/core';
import { SelectInputControl } from '../forms/form.selectinput.field';
import styles from '../contact/form.styles';
import { Divider, Intent, Button } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { FormTextInputField } from '../forms/form.textinput.field';
import { UserProfile, profile } from '../user/user.profile';

/**
 * Render gis component to: upload new coordinates, and other features
 * 
 * @author Isaac S. Mwakabira
 */
class GisFeatures extends Component {

    constructor() {
        super();
        this.state = {
            selectedValue: 'marep_center',
        };

        this.handleRadioBtnChange = this.handleRadioBtnChange.bind(this);

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRadioBtnChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    /**
     * Renders mapped object filter options (regions)
     * 
     * @param {Object} gis_filters
     * @returns {Option} fragment
     * 
     */
    renderRegions = ({ gis_filters }) => {

        return gis_filters.map(({ properties, _id }) => {

            return <option value={ properties.name } key={ _id }>{ properties.name }</option>

        });

    }

    /**
     * Filter and return chosen region with itsdistricts
     * else return nothing.
     * 
     * @param {Object} gis_filters
     * @returns {Object} region
     * 
     */
    filterDistrictsPerRegion = (gis_filters) => {

        return gis_filters.filter((region) => {

            if (region.properties.name === this.state.region_name) {

                return region;

            }

            return null;

        });

    }

    /**
     * Renders mapped object filter options (districts)
     * 
     * @param {Object} gis_filters
     * @returns {Option} fragment
     * 
     */
    renderDistricts = ({gis_filters}) => {
        // console.log(gis_filters)
        if (this.state.region_name !== undefined && this.state.region_name !== null) {

            return this.filterDistrictsPerRegion(gis_filters).map(({districts}) => {

                return districts.map(({ properties, _id }) => {

                    return <option value={ properties.name } key={ _id }>{ properties.name }</option>

                });
            });

        }

    }

    /**
     * Handle feature submit
     */
    handleSubmit = (values) => {

    }

    renderForms = ({ selected }) => {
        // props
        const { 
            handleSubmit, 
            classes, valid, pristine, submitting 
        } = this.props;
        /**
         * Check which feature is to be added
         * Then render the corresponding form fields
         */
        switch(selected) {
            case 'marep_center':
                return (
                    <form 
                        onSubmit={ handleSubmit(values => this.handleSubmit(values)) } 
                        autoComplete="off"
                    >
                        <FormTextInputField 
                            { ...this.props }
                            name="marep_center_latitude"
                            placeholder="Enter new marep center latitude coordinate..."
                            label="Center Latitude"
                            type="text"
                        />

                        <FormTextInputField 
                            { ...this.props }
                            name="marep_center_longitude"
                            placeholder="Enter new marep center longitude coordinate..."
                            label="Center Longitude"
                            type="text"
                        />

                        <Fragment>
                            <Button 
                                className={ classes.margin }
                                name="save"
                                type="submit" 
                                disabled={!valid  || pristine || submitting} 
                                intent="success" text="Save Marep Center" 
                            />
                        </Fragment>
                    </form>
                );
            case 'transformer':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="transformer_latitude"
                            placeholder="Enter new transformer latitude coordinate..."
                            label="Transformer Latitude"
                            type="text"
                        />

                        <FormTextInputField 
                            { ...this.props }
                            name="transformer_longitude"
                            placeholder="Enter new transformer longitude coordinate..."
                            label="Transformer Longitude"
                            type="text"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save Transformer" 
                        />
                    </form>
                );
            case 'power_plant':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="plant_latitude"
                            placeholder="Enter new plant latitude coordinate..."
                            label="Plant Latitude"
                            type="text"
                        />

                        <FormTextInputField 
                            { ...this.props }
                            name="plant_longitude"
                            placeholder="Enter new plant longitude coordinate..."
                            label="Plant Longitude"
                            type="text"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save Plant" 
                        />
                    </form>
                );
            case 'substation':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="substation_latitude"
                            placeholder="Enter new substation latitude coordinate..."
                            label="Substation Latitude"
                            type="text"
                        />

                        <FormTextInputField 
                            { ...this.props }
                            name="substation_longitude"
                            placeholder="Enter new substation longitude coordinate..."
                            label="Substation Longitude"
                            type="text"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save Substation"
                        />
                    </form>
                );
            case 'distribution_line':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="valide_distribution_line"
                            placeholder="Enter new valid distribution line..."
                            label="Distribution Line"
                            type="text"
                            multiline={ true }
                            rows="6"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save Distribution Line" 
                        />
                    </form>
                );
            default:
                return null;
        }
    }

    render() {

        const { classes, handleClick } = this.props;
        // get the logged in user
        const user = UserProfile.get();

        return (
            <Fragment>
                
                <ButtonControl 
                    intent={Intent.NONE} 
                    value="New Features"
                    name="create"
                    handleClick={e => handleClick(e) }
                    disabled={ !profile.canWrite({ user }) }
                />

                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>
                <div className={ classes.margin }/>

                <Divider />

                <div className="tab-pane active">

                    <Fragment>

                        { /** filter sections here */}
                        <FormControl className={classes.margin}>

                            <Paper elevation={0}>
                                
                                <SelectInputControl 
                                    name="region_name"
                                    label="Region(*)"
                                    { ...this.state }
                                    onChange={ e => this.handleChange(e) }
                                >
                                    <option value="">{ `Choose region` }</option>
                                    { this.renderRegions(this.props) }
                                </SelectInputControl>

                            </Paper>

                        </FormControl>

                        { /** filter sections here */}
                        <FormControl className={classes.margin}>

                            <Paper elevation={0}>
                                
                                <SelectInputControl 
                                    name="district_name"
                                    label="District(*)"
                                    { ...this.state }
                                    onChange={ e => this.handleChange(e) }
                                >
                                    <option value="">{ `Choose district` }</option>
                                    { this.renderDistricts(this.props) }
                                </SelectInputControl>

                            </Paper>

                        </FormControl>

                        <Divider />

                    </Fragment>
                </div>
            </Fragment>
        );

    }

}

const mapStateToProps = (state) => {

    return {
        region: state.region.region,
        general: state.general.general,
        gis_filters: state.gis_filters.gis_filters,
    };

}

GisFeatures.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'Features',
    Validate,
    AsyncValidate
})(connect(mapStateToProps, null)(withStyles(styles)(GisFeatures)));