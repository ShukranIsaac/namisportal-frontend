import React, { Fragment } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

/**
 * Custom google map
 * 
 * @author Isaac S. Mwakabira
 */
export const CustomGoogleMap = withScriptjs(
    withGoogleMap(props => {

        return (
            <Fragment>
                <GoogleMap
                    defaultZoom={props.zoom}
                    defaultCenter={props.onCenterChanged}
                    defaultOptions={{
                        scrollwheel: false,
                        zoomControl: true,
                        zoomControlOptions: {
                            
                        }
                    }}
                    center={props.onCenterChanged}
                    zoom={props.zoom}
                >

                    {props.onMarepCenter}

                    {props.onDistrictChanged}

                    {props.onRegionChanged}

                    {props.onDistrictMeters}

                    {props.onRegionMeters}

                    {props.onPolyline}

                    {props.onTransformers}

                </GoogleMap>
            </Fragment>
        );

    })
);