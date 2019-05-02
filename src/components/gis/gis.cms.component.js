import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

import * as GisAction from '../../actions/index';
import CMSMapPreview from './cms.map.preview';
import { FormControl, Paper, withStyles } from '@material-ui/core';
import { SelectInputControl } from '../forms/form.selectinput.field';
import styles from '../contact/form.styles';
import RadioButtons from '../forms/form.radiobtn.field';
import { Divider, Button } from '@blueprintjs/core';
import { FormTextInputField } from '../forms/form.textinput.field';

/**
 * Render gis component to: upload new coordinates, and other features
 * 
 * @author Isaac S. Mwakabira
 */
class GISComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 7,
            newCenter: {
                lat: -13.2512, lng: 34.30154
            },
            show: false,
            h: `750px`,
            selectedValue: 'marep_center',
            previewMap: true,
        };

        this.handleRadioBtnChange = this.handleRadioBtnChange.bind(this);

    }


    componentDidMount() {

        // fetch initial filters
        this.props.fetchFilters();
    
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

    addFeature = ({ name }) => {
        // props
        const { classes, valid, pristine, submitting } = this.props;

        /**
         * Check which feature is to be added
         * between region and district.
         */
        switch(name) {
            case 'region':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="region_name"
                            placeholder="Create new region name..."
                            label="Region Name"
                            type="text"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save" 
                        />
                    </form>
                );
            case 'district':
                return (
                    <form autoComplete="off">
                        <FormTextInputField 
                            { ...this.props }
                            name="district_name"
                            placeholder="Create new district name..."
                            label="District Name"
                            type="text"
                        />

                        <Button 
                            className={ classes.margin }
                            type="submit" disabled={!valid  || pristine || submitting} 
                            intent="success" text="Save" 
                        />
                    </form>
                );
            default:
                return null;
        }
    }

    /**
     * Handle feature submit
     */
    handleSubmit = (values) => {

        const { previewMap } = this.state;
        // preview feature first before submitting
        if (previewMap) {
            this.setState({ previewMap: false, point: values });
        } else {
            // set state
            this.setState({ previewMap: true });
        }

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

                        {
                            !this.state.previewMap ? (
                                <Fragment>
                                    <Button 
                                        className={ classes.margin }
                                        name="save"
                                        type="submit" 
                                        disabled={!valid  || pristine || submitting} 
                                        intent="success" text="Save Marep Center" 
                                    />
                                </Fragment>
                            ) : (
                                <Button 
                                    className={ classes.margin }
                                    name="Preview"
                                    type="submit"
                                    intent="success" 
                                    text="Preview" 
                                />
                            )
                        }
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

        // loading status, gis_filters from props
        const { classes } = this.props;
        // console.log(general);
        // console.log(this.state);

        return (
            <Fragment>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#gis">
                            Features
                        </a>
                    </li>
                    {
                        this.state.feature === 'other' && (
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#preview">
                                    Preview
                                </a>
                            </li>
                        )
                    }
                </ul>

                <div className="tab-content">
                    <div id="gis" className="tab-pane active"><br />
                        <div className="row">
                            { /** filter sections here */}
                            <FormControl className={classes.margin}>

                                <Paper elevation={0}>
                                    
                                    <SelectInputControl 
                                        name="feature"
                                        label="Feature(*)"
                                        { ...this.state }
                                        // value={ this.state.section }
                                        onChange={ e => this.handleChange(e) }
                                    >
                                        <option value="">{ `Add feature` }</option>
                                        <option value="region">{ `Region` }</option>
                                        <option value="district">{ `District` }</option>
                                        <option value="other">{ `Other` }</option>
                                    </SelectInputControl>

                                </Paper>

                            </FormControl>
                        </div>

                        {
                            this.state.feature === 'other' ? (
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
                                    
                                    <RadioButtons 
                                        { ...this.state } 
                                        handleRadioBtnChange={ this.handleRadioBtnChange } 
                                    />

                                    <Divider />

                                    <div className="row">
                                        {
                                            this.renderForms({ selected: this.state.selectedValue })
                                        }
                                    </div>

                                </Fragment>
                            ) : (
                                <Fragment className={classes.margin}>

                                    <Divider />

                                    <div className="row">
                                        {
                                            this.addFeature({ name: this.state.feature })
                                        }
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                    <div id="preview" className="tab-pane fade"><br />
                        <CMSMapPreview { ...this.state } />
                    </div>
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

const mapDispatchToProps = (dispatch) => {

    return {
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
    };

}

GISComponent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'gisAddFeatures',
    Validate,
    AsyncValidate
})(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GISComponent)));