import React, { Fragment } from 'react';

import EditNewsItem from '../news/news.edit.item';
import EditLibraryItem from '../library/library.edit.document';
import CreateNewsItem from '../news/news.create.item';
import CreateLibraryItem from '../library/library.create.document';
import ResourceSection from './cms.section.resource';
import ListNewsArticles from '../news/news.list.items';
import { ListLibraryDocuments } from '../library/library.list.documents';
import { ListDirectoryInstitution } from '../directory/directory.list.institutions';
import { EditDirectoryInstitution } from '../directory/directory.edit.institution';
import { CreateDirectoryInstitution } from '../directory/directory.create.institution';

const directory = [
    {
        id: '12',
        name: 'Department of Energy (Marep)',
        type: '',
        details: {
            address: '',
            mission: '',
            vision: '',
            summary: '',
        }
    },
    {
        id: '56',
        name: 'Malawi Energy Regulatory Authority',
        type: '',
        details: {
            address: '',
            mission: '',
            vision: '',
            summary: '',
        }
    },
    {
        id: '31',
        name: 'Ministry of Energy and Natural Resources',
        type: '',
        details: {
            address: '',
            mission: '',
            vision: '',
            summary: '',
        }
    },
    {
        id: '34',
        name: 'UNDP',
        type: '',
        details: {
            address: '',
            mission: '',
            vision: '',
            summary: '',
        }
    },
    {
        id: '100',
        name: 'Mulanje Electricity Generation Agency',
        type: '',
        details: {
            address: '',
            mission: '',
            vision: '',
            summary: '',
        }
    }
];

/**
 * Renders a single section resource i.e. licencing, library at cms index
 * which can be edited, published or unpublished, archived or deleted
 * 
 * @author Isaac S. Mwakabira
 * 
 * @param {Component} link 
 * @param {Props} props 
 * @param {Function} handleClick 
 * @param {Function} handleChange
 * 
 * @returns {Component} resource  
 */
export const RenderSection = ({ 
    link, 
    props, 
    handleClick, 
    handleChange 
}) => {
    
    switch (link) {

        case 'licencing':
        case 'financing':

            return (
                <Fragment>

                </Fragment>
            );
            
        case 'gis':

            return (
                <Fragment>

                    {/* <ResourceSection 
                        option={props.user_event} 
                        name="gis"
                    /> */}

                </Fragment>
            );

        case 'directory':

            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="directory" 
                        List={ () => <ListDirectoryInstitution 
                                        handleClick={ (e) => handleClick(e) } 
                                        directory={ directory } 
                                        handleChange={ (e) => { handleChange(e) } }
                                    /> 
                            }
                        Edit={ () => <EditDirectoryInstitution 
                                        handleClick={ (e) => handleClick(e) }
                                    />
                            }
                        Create={ () => <CreateDirectoryInstitution 
                                            handleClick={ (e) => handleClick(e) } 
                                        />
                                }
                    />

                </Fragment>
            );

        case 'library':

            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="library" 
                        List={ () => <ListLibraryDocuments 
                                        handleClick={ (e) => handleClick(e) } 
                                        docs={props.library} 
                                        handleChange={ (e) => handleChange(e) }
                                    /> 
                            }
                        Edit={ () => <EditLibraryItem 
                                        handleClick={ (e) => handleClick(e) }
                                        docs={props.library}
                                    />
                            }
                        Create={ () => <CreateLibraryItem 
                                            handleClick={ (e) => handleClick(e) } 
                                        />
                                }
                    />

                </Fragment>
            );

        case 'news':
            
            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="news" 
                        List={ () => <ListNewsArticles 
                                        handleClick={ (e) => handleClick(e) } 
                                        handleChange={ e => handleChange(e) } 
                                    /> 
                            }
                        Edit={ () => <EditNewsItem handleClick={ (e) => handleClick(e) } /> }
                        Create={ () => <CreateNewsItem handleClick={ (e) => handleClick(e) } />}
                    />

                </Fragment>
            );

        case 'user':
        case 'notifications':
        case 'settings':
        case 'contact':
        default:

            return (
                <Fragment>

                </Fragment>
            );

    }
}