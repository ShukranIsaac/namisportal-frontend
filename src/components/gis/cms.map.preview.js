import React, { Component, Fragment } from 'react';
import { Marker, Polygon, Polyline } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import PointMarker from './marker'

import './grid.css';
import { CustomGoogleMap } from './grid.custom.map';

/**
 * cms gis component preview
 * 
 * @author Isaac S. Mwakabira
 */
class CMSMapPreview extends Component {

    constructor() {
        super();
        this.state = {}
    }

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

    getType = ({ type }) => {
        switch (type) {
            case 'marep_center':
                return 'Marep Center';
            case 'transfomer':
                return 'Transformer';
            case 'power_plant':
                return 'Power Plant';
            case 'substation':
                return 'Power Substation';
            default:
                return undefined;
        }
    }

    previewGeometry = ({ geometry }) => {

        if (geometry) {

            const { type } = geometry;

            /**
             * If geometry type is a Point else it is a line
             */
            if (type !== 'distribution_line') {
                // lat: -12.32240657526815, lng: 33.43241472365981
                const information = {
                    properties: {
                        district: geometry.district,
                        ta: geometry.ta,
                        status: geometry.plant_status,
                        planType: geometry.plant_type,
                        capacity: geometry.plant_capacity,
                        country: geometry.country_name,
                        secondary: geometry.substation_secondary,
                        transmission: geometry.substation_transmission,
                        location: geometry.location,
                        name: geometry.name,
                        primary: geometry.transformer_primary,
                        position: geometry.transformer_position,
                        station: geometry.transformer_station,
                        voltage: geometry.transformer_voltage
                    },
                    geometry: {
                        coordinates: {
                            lat: Number(geometry.latitude),
                            lng: Number(geometry.longitude)
                        },
                        type: 'Point'
                    }
                }

                return (
                    <Fragment>

                        <PointMarker title={this.getType({ type: geometry.type })} point={information} />

                    </Fragment>
                );

            } else {

            }

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
                    <Fragment key={line._id}>
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

            return this.props.newcenter;

        }

    }

    render() {

        const google = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8-4amVHsfL-PCglVdff9yauniqT4hVQk&libraries=places';
        const { h } = this.props;

        return (
            <Fragment>
                <CustomGoogleMap
                    googleMapURL={google} loadingElement={<div style={{ height: h, width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }} />}
                    containerElement={<div id="map-canvas" style={{ width: '100%', marginLeft: 0 }} ></div>}
                    mapElement={<div id="map" style={{ height: h }} />}
                    onDistrictChanged={this.renderDistrictPolygon(this.props)}
                    onRegionChanged={this.renderRegionPolygon(this.props)}
                    onMarepCenter={this.renderDistrictMarepCenters(this.props)}
                    preview={this.previewGeometry(this.props)}
                    onDistrictMeters={this.renderDistrictMeters(this.props)}
                    onRegionMeters={this.renderRegionMeters(this.props)}
                    onTransformers={this.renderTransformers(this.props)}
                    onCenterChanged={this.getPolygonCentroid(this.props)}
                    onPolyline={this.renderPolyline(this.props)}
                    onPowerPlantChanged={this.renderPowerPlants(this.props)}
                    {...this.props}
                />
            </Fragment>
        );
    }
}

export default CMSMapPreview;
