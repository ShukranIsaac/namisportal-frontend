import React, { Fragment } from 'react';
import { BusinessEntity, EnvironmentalClearance, LandClearance, MinigridLicensingApplication } from '../licensing/process';

/**
 * Each case renders a specific component
 * and expecting the user to supplies all required field data before saving 
 * to continue to the next stage in the process of finance application
 * 
 * @author Isaac S. MWakabira
 * 
 * @param {Object} state
 * @param {Function} next
 * @param {Function} handleChange
 * @param {Array} components
 * 
 */
export const RenderStepComponent = ({ state, next, handleChange, Components }) => {

    switch(state) {
        case 0:
            return (
                <Fragment>
                    <BusinessEntity next={ next } />
                </Fragment>
            );

        case 1:
            return (
                <Fragment>
                    <EnvironmentalClearance next={ next } handleChange={ handleChange } />
                </Fragment>
            );

        case 2:
            return (
                <Fragment>
                    <LandClearance next={ next } />
                </Fragment>
            );

        case 3:
            return (
                <Fragment>
                    <MinigridLicensingApplication next={ next } />
                </Fragment>
            );

        default: {

            return (
                <Fragment></Fragment>
            );

        }
            
    }

}