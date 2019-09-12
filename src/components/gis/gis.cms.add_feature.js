import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { reduxForm } from 'redux-form';
import AsyncValidate from '../contact/form.async-validate';
import Validate from '../contact/email.validate';

// import * as GisAction from '../../actions/index';
import CMSMapPreview from './cms.map.preview';
import { FormControl, Paper, withStyles } from '@material-ui/core';
import { SelectInputControl } from '../forms/form.selectinput.field';
import styles from '../contact/form.styles';
import RadioButtons from '../forms/form.radiobtn.field';
import { Divider, Intent, Button } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { FormTextInputField } from '../forms/form.textinput.field';
import { UserProfile } from '../user/user.profile';
import { FormCheckboxControl } from '../forms/form.checkbox.field';
import BootstrapGridColumn from '../forms/form.grid.column';
import { BootsrapTextField } from '../forms/form.bootstrap.field';
import { BootsrapTextareaField } from '../forms/form.textarea.field';

// const arrayContainsAnother = (first, second) => {
//     for (let index = 0; index < first.length; index++) {
//         if(second.indexOf(first[index]) == -1) {
//             return false;
//         }
//     }
//     return true;
// }

// const arrayContainsAnother = (first = [], second = []) => first.every(el => second.includes(el));

/**
 * Render gis component to: upload new coordinates, and other features
 * 
 * @author Isaac S. Mwakabira
 */
class AddFeature extends Component {

    constructor() {
        super();
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

    handleTextChange = event => this.setState({ [event.target.name]: event.target.value });

    handleChange = (e) => {
        // if feature equals natinal
        // set state to power-plant
        if (e.target.value === 'national') {
            this.setState({ selectedValue: 'power_plant' });
        } else {
            this.setState({ selectedValue: 'marep_center' });
        }

        // console.log(e.currentTarget)
        this.setState({ [e.target.name]: e.target.value }, () => {
            // state
            const state = this.state;
            if (state.marep_center_latitude !== undefined && state.marep_center_latitude !== null &&
                state.marep_center_ta !== undefined && state.marep_center_ta !== null &&
                state.marep_center_longitude !== undefined && state.marep_center_longitude !== null) {
                // define question structure
                const center = {
                    region: this.state.region_name,
                    district: this.state.district_name,
                    marep_center_ta: state.marep_center_ta,
                    marep_center_latitude: state.marep_center_latitude,
                    marep_center_longitude: state.marep_center_longitude
                }

                console.log(center)
                // set feature state for preview on map
                this.setState({ feature: center });
            }
        });
    }

    handleRadioBtnChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    handleChecked = (event) => {

        this.setState({ [event.target.name]: event.target.checked }, () => {
            if (this.state.preview_feature !== undefined && this.state.preview_feature === true) {
                this.setState({ point: this.state.feature });
            }
        });

    }

    /**
     * Renders mapped object filter options (regions)
     * 
     * @param {Object} gis_filters
     * @returns {Option} fragment
     * 
     */
    renderRegions = ({ gis_filters }) => {

        return gis_filters.map(({ properties, _id }) => {

            return <option value={properties.name} key={_id}>{properties.name}</option>

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
    renderDistricts = ({ gis_filters }) => {
        // console.log(gis_filters)
        if (this.state.region_name !== undefined && this.state.region_name !== null) {

            return this.filterDistrictsPerRegion(gis_filters).map(({ districts }) => {

                return districts.map(({ properties, _id }) => {

                    return <option value={properties.name} key={_id}>{properties.name}</option>

                });
            });

        }

    }

    addFeature = ({ name }) => {
        // props
        const { classes } = this.props;

        /**
         * Check which feature is to be added
         * between region and district.
         */
        switch (name) {
            case 'region':
                return (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <BootstrapGridColumn>
                            <BootsrapTextField
                                value={this.state.region_name}
                                name="region_name"
                                placeholder="Create new region name..."
                                label="Region Name"
                                type="text"
                                handleChange={this.handleTextChange}
                            />
                        </BootstrapGridColumn>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={!(this.state.region_name)}
                            intent="success"
                            text="Save"
                        />
                    </form>
                );
            case 'district':
                return (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="district_name"
                                    value={this.state.district_name}
                                    placeholder="Create new district name..."
                                    label="District Name*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={!(this.state.district_name)}
                            intent="success"
                            text="Save"
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
    handleSubmit = (event) => {
        event.preventDefault();

        const {
            selectedValue, region_name, district_name,
            marep_center_ta, marep_center_latitude, marep_center_longitude,
            transformer_latitude, transformer_location, transformer_longitude, transformer_position,
            transformer_primary, transformer_station, transformer_voltage,transformer_ta,
            plant_latitude, plant_longitude, plant_status, plant_name, plant_type, plant_ta,
            substation_latitude, substation_location, substation_name, substation_secondary, substation_ta,
            substation_transmission, substation_longitude, _distribution_line
        } = this.state;
        // const { props: { addFeature }, gis_filters } = this.props;
        // preview feature first before submitting
        if (selectedValue) {
            // get authenticated user token
            const user = UserProfile.get();
            // feature type
            switch (selectedValue) {
                case 'marep_center':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (marep_center_latitude  && marep_center_ta && marep_center_longitude) {
                            // define question structure
                            const center = {
                                region: region_name,
                                district: district_name,
                                ta: marep_center_ta,
                                lat: marep_center_latitude,
                                lng: marep_center_longitude
                            }
                            // create new center
                            this.props.addFeature(center, "marep-centers", user.token);
                            // // then change state to default
                            // // so that the page redirects and list all frequently asked questions
                            this.props.defaultItem();
                        }

                    }
                    break;

                case 'transformer':
                    if (user !== null && user.token !== undefined) {

                        // check if resource
                        if (transformer_latitude && transformer_ta && transformer_longitude ) {
                            // define transformer structure
                            const transformer = {
                                region: region_name,
                                district: district_name,
                                ta: transformer_ta,
                                lat: transformer_latitude,
                                lng: transformer_longitude
                            }
                            // create new transfomer
                            this.props.addFeature(transformer, "transformers", user.token);
                            // // then change state to default
                            // // so that the page redirects
                            this.props.defaultItem();
                        }

                    }
                    break;

                case 'power_plant':
                    if (user !== null && user.token !== undefined) {

                        // check if resource
                        if (plant_latitude &&plant_ta&& plant_longitude ) {
                            // define power plant structure
                            const power_plant = {
                                region: region_name,
                                district: district_name,
                                ta: plant_ta,
                                lat: plant_latitude,
                                lng: plant_longitude
                            }
                            // create new power_plant
                            this.props.addFeature(power_plant, "power-plants", user.token);
                            // // then change state to default
                            // // so that the page redirects and list all frequently asked questions
                            this.props.defaultItem();
                        }

                    }
                    break;

                case 'distribution_line':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (_distribution_line) {
                            // define question structure
                            const _line = {
                                region: region_name,
                                district: district_name,
                                line: _distribution_line
                            }
                            // create new distribution_line
                            this.props.addFeature(_line, "distribution-lines", user.token);
                            // // then change state to default
                            // // so that the page redirects and list all frequently asked questions
                            this.props.defaultItem();
                        }

                    }
                    break;

                case 'substation':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (substation_latitude&&substation_ta&&substation_longitude) {
                            // define question structure
                            const substation = {
                                region: region_name,
                                district: district_name,
                                ta: substation_ta,
                                lat: substation_latitude,
                                lng: substation_longitude
                            }
                            // create new substation
                            this.props.addFeature(substation, "sub-stations", user.token);
                            // // then change state to default
                            // // so that the page redirects and list all frequently asked questions
                            this.props.defaultItem();
                        }

                    }
                    break;

                default:
                    break;
            }
        }

    }

    renderForms = ({ selected }) => {
        // props
        const { classes } = this.props;
        const {
            marep_center_ta, marep_center_latitude, marep_center_longitude,
            transformer_latitude, transformer_location, transformer_longitude, transformer_position,
            transformer_primary, transformer_station, transformer_voltage,
            plant_latitude, plant_longitude, plant_status, plant_name, plant_type, plant_ta,
            substation_latitude, substation_location, substation_name, substation_secondary, substation_ta,
            substation_transmission, substation_longitude, distribution_line
        } = this.state;
        /**
         * Check which feature is to be added
         * Then render the corresponding form fields
         */
        switch (selected) {
            case 'marep_center':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.marep_center_ta}
                                    name="marep_center_ta"
                                    placeholder="Enter traditional authority..."
                                    label="Traditional Authority*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.marep_center_latitude}
                                    name="marep_center_latitude"
                                    placeholder="Enter new marep center latitude coordinate..."
                                    label="Center Latitude*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="marep_center_longitude"
                                    placeholder="Enter new marep center longitude coordinate..."
                                    label="Center Longitude*"
                                    type="text"
                                    value={this.state.marep_center_longitude}
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <Fragment>
                            <Button
                                className={classes.margin}
                                name="save"
                                type="submit"
                                disabled={!(marep_center_latitude && marep_center_longitude && marep_center_ta)}
                                intent="success" text="Save Marep Center"
                            />
                        </Fragment>
                    </form>
                );
            case 'transformer':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.transformer_station}
                                    name="transformer_station"
                                    placeholder="Enter new transformer station..."
                                    label="Station*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="transformer_location"
                                    placeholder="Enter new transformer location..."
                                    label="Location*"
                                    type="text"
                                    value={this.state.transformer_location}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.transformer_position}
                                    name="transformer_position"
                                    placeholder="Enter new transformer position..."
                                    label="Position*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="transformer_primary"
                                    placeholder="Enter new transformer primary..."
                                    label="Primary*"
                                    type="text"
                                    value={this.state.transformer_primary}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.transformer_voltage}
                                    name="transformer_voltage"
                                    placeholder="Enter new transformer voltage..."
                                    label="Voltage*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.transformer_latitude}
                                    name="transformer_latitude"
                                    placeholder="Enter new transformer latitude coordinate..."
                                    label="Transformer Latitude*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="transformer_longitude"
                                    placeholder="Enter new transformer longitude coordinate..."
                                    label="Transformer Longitude*"
                                    type="text"
                                    value={this.state.transformer_longitude}
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={
                                !(transformer_longitude && transformer_latitude && transformer_voltage &&
                                    transformer_primary && transformer_position && transformer_location && transformer_station)}
                            intent="success"
                            text="Save Transformer"
                        />
                    </form>
                );
            case 'power_plant':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)}>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.plant_name}
                                    name="plant_name"
                                    placeholder="Enter new power plant name..."
                                    label="Plant Name*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="plant_ta"
                                    placeholder="Enter traditional authority..."
                                    label="Traditioanal Authority*"
                                    type="text"
                                    value={this.state.plant_ta}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.plant_status}
                                    name="plant_status"
                                    placeholder="Enter new power plant status..."
                                    label="Plant Status*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="plant_type"
                                    placeholder="Enter new plant type..."
                                    label="Plant Type*"
                                    type="text"
                                    value={this.state.plant_type}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.plant_latitude}
                                    name="plant_latitude"
                                    placeholder="Enter new plant latitude coordinate..."
                                    label="Plant Latitude*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="plant_longitude"
                                    placeholder="Enter new plant longitude coordinate..."
                                    label="Plant Longitude*"
                                    type="text"
                                    value={this.state.plant_longitude}
                                    handleChange={this.handleChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={!(plant_latitude && plant_longitude && plant_name && plant_status &&
                                plant_ta && plant_type)}
                            intent="success"
                            text="Save Plant"
                        />
                    </form>
                );
            case 'substation':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.substation_name}
                                    name="substation_name"
                                    placeholder="Enter new sub station name..."
                                    label="Substation Name*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="substation_ta"
                                    placeholder="Enter traditional authority..."
                                    label="Traditioanal Authority*"
                                    type="text"
                                    value={this.state.substation_ta}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="substation_location"
                                    placeholder="Enter new sub station location..."
                                    label="Location*"
                                    type="text"
                                    value={this.state.substation_location}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="substation_secondary"
                                    placeholder="Enter secondary..."
                                    label="Secondary*"
                                    type="text"
                                    value={this.state.substation_secondary}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="substation_transmission"
                                    placeholder="Enter new transmission..."
                                    label="Transmission*"
                                    type="text"
                                    value={this.state.substation_transmission}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <div className='margin-fix form-row'>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    value={this.state.substation_latitude}
                                    name="substation_latitude"
                                    placeholder="Enter new substation latitude coordinate..."
                                    label="Substation Latitude*"
                                    type="text"
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                            <BootstrapGridColumn>
                                <BootsrapTextField
                                    name="substation_longitude"
                                    placeholder="Enter new substation longitude coordinate..."
                                    label="Substation Longitude*"
                                    type="text"
                                    value={this.state.substation_longitude}
                                    handleChange={this.handleTextChange}
                                />
                            </BootstrapGridColumn>
                        </div>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={!(substation_latitude&&substation_secondary&&substation_location&&
                                substation_longitude&&substation_name&&substation_ta&&substation_transmission)}
                            intent="success"
                            text="Save Substation"
                        />
                    </form>
                );
            case 'distribution_line':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <BootsrapTextareaField
                                name="_distribution_line"
                                value={this.state._distribution_line}
                                placeholder="Enter new valid distribution line, i.e [[34.234568, -0.243536],...]"
                                label="Distribution Line*"
                                type="text"
                                rows={4}
                                handleChange={this.handleTextChange}
                            />
                        </div>

                        <Button
                            className={classes.margin}
                            type="submit"
                            disabled={!(distribution_line)}
                            intent="success"
                            text="Save Distribution Line"
                        />
                    </form>
                );
            default:
                return null;
        }
    }

    render() {

        // loading status, gis_filters from props
        const { classes, handleClick } = this.props;

        return (
            <Fragment>

                <ButtonControl
                    intent={Intent.NONE}
                    value="List Features"
                    name="default"
                    handleClick={e => handleClick(e)}
                />

                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />
                <div className={classes.margin} />

                <Divider />

                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#gis">
                            Features
                        </a>
                    </li>
                    {
                        (this.state.feature === 'other' && this.state.preview_feature) && (
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#preview">
                                    Preview
                                </a>
                            </li>
                        )
                    }
                </ul>

                <div className="tab-content">
                    <div id="gis" className={classNames(classes.marginTop, "tab-pane active")}>
                        { /** filter sections here */}
                        <FormControl className={classes.margin}>

                            <Paper elevation={0}>

                                <SelectInputControl
                                    name="feature"
                                    label="Feature(*)"
                                    {...this.state}
                                    // value={ this.state.section }
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="">{`Add feature`}</option>
                                    <option value="national">{`National`}</option>
                                    <option value="region">{`Region`}</option>
                                    <option value="district">{`District`}</option>
                                    <option value="other">{`Other`}</option>
                                </SelectInputControl>

                            </Paper>

                        </FormControl>

                        {
                            this.state.feature === 'other' || this.state.feature === 'national' ? (
                                <Fragment>

                                    {
                                        this.state.feature !== 'national' && (
                                            <>
                                                { /** filter sections here */}
                                                <FormControl className={classes.margin}>

                                                    <Paper elevation={0}>

                                                        <SelectInputControl
                                                            name="region_name"
                                                            label="Region(*)"
                                                            {...this.state}
                                                            onChange={e => this.handleChange(e)}
                                                        >
                                                            <option value="">{`Choose region`}</option>
                                                            {this.renderRegions(this.props)}
                                                        </SelectInputControl>

                                                    </Paper>

                                                </FormControl>

                                                { /** filter sections here */}
                                                <FormControl className={classes.margin}>

                                                    <Paper elevation={0}>

                                                        <SelectInputControl
                                                            name="district_name"
                                                            label="District(*)"
                                                            {...this.state}
                                                            onChange={e => this.handleChange(e)}
                                                        >
                                                            <option value="">{`Choose district`}</option>
                                                            {this.renderDistricts(this.props)}
                                                        </SelectInputControl>

                                                    </Paper>

                                                </FormControl>
                                            </>
                                        )
                                    }

                                    <RadioButtons
                                        {...this.state}
                                        handleRadioBtnChange={this.handleRadioBtnChange}
                                    />

                                    <Divider />

                                    {
                                        this.renderForms({ selected: this.state.selectedValue })
                                    }

                                    <div className={classes.margin}>
                                        <FormCheckboxControl
                                            name='preview_feature'
                                            value='Preview on Map'
                                            isChecked={this.state.preview_feature}
                                            classes={classes}
                                            handleChange={(e) => { this.handleChecked(e) }}
                                        />
                                    </div>

                                </Fragment>
                            ) : (
                                    <Fragment className={classes.margin}>

                                        <Divider />

                                        {
                                            this.addFeature({ name: this.state.feature })
                                        }
                                    </Fragment>
                                )
                        }
                    </div>
                    <div id="preview" className="tab-pane fade">
                        <CMSMapPreview {...this.state} />
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

AddFeature.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'gisAddFeatures',
    Validate,
    AsyncValidate
})(connect(mapStateToProps, null)(withStyles(styles)(AddFeature)));