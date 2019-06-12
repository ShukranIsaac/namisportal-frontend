import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormControl, Paper, withStyles } from '@material-ui/core';
import { SelectInputControl } from '../forms/form.selectinput.field';
import styles from '../contact/form.styles';
import { Divider, Intent } from '@blueprintjs/core';
import ButtonControl from '../forms/buttons/button.default.control';
import { UserProfile, profile } from '../user/user.profile';

/**
 * Render gis component to: upload new coordinates, and other features
 * 
 * @author Isaac S. Mwakabira
 */
class GisFeatures extends Component {

    constructor() {
        super();
        this.state = {};

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

            if (region.properties.name === this.props.region_name) {

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
        if (this.props.region_name !== undefined && this.props.region_name !== null) {

            return this.filterDistrictsPerRegion(gis_filters).map(({districts}) => {

                return districts.map(({ properties, _id }) => {

                    return <option id={ _id } value={ properties.name } key={ _id }>{ properties.name }</option>

                });
            });

        }

    }

    render() {

        const { classes, handleClick, handleChange, region_name, district_name, features } = this.props;
        // get the logged in user
        const user = UserProfile.get();

        console.log(this.props.features)

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
                                    value={ region_name }
                                    onChange={ e => handleChange(e) }
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
                                    value={ district_name }
                                    onChange={ e => handleChange(e) }
                                >
                                    <option value="">{ `Choose district` }</option>
                                    { this.renderDistricts(this.props) }
                                </SelectInputControl>

                            </Paper>

                        </FormControl>

                        <Divider />

                        {
                            (region_name && district_name && features !== null) && (
                                <>
                                    <div>{ `Region: ` + region_name }</div>
                                    <div>{ `District: ` + district_name }</div>
                                    <div>{ `Marep Centers count: ` + features.marepCenters.count }</div>
                                    <div>{ `Power Plants count: ` + features.powerPlants.count }</div>
                                    <div>{ `Power SubStations : ` + features.powerSubStations.count }</div>
                                    <div>{ `transformers: ` + features.transformers.count }</div>
                                    <div>{ `Distribution Lines: ` + features.distributionLines.count }</div>
                                </>
                            )
                        }

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

export default connect(mapStateToProps, null)(withStyles(styles)(GisFeatures));