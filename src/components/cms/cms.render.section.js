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
import FinancingRequestSupport from '../financing/financing.request.support';
import { UserProfile } from '../user/user.profile';
import { redirect } from '../user/user.redirect';
import { ListHomeSubcategory } from '../home/home.list.subcategory';
import EditHomeSubcategory from '../home/home.edit.subcategory';
import CreateHomeSubcategory from '../home/home.add.subcategory';
import { ListFinancingRequests } from '../financing/financing.list.requests';
import EditFinancingRequestSupport from '../financing/financing.edit.request';
import LicensingProcess from '../licensing/licensing.process';
import CreateContactDetails from '../contact/contact.create.form';
import ContactShowDetails from '../contact/contact.show.details';
import EditContactDetails from '../contact/contact.edit.form';

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
                                    { ...props }
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

        case 'licensing':

            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="licensing"
                        List={ () => <LicensingProcess 
                                handleClick={ (e) => handleClick(e) }
                                { ...props }
                            /> 
                        }
                    />

                </Fragment>
            );

        case 'financing':

            return (
                <Fragment>

                    <ResourceSection
                        option={props.user_event}
                        name="financing"
                        List={ () => <ListFinancingRequests 
                                    handleClick={ (e) => handleClick(e) }
                                    category={ props.subcategory }
                                /> 
                            }
                        Edit={ () => <EditFinancingRequestSupport 
                                    handleClick={ (e) => handleClick(e) }
                                    editCategory={ props.editCategory }
                                    { ...props }
                                /> 
                            }
                        Create={ () => <FinancingRequestSupport 
                                    handleClick={ (e) => handleClick(e) }
                                    subcategory={ props.subcategory }
                                    createCategory={ props.createCategory }
                                    { ...props }
                                /> 
                            }
                    />

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
                                        stakeholders={ props.stakeholders_list } 
                                        handleChange={ (e) => { handleChange(e) } }
                                    /> 
                            }
                        Edit={ () => <EditDirectoryInstitution 
                                        handleClick={ (e) => handleClick(e) }
                                        stakeholder={ props.stakeholder }
                                        editStakeholder={ props.editStakeholder }
                                        // archiveStakeholder={ props.archiveStakeholder }
                                        { ...props }
                                    />
                            }
                        Create={ () => <CreateDirectoryInstitution 
                                    stakeholder={ props.stakeholder }
                                    createStakeholder={ props.createStakeholder }
                                    { ...props }
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
                                        { ...props }
                                    />
                            }
                        Create={ () => <CreateLibraryItem 
                                            handleClick={ (e) => handleClick(e) } 
                                            { ...props }
                                            uploadFile={ props.uploadFile }
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
            
            // Get logged in user, then remove from local storage
            const user = UserProfile.get();
            if(user !== undefined && user !== null) {
                // logout user
                props.logout(user);
                // redirect the user to login
                return redirect.to({ url: `/login` });

            } else {

                return <Fragment />

            }

        case 'notifications':
        case 'settings':
            
            return <Fragment />

        case 'contact':
            
            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="contact" 
                        List={ () => <ContactShowDetails handleClick={ (e) => handleClick(e) } handleChange={ e => handleChange(e) } /> }
                        Edit={ () => <EditContactDetails handleClick={ (e) => handleClick(e) } /> }
                        Create={ () => <CreateContactDetails handleClick={ (e) => handleClick(e) } /> }
                    />

                </Fragment>
            );

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