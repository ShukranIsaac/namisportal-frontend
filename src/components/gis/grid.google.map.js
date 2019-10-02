import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker, Polygon, Polyline } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MainContentWrapper from '../MainContentWrapper';
import PointMarker from './marker'

import './grid.css';
import { CustomGoogleMap } from './grid.custom.map';

import * as GisAction from '../../actions/index';

/**
 * Main gis grid view
 * 
 * @author Isaac S. Mwakabira
 */
class MinGridMap extends Component {

    constructor() {
        super();
        this.state = {
            zoom: 7,
            newcenter: {
                lat: -13.2512, lng: 34.30154
            },
            show: false,
            h: 0
        };

        this.renderDistrictMarepCenters = this.renderDistrictMarepCenters.bind(this);
        this.renderDistrictPolygon = this.renderDistrictPolygon.bind(this);
        this.renderRegionPolygon = this.renderRegionPolygon.bind(this);
        this.getPolygonCentroid = this.getPolygonCentroid.bind(this);
        this.renderPolygon = this.renderPolygon.bind(this);
        this.renderRegionMeters = this.renderRegionMeters.bind(this);
        this.renderDistrictMeters = this.renderDistrictMeters.bind(this);
        this.renderPolyline = this.renderPolyline.bind(this);

    }

    componentDidMount() {
        const h = document.body.offsetHeight - document.querySelector('#giveHeaderHeight').offsetHeight;
        this.setState({ h })
    }

    componentDidUpdate(prevProps, prevState) {

        // fetch region
        this.getRegion(prevProps);

        // fetch district
        this.getDistrict(prevProps);

    }

    /**
     * Check if region name is defined and not null and not equal to default value.
     * Filter the region which was selected and fetch region and all its properties 
     * from the api using the filtered object id.
     * 
     */
    getRegion = (prevProps) => {
        // ES6 destructure different objects from state
        const { region_name, regionDefault } = this.props;

        if (region_name !== undefined && region_name !== null
            && region_name.trim() !== '' && region_name !== regionDefault
            && region_name !== prevProps.region_name) {

            const { gis_filters, fetchRegion } = this.props;
            // filter the region name which was selected and call api using the _id
            const region_object = gis_filters.filter(({ properties, _id }) => {

                // this.props.properties.name equals region name
                // from the ui then return region object else return null
                if (properties.name === region_name) {

                    return _id;
                }

                return null;

            });
            // call api
            if (region_object !== undefined && region_object !== null && region_object.length === 1) {

                fetchRegion(region_object[0]._id);

            }

        }

    }

    /**
     * Check if district name is defined and not null and not equal to default value, 
     * and does not have any trailing spaces. Fetch district and all its properties. 
     * 
     */
    getDistrict = (prevProps) => {
        // ES6 destructure different objects from state
        const { district_name, districtDefault, fetchDistrict } = this.props;

        if (district_name !== undefined && district_name !== null
            && district_name.trim() !== '' && district_name !== districtDefault
            && prevProps.district_name !== district_name) {

            // fetch district
            fetchDistrict(district_name);

            // if district changed fetch its marep centers
            // this.marepCenters(prevProps, this.props);

        }

    }

    inforClose = props => {
        if (this.state.show) {
            this.setState({
                activeMarker: null,
                show: false,
            });
        }
    };

    /**
     * Render district marep centers: making sure district, m_centers(coordinates)
     * and checkbox is set to true.
     * 
     * @param {Props} props
     * @returns {MarkerClusterer} markers
     */
    renderDistrictMarepCenters = ({ district_name, marep_center, m_centers, isLoading }) => {

        if (!isLoading) {

            if (district_name !== null && district_name !== undefined && marep_center) {

                if (m_centers !== null && m_centers !== undefined && m_centers.length !== null) {

                    return this.markerClusterer(m_centers, 'Marep Center');

                }

            } else {

                return (
                    <>
                        <MarkerClusterer />
                    </>
                );
            }

        } else {

            return <div className='loader' />

        }

    }

    /**
     * Renders any polyline
     * 
     * @param {Object} polyline
     * @param {String} district
     * @param {String} region
     * @param {Boolean} distribution_lines
     * @returns {Polyline} polyline
     */
    renderPolyline = ({ polyline, distribution_lines, eleven_kv_lines }) => {

        if ((distribution_lines || eleven_kv_lines) && polyline !== null && polyline !== undefined) {

            return polyline.map((line, key) => {
                
                return (
                    <Fragment key={line._id + key}>
                        <Polyline
                            path={line.geometry.coordinates[0]}
                            geodesic={true}
                            options={{
                                strokeColor: distribution_lines ? "blue" : "#4cd137",
                                strokeOpacity: 0.75,
                                strokeWeight: 2,
                                icons: [
                                    {
                                        offset: "0",
                                        repeat: "20px"
                                    }
                                ]
                            }}
                        />
                    </Fragment>
                );

            });

        }

    }

    renderPowerPlants = ({ power_plants, isLoading }) => {

        if (!isLoading) {

            if (power_plants !== null) {

                return this.markerClusterer(power_plants, 'Power Plant');

            }

        } else {

            return <div className='loader' />

        }

    }

    /**
     * Marker clusterer
     * 
     * @param {Object} clusters 
     * @returns {MarkerClusterer} markers
     */
    markerClusterer = (clusters, title) => {

        if (clusters !== null && clusters !== undefined) {

            return (
                <Fragment>

                    <MarkerClusterer>
                        {
                            clusters.map((point) => {
                                return (
                                    <PointMarker point={point} title={title} />
                                )

                            })
                        }
                    </MarkerClusterer>

                </Fragment>
            );

        }

    }



    /**
     * Renders region meters
     * 
     * @param {String} region_name
     * @param {Object} meters
     * @returns markers
     */
    renderRegionMeters = ({ region_name, meters, color }) => {

        if (region_name !== null && region_name !== undefined) {

            if (meters !== null && meters !== undefined) {

                return (
                    <MarkerClusterer>

                        {
                            meters.centers.map((point, key) => {

                                return <Marker position={point.coordinates} key={key} />

                            })
                        }

                    </MarkerClusterer>
                );

            }

        } else {

            return (
                <>
                    <MarkerClusterer />
                </>
            );

        }

    }

    /**
     * Renders district meters
     * 
     * @param {String} district
     * @param {Object} meters
     * @returns markers
     */
    renderDistrictMeters = ({ district_name, meters, color }) => {

        if (district_name !== null && district_name !== undefined) {

            if (meters !== null && meters !== undefined) {

                return (
                    <MarkerClusterer>

                        {
                            meters.centers.map((point, key) => {

                                return <Marker position={point.coordinates} key={key} />

                            })
                        }

                    </MarkerClusterer>
                );

            }

        } else {

            return (
                <>
                    <MarkerClusterer />
                </>
            );

        }

    }

    renderPowerSubStations = ({
        district_name,
        isLoading,
        power_sub_stations
    }) => {

        if (!isLoading) {

            if (district_name !== null && district_name !== undefined) {

                if (power_sub_stations !== null && power_sub_stations !== undefined) {

                    return (

                        <MarkerClusterer averageCenter>

                            {
                                power_sub_stations.map((sub_station) => {

                                    return (
                                        <PointMarker key={sub_station._id} point={sub_station} title='Sub-Station' />
                                    )

                                })
                            }

                        </MarkerClusterer>
                    );

                }

            } else {

                return (
                    <>
                        <MarkerClusterer />
                    </>
                );

            }

        } else {

            return <div className='loader' />

        }

    }
    /**
     * Renders district transformers
     * 
     * @param {String} district_name
     * @param {Object} transformers
     * @param {Boolean} ground_transformers
     * @param {Boolean} up_transformers
     * @returns markers
     */
    renderTransformers = ({
        district_name, transformers,
        color, ground_transformers,
        up_transformers, isLoading
    }) => {

        if (!isLoading) {

            if (district_name !== null && district_name !== undefined) {

                if (transformers !== null && transformers !== undefined
                    && (ground_transformers || up_transformers)) {

                    return (

                        <MarkerClusterer averageCenter>

                            {
                                transformers.map((transformer) => {

                                    return (

                                        <PointMarker key={transformer._id} point={transformer} title='Transformer' />
                                    )

                                })
                            }

                        </MarkerClusterer>
                    );

                }

            } else {

                return (
                    <>
                        <MarkerClusterer />
                    </>
                );

            }

        } else {

            return <div className='loader' />

        }

    }

    /**
     * Renders any polygon
     * 
     * @param coordinates
     * @param color
     * @param opacity
     * @returns polygon
     */
    renderPolygon = (polygons, color, opacity) => {

        if (polygons !== undefined && polygons !== null) {

            return polygons.map(({ geometry: { coordinates }, _id }) => {

                return (
                    <Fragment key={_id}>
                        <Polygon
                            paths={coordinates}
                            options={{
                                fillOpacity: opacity,
                                strokeColor: color,
                                strokeOpacity: 1,
                                strokeWeight: 1
                            }}
                        />
                    </Fragment>
                );

            });

        }

    }

    /**
     * Region polygon
     * 
     * @param {String} region
     * @param {Array} r_polygons
     * @returns renderPolygon
     */
    renderRegionPolygon = ({ region, r_polygons, isLoading }) => {

        if (!isLoading) {

            if (region !== null && region !== undefined) {

                if (r_polygons !== undefined && r_polygons !== null) {

                    return this.renderPolygon(r_polygons.polygons, "red", 0.3);

                }

            }

        } else {

            return <div className="loader" />

        }

    }

    /**
     * District polygon
     * 
     * @param {String} district_name
     * @param {Array} d_polygons
     * @returns renderPolygon
     */
    renderDistrictPolygon = ({ district_name, d_polygons, isLoading }) => {

        if (!isLoading) {

            if (district_name !== null && district_name !== undefined) {

                return this.renderPolygon(d_polygons, "yellow", 0.31);

            }

        } else {

            return <div className="loader" />

        }

    }

    /**
     * Filter district given the condition true
     * 
     * @param {Array} districts
     * @param {String} district_name 
     * @returns {Object} o
     */
    filterDistrictsCentroids = (districts, district_name) => {

        return districts.filter((o) => {

            if (o.district === district_name) {
                return o;
            }

            return null;
        });

    }

    /**
     * Get polygon centroid(coordinates) i.e. district or region
     * 
     * @returns {Array} centroid
     */
    getPolygonCentroid = ({ district_name, centroids }) => {

        if (district_name !== null && district_name !== undefined) {

            if (centroids !== undefined && centroids !== null) {

                return centroids;

            }

        } else {

            return this.state.newcenter;
        }

    }

    render() {

        const google = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places';
        const { h } = this.state;
        // console.log(this.props)
        return (
            <Fragment>
                <CustomGoogleMap
                    googleMapURL={google} loadingElement={<div style={{ height: h, width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }} />}
                    containerElement={<div id="map-canvas" style={{ width: '100%', marginLeft: 0 }} ></div>}
                    mapElement={<div id="map" style={{ height: h }} />}
                    onDistrictChanged={this.renderDistrictPolygon(this.props)}
                    onRegionChanged={this.renderRegionPolygon(this.props)}
                    onMarepCenter={this.renderDistrictMarepCenters(this.props)}
                    onDistrictMeters={this.renderDistrictMeters(this.props)}
                    onRegionMeters={this.renderRegionMeters(this.props)}
                    onTransformers={this.renderTransformers(this.props)}
                    onPowerSubStations={this.renderPowerSubStations(this.props)}
                    onCenterChanged={this.getPolygonCentroid(this.props)}
                    onPolyline={this.renderPolyline(this.props)}
                    onPowerPlantChanged={this.renderPowerPlants(this.props)}
                    {...this.state}
                />
            </Fragment>
        );
    }
}

const styles = theme => ({
    content: {
        height: `100%`,
        width: `80%`,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 0,
        minWidth: 0, // So the Typography noWrap works
    },
});

MinGridMap.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return {
        region: state.region.region,
        // gis_filters: state.gis_filters.gis_filters,
        // power_plant_filters: state.gis_filters.power_plant_filters,
        // power_plants: state.power_plants.power_plants,
        district: state.district.district,
        // meters: state.meters.meters,
        // distr_lines: state.lines.lines,
        errored: state.region.errored,
        general: state.general.general,
        m_centers: state.m_centers.coordinates,
        // transformers: state.transformers.transformers,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        // fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        // powerPlantFilters: () => { dispatch(GisAction.powerPlantsFilters()) },
        // fetchPowerPlants: (capacity, type) => { dispatch(GisAction.powerPlants(capacity, type)) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district)) },
        // fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        // fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
        // fetchTransformers: (distr_id, position) => { dispatch(GisAction.fetchTransformers(distr_id, position)) },
        // fetchDistributionLines: (district, type) => { dispatch(GisAction.fetchDistributionLines(district, type)) },
    };

}

export default withStyles(styles)(MainContentWrapper(connect(mapStateToProps, mapDispatchToProps)(MinGridMap)));
