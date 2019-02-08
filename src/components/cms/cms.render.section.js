import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditNewsItem from '../news/news.edit.item';
import EditLibraryItem from '../library/library.edit.document';
import CreateNewsItem from '../news/news.create.item';
import CreateLibraryItem from '../library/library.create.document';
import ResourceSection from './cms.section.resource';
import ListNewsArticles from '../news/news.list.items';
import { ListLibraryDocuments } from '../library/library.list.documents';
import { ListDirectoryInstitution } from '../directory/directory.list.institutions';
import EditDirectoryInstitution from '../directory/directory.edit.institution';
import CreateDirectoryInstitution from '../directory/directory.create.institution';
import { FinancingRequestSupport } from '../financing/financing.request.support';
import { UserProfile } from '../user/user.profile';
import { redirect } from '../user/user.redirect';
import { ListHomeSubcategory } from '../home/home.list.subcategory';
import EditHomeSubcategory from '../home/home.edit.subcategory';
import CreateHomeSubcategory from '../home/home.add.subcategory';

const directory = [
    {
        id: '12',
        name: 'Department of Energy (Marep)',
        type: 'Financial Institution',
        details: {
            mission: 'An information portal is a customized website that immerses information from a wide range of sources in a consistent and uniform manner. For this purpose, UNDP and Department of Energy Affairs (DoEA) seek to establish an information clearing house portal to make available information that includes: current electricity grid network, planned and known rural electrification efforts of Malawi Rural Electrification Project (MAREP); existing off-grid systems; population centres; renewable energy resource information; infrastructure; location of government public service institutions; location of other rural infrastructure, land use, environmental and social issues.',
            vision: 'The Portal allows the self-registration of state authorities, local authorities, financing institutions and other entities of relevance to mini-grid development. Their details are gathered in the Directory section.',
            summary: 'Mini-Grid development in Tanzania may receive fincancing aid from REA. The required documentation and an overview of the procedure is presented in a dedicated relevant section of the Mini-Grids Information Portal.',
            address: {
                name: 'Mountain City, Office Park, Lilongwe, Malawi',
                phone: '+265 099689789',
                email: 'doe@john.com',
                web: 'minigrids.co.mw'
            },
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
const RenderSection = ({ 
    link, 
    props, 
    handleClick, 
    handleChange
}) => {
    
    switch (link) {

        case 'home':
            
            return (
                <Fragment>
                    
                    <ResourceSection 
                        option={props.user_event} 
                        name="home" 
                        List={ () => <ListHomeSubcategory 
                                    handleClick={ (e) => handleClick(e) } 
                                    category={ props.home } 
                                    handleChange={ (e) => { handleChange(e) } }
                                /> 
                            }
                        Edit={ () => <EditHomeSubcategory 
                                    handleClick={ (e) => handleClick(e) }
                                    category={ props.home }
                                    subcategory={ props.subcategory }
                                    editCategory={ props.editCategory }
                                    archiveCategory={ props.archiveCategory }
                                    props={ props }
                                />
                            }
                        Create={ () => <CreateHomeSubcategory 
                                    handleClick={ (e) => handleClick(e) } 
                                    category={ props.home }
                                    createCategory={ props.createCategory }
                                    props={ props }
                                />
                            }
                    />

                </Fragment>
            );

        case 'licencing':

            return (
                <Fragment>
                    
                </Fragment>
            );

        case 'financing':

            return (
                <Fragment>

                    <FinancingRequestSupport />

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
                                        directory={ directory }
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

        case 'logout':
            
            // Get logged in user, then removed from local storage
            const user = UserProfile.get();
            // console.log(props);
            if(user !== undefined && user !== null) {
                props.logout(user);
                // console.log(user);
                return redirect.to({ url: `/login` });
            } else {
                return <Fragment />
            }

        case 'notifications':
        case 'settings':
        case 'contact':
        default: {

            return (
                <Fragment>

                </Fragment>
            );
            
        }

    }
}

const styles = theme => ({
    content: {
      height: `100%`,
      width: `80%`,
      flexGrow: 1,
      padding: theme.spacing.unit * 0,
      minWidth: 0, // So the Typography noWrap works
    },
});


RenderSection.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RenderSection);