import React, { Fragment } from "react";

/**
 * Renders a single resource
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {String} name
 * @param {String} option 
 * @param {Component} list
 * @param {Component} create
 * @param {Component} edit
 * @param {Component} remove
 * @param {Component} archive
 * 
 * @returns {ResourceSection} component
 */
const ResourceSection = ({ option, name, list, Create, Edit, Remove, Archive }) => {

    // return if name is null and undefined
    if(name === null && name === undefined) {
        return;
    }

    // return if option is null and undefined
    if(option === null && option === undefined) {
        return;
    }

    /** 
     * removes any leading and trailling white space 
     * characters from the name string
     */
    const section = name.trim();

    // if no section is defined, just return
    if(!section) return;

    switch (option.trim()) {

        case 'list':
            // list of resource chosen
            return (
                <Fragment>
                    { () => list() }
                </Fragment>
            );

        case 'create':
            // create new resource
            return (
                <Fragment>
                    { section && <Create /> }
                </Fragment>
            );

        case 'delete':
            // delete this resource from memory
            return (
                <Fragment>
                    { section && <Remove /> }
                </Fragment>
            );

        case 'archive':
            // archive this resource, don't show to viewrs
            return (
                <Fragment>
                    { section && <Archive /> }
                </Fragment>
            );

        case 'edit':
            // edit
            return (
                <Fragment>
                    { section && <Edit /> }
                </Fragment>
            );

        case 'publish':
            // edit
            return (
                <Fragment>
                    { section && <Edit /> }
                </Fragment>
            );

        case 'unpublish':
            // edit
            return (
                <Fragment>
                    { section && <Edit /> }
                </Fragment>
            );
        
        default:
            // default, list all
            return (
                <Fragment>
                    { () => list() }
                </Fragment>
            );

    }

}

export default ResourceSection;