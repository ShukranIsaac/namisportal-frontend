import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as GisAction from '../../actions/index';
import CMSMapPreview from './cms.map.preview';
import { FormControl, Paper, withStyles } from '@material-ui/core';
import { SelectInputControl } from '../forms/form.selectinput.field';
import styles from '../contact/form.styles';
import { Divider, Intent, Button } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';
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
            newcenter: {
                lat: -13.2512, lng: 34.30154
            },
            show: false,
            h: `750px`,
            previewmap: true,
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    handleTextChange = event => this.setState({ [event.target.name]: event.target.value });

    constructGeometry = ({ selectedvalue }) => {

        // set zoom level depending which is being constructed
        if (selectedvalue === "distribution_line") {
            this.setState({ zoom: 12 })
        } else {
            this.setState({ zoom: 7 })
        }
        
        // state
        const {
            district_name, country_name,
            marep_center_latitude, marep_center_longitude, marep_center_ta, _distribution_line, voltage, 
            plant_capacity, plant_latitude, plant_longitude, plant_status, plant_name, plant_type, plant_ta,
            transformer_latitude, transformer_location, transformer_longitude, transformer_position,
            transformer_primary, transformer_station, transformer_voltage, transformer_ta,
            substation_latitude, substation_location, substation_name, substation_secondary, substation_ta,
            substation_transmission, substation_longitude,
        } = this.state;

        // construct different geometries depending on which form has been filled
        switch (selectedvalue) {
            case 'marep_center':
            case 'transformer':
            case 'substation':
            case 'power_plant':
                if (marep_center_latitude && marep_center_ta && marep_center_longitude) {
                    // define object structure
                    const center = {
                        district: district_name,
                        type: selectedvalue,
                        ta: marep_center_ta,
                        latitude: marep_center_latitude,
                        longitude: marep_center_longitude
                    }

                    // set feature state for preview on map
                    this.setState({ geometry_feature: center });
                } else if (plant_latitude && plant_longitude && plant_name && plant_status && plant_ta
                    && plant_type && country_name) {
                    // define object structure
                    const plant = {
                        country_name: country_name,
                        type: selectedvalue,
                        ta: plant_ta,
                        latitude: plant_latitude,
                        longitude: plant_longitude,
                        plant_status: plant_status,
                        plant_type: plant_type,
                        plant_capacity: plant_capacity,
                        name: plant_name
                    }

                    // set feature state for preview on map
                    this.setState({ geometry_feature: plant });
                } else if (substation_name && substation_latitude && substation_longitude && substation_ta
                    && substation_location && country_name && substation_transmission) {
                    // define object structure
                    const station = {
                        name: substation_name,
                        country_name: country_name,
                        type: selectedvalue,
                        ta: substation_ta,
                        latitude: substation_latitude,
                        longitude: substation_longitude,
                        location: substation_location,
                        substation_transmission: substation_transmission,
                        substation_secondary: substation_secondary
                    }

                    // set feature state for preview on map
                    this.setState({ geometry_feature: station });
                } else if (transformer_latitude && transformer_longitude && transformer_primary
                    && transformer_position && transformer_station && transformer_ta
                    && transformer_voltage && district_name && transformer_location) {
                    // define object structure
                    const transfomer = {
                        district: district_name,
                        type: selectedvalue,
                        ta: transformer_ta,
                        transformer_primary: transformer_primary,
                        transformer_position: transformer_position,
                        transformer_station: transformer_station,
                        transformer_voltage: transformer_voltage,
                        location: transformer_location
                    }

                    // set feature state for preview on map
                    this.setState({ geometry_feature: transfomer });
                } else {

                }

                break;
            case 'distribution_line':
                if (_distribution_line) {
                    // define object structure
                    const lines = {
                        district: district_name,
                        type: selectedvalue,
                        line: _distribution_line,
                        voltage: voltage
                    }

                    // set feature state for preview on map
                    this.setState({ geometry_feature: lines });
                }
                break;
            default:
                break;
        }
    }

    handleChange = (e) => {
        const { selectedvalue } = this.state;

        this.setState({ [e.target.name]: e.target.value }, () => this.constructGeometry({ selectedvalue }));
    }

    handleSelectChange = event => {
        this.setState({ selectedvalue: event.target.value });
    };

    handleChecked = (event) => {

        this.setState({ [event.target.name]: event.target.checked }, () => {
            if (this.state.preview_feature) {
                this.setState({ geometry: this.state.geometry_feature });
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

        return gis_filters.map((region) => {

            return region;

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

        return gis_filters.map(({ districts }) => {

            return districts.map(({ properties, _id }) => {

                return <option value={properties.name} key={_id}>{properties.name}</option>

            });

        });

    }

    /**
     * Handle feature submit
     */
    handleSubmit = (event) => {
        event.preventDefault();

        const {
            selectedvalue, district_name,
            marep_center_ta, marep_center_latitude, marep_center_longitude,
            transformer_latitude, transformer_location, transformer_longitude, transformer_position,
            transformer_primary, transformer_station, transformer_voltage, transformer_ta, plant_capacity,
            plant_latitude, plant_longitude, plant_status, plant_name, plant_type, plant_ta, country_name,
            substation_latitude, substation_location, substation_name, substation_secondary, substation_ta,
            substation_transmission, substation_longitude, _distribution_line, voltage
        } = this.state;
        // const { props: { addFeature }, gis_filters } = this.props;
        // preview feature first before submitting
        if (selectedvalue) {
            // get authenticated user token
            const user = UserProfile.get();
            // feature type
            switch (selectedvalue) {
                case 'marep_center':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (marep_center_latitude && marep_center_ta && marep_center_longitude) {
                            // define question structure
                            const center = {
                                district: district_name,
                                ta: marep_center_ta,
                                lat: Number(marep_center_latitude),
                                lng: Number(marep_center_longitude)
                            }

                            // create new center
                            this.props.addFeature(center, "marep-centers", user.token);
                            // // then change state to default
                            this.props.createItem();
                        }

                    }
                    break;

                case 'transformer':
                    if (user !== null && user.token !== undefined) {

                        // check if resource
                        if (transformer_latitude && transformer_ta && transformer_longitude) {
                            // define transformer structure
                            const transformer = {
                                district: district_name,
                                ta: transformer_ta,
                                lat: Number(transformer_latitude),
                                lng: Number(transformer_longitude),
                                primary: transformer_primary,
                                position: transformer_position,
                                station: transformer_station,
                                voltage: transformer_voltage,
                                location: transformer_location
                            }
                            // create new transfomer
                            this.props.addFeature(transformer, "transformers", user.token);
                            // // then change state to default
                            // // so that the page redirects
                            this.props.createItem();
                        }

                    }
                    break;

                case 'power_plant':
                    if (user !== null && user.token !== undefined) {

                        // check if resource
                        if (plant_latitude && plant_ta && plant_longitude) {
                            // define power plant structure
                            const power_plant = {
                                country: country_name,
                                name: plant_name,
                                type: plant_type,
                                status: plant_status,
                                capacity: plant_capacity,
                                ta: plant_ta,
                                lat: Number(plant_latitude),
                                lng: Number(plant_longitude)
                            }
                            // create new power_plant
                            this.props.addFeature(power_plant, "power-plants", user.token);
                            // // then change state to default
                            this.props.createItem();
                        }

                    }
                    break;

                case 'distribution_line':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (_distribution_line) {
                            // define question structure
                            const _line = {
                                district: district_name,
                                line: JSON.parse(_distribution_line),
                                voltage: Number(voltage)
                            }
                            // create new distribution_line
                            this.props.addFeature(_line, "distribution-lines", user.token);
                            // // then change state to default
                            this.props.createItem();
                        }

                    }
                    break;

                case 'substation':
                    if (user !== null && user.token !== undefined) {

                        // check if resource or file if being added
                        if (substation_latitude && substation_ta && substation_longitude && substation_name) {
                            // define question structure
                            const substation = {
                                name: substation_name,
                                secondary: substation_secondary,
                                transmission: substation_transmission,
                                location: substation_location,
                                ta: substation_ta,
                                lat: Number(substation_latitude),
                                lng: Number(substation_longitude)
                            }
                            // create new substation
                            this.props.addFeature(substation, "sub-stations", user.token);
                            // then change state to default
                            this.props.createItem();
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
            preview_feature, marep_center_ta, marep_center_latitude, marep_center_longitude,
            transformer_latitude, transformer_location, transformer_longitude, transformer_position,
            transformer_primary, transformer_station, transformer_voltage,
            plant_latitude, plant_longitude, plant_status, plant_name, plant_type, plant_ta,
            substation_latitude, substation_location, substation_name, substation_secondary, substation_ta,
            substation_transmission, substation_longitude, _distribution_line, voltage
        } = this.state;

        /**
         * Check which feature is to be added
         * Then render the corresponding form fields
         */
        switch (selected) {
            case 'marep_center':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
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

                        <div className="form-button-margin">
                            <Button
                                className={classes.margin}
                                name="save"
                                type="submit"
                                disabled={
                                    !(marep_center_latitude && marep_center_longitude && marep_center_ta && preview_feature)
                                }
                                intent="success"
                                text="Save Marep Center"
                            />
                        </div>
                    </form>
                );
            case 'transformer':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
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

                        <div className="form-button-margin">
                            <Button
                                className={classes.margin}
                                type="submit"
                                disabled={
                                    !(transformer_longitude && transformer_latitude && transformer_voltage &&
                                        transformer_primary && transformer_position && transformer_location && transformer_station)}
                                intent="success"
                                text="Save Transformer"
                            />
                        </div>
                    </form>
                );
            case 'power_plant':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">

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
                                    value={this.state.plant_capacity}
                                    name="plant_capacity"
                                    placeholder="Enter new power plant capacity..."
                                    label="Plant Capacity*"
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

                        <div className="form-button-margin">
                            <Button
                                className={classes.margin}
                                type="submit"
                                disabled={!(plant_latitude && plant_longitude && plant_name && plant_status &&
                                    plant_ta && plant_type)}
                                intent="success"
                                text="Save Plant"
                            />
                        </div>
                    </form>
                );
            case 'substation':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
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

                        <div className="form-button-margin">
                            <Button
                                className={classes.margin}
                                type="submit"
                                disabled={!(substation_latitude && substation_secondary && substation_location &&
                                    substation_longitude && substation_name && substation_ta && substation_transmission)}
                                intent="success"
                                text="Save Substation"
                            />
                        </div>
                    </form>
                );
            case 'distribution_line':
                return (
                    <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                        <div className="form-group">
                            <BootsrapTextareaField
                                name="_distribution_line"
                                value={this.state._distribution_line}
                                placeholder="Enter new distribution line, i.e [[34.234568, -0.243536],...]"
                                label="Distribution Line*"
                                type="text"
                                rows={4}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <FormControl className={classes.margin}>
                            <Paper elevation={0}>
                                <SelectInputControl
                                    name="voltage"
                                    label="Voltage(*)"
                                    {...this.state}
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="">{`Choose Voltage`}</option>
                                    <option value="33">33 KV</option>
                                    <option value="11">11 KV</option>
                                </SelectInputControl>
                            </Paper>
                        </FormControl>

                        <div className="form-button-margin">
                            <Button
                                className={classes.margin}
                                type="submit"
                                disabled={!(_distribution_line && voltage)}
                                intent="success"
                                text="Save Distribution Line"
                            />
                        </div>
                    </form>
                );
            default:
                return null;
        }
    }

    render() {

        // loading status, gis_filters from props
        const { classes, handleClick } = this.props;
        // state props 
        const { feature, district_name, selectedvalue, country_name } = this.state;

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
                        this.state.preview_feature && (
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
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value="">{`Add feature`}</option>
                                    <option value="national">{`National`}</option>
                                    <option value="district">{`District`}</option>
                                </SelectInputControl>

                            </Paper>

                        </FormControl>

                        <Fragment>

                            {
                                feature === 'district' && (
                                    <>
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

                                        { /** filter sections here */}
                                        <FormControl className={classes.margin}>

                                            <Paper elevation={0}>

                                                {
                                                    district_name && (
                                                        <SelectInputControl
                                                            name="district_feature_type"
                                                            label="Type(*)"
                                                            {...this.state}
                                                            onChange={e => this.handleSelectChange(e)}
                                                        >
                                                            <option value="">{`Choose feature type`}</option>
                                                            <option value="marep_center">Marep Center</option>
                                                            <option value="transformer">Transformer</option>
                                                            <option value="distribution_line">Distribution Line</option>
                                                        </SelectInputControl>
                                                    )
                                                }

                                            </Paper>

                                        </FormControl>
                                    </>
                                )
                            }

                            {
                                feature === 'national' && (
                                    <>
                                        { /** filter sections here */}
                                        <FormControl className={classes.margin}>

                                            <Paper elevation={0}>

                                                <SelectInputControl
                                                    name="country_name"
                                                    label="Country(*)"
                                                    {...this.state}
                                                    onChange={e => this.handleChange(e)}
                                                >
                                                    <option value="">{`Choose country`}</option>
                                                    <option value="Malawi">Malawi</option>
                                                </SelectInputControl>

                                            </Paper>

                                        </FormControl>
                                        { /** filter sections here */}
                                        <FormControl className={classes.margin}>

                                            <Paper elevation={0}>

                                                {
                                                    country_name && (
                                                        <SelectInputControl
                                                            name="district_feature_type"
                                                            label="Type(*)"
                                                            {...this.state}
                                                            onChange={e => this.handleSelectChange(e)}
                                                        >
                                                            <option value="">{`Choose feature type`}</option>
                                                            <option value="power_plant">Power Plant</option>
                                                            <option value="substation">Substation</option>
                                                        </SelectInputControl>
                                                    )
                                                }

                                            </Paper>

                                        </FormControl>
                                    </>
                                )
                            }

                            <Divider />

                            {
                                feature || district_name
                                    ? this.renderForms({ selected: this.state.selectedvalue })
                                    : null
                            }

                            <div className={classes.margin}>
                                {
                                    feature && (
                                        selectedvalue && (
                                            <FormCheckboxControl
                                                name='preview_feature'
                                                value='Preview on Map'
                                                isChecked={this.state.preview_feature}
                                                classes={classes}
                                                handleChange={(e) => { this.handleChecked(e) }}
                                            />
                                        )
                                    )
                                }
                            </div>

                        </Fragment>
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

export default (connect(mapStateToProps, null)(withStyles(styles)(AddFeature)));