import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as GisAction from '../../actions/index';
import CMSMapPreview from './cms.map.preview';

/**
 * Render gis component to: upload new coordinates, and other features
 * 
 * @author Isaac S. Mwakabira
 */
class GISComponent extends Component {

    constructor() {
        super();
        this.state = {
            zoom: 7,
            newCenter: {
                lat: -13.2512, lng: 34.30154
            },
            show: false,
            h: `750px`
        };

    }


    componentDidMount() {

        // fetch initial filters
        this.props.fetchFilters();
    
    }

    render() {

        return (
            <Fragment>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#gis">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#preview">Preview</a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="gis" class="tab-pane active"><br />
                        Add Features
                    </div>
                    <div id="preview" class="tab-pane fade"><br />
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
        gis_filters: state.gis_filters.gis_filters,
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
        fetchFilters: () => { dispatch(GisAction.fetchGisFilters()) },
        // powerPlantFilters: () => { dispatch(GisAction.powerPlantsFilters()) },
        // fetchPowerPlants: (capacity, type) => { dispatch(GisAction.powerPlants(capacity, type)) },
        fetchRegion: (region) => { dispatch(GisAction.fetchRegion(region)) },
        fetchDistrict: (district) => { dispatch(GisAction.fetchDistrict(district))},
        // fetchMarepCenters: (name) => { dispatch(GisAction.fetchMarepCenters(name)) },
        // fetchMeters: (name) => { dispatch(GisAction.fetchEscomMeters(name)) },
        // fetchTransformers: (distr_id, position) => { dispatch(GisAction.fetchTransformers(distr_id, position)) },
        // fetchDistributionLines: (district, type) => { dispatch(GisAction.fetchDistributionLines(district, type)) },
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(GISComponent);