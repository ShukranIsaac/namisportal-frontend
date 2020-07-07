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
const ResourceSection = ({ 
    option, name, 
    list: List, 
    create: Create, 
    edit: Edit, 
    remove: Remove, 
    archive: Archive 
}) => {
    /** 
     * removes any leading and trailling white space 
     * characters from the name string
     */
    const section = name.trim();

    // return if name || option is null and undefined
    if(!name || !option || !section) {
        return null;
    }

    switch (option.trim()) {
        
        case 'list':
            // list of resource chosen
            return <List />

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
            return (<Fragment>
                    { section && <Edit /> }
                </Fragment>
            );
        
        default:
            // default, list all
            return <List />

    }

}

export default ResourceSection;