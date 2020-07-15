import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditNewsItem from '../news/news.edit.item';
import EditLibraryItem from '../library/library.edit.document';
import CreateNewsItem from '../news/news.create.item';
import CreateLibraryItem from '../library/library.create.document';
import ResourceSection from './cms.section.resource';
import ListNewsArticles from '../news/news.list.items';
import ListLibraryDocuments from '../library/library.list.documents';
import { ListDirectoryInstitution } from '../directory/directory.list.institutions';
import EditDirectoryInstitution from '../directory/directory.edit.institution';
import CreateDirectoryInstitution from '../directory/directory.create.institution';
import UserProfile from '../user/user.profile';
import { redirect } from '../user/user.redirect';
import { ListHomeSubcategory } from '../home/home.list.subcategory';
import EditHomeSubcategory from '../home/home.edit.subcategory';
import CreateHomeSubcategory from '../home/home.add.subcategory';
import ListUserAccounts from '../user/user.list.cms.component';
import EditUserAccount from '../user/user.edit.cms.component';
import EditUserProfile from '../user/user.details.cms.component';
import ListFAQS from '../faq/faqs.list.component';
import CreateQuestion from '../faq/faq.add.component';
import EditQuestion from '../faq/faq.edit.component';
import AddUserAccount from '../user/user.add.component';

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
    handleChange,
    // category,
    capitalize,
    handleFilteredResource,
    filteredResource
}) => {

    switch (link) {

        case 'home':

            return <ResourceSection
                option={props.user_event}
                name="home"
                list={() => <ListHomeSubcategory
                        {...props}
                        handleClick={(e) => handleClick(e)}
                        category={props.home}
                        handleChange={(e) => { handleChange(e) }}
                    />
                }
                edit={() => <EditHomeSubcategory
                        handleClick={(e) => handleClick(e)}
                        category={props.home}
                        subcategory={props.subcategory}
                        editCategory={props.editCategory}
                        archiveCategory={props.archiveCategory}
                        {...props}
                        link={link}
                        capitalize={capitalize}
                    />
                }
                create={() => <CreateHomeSubcategory
                        handleClick={(e) => handleClick(e)}
                        category={props.home}
                        createCategory={props.createCategory}
                        props={props}
                        link={link} capitalize={capitalize}
                    />
                }
            />

        case 'directory':

            return <ResourceSection
                option={props.user_event}
                name="directory"
                list={() => <ListDirectoryInstitution
                        handleClick={(e) => handleClick(e)}
                        stakeholders={props.stakeholders_list}
                        handleChange={(e) => { handleChange(e) }}
                        {...props}
                    />
                }
                edit={() => <EditDirectoryInstitution
                        handleClick={(e) => handleClick(e)}
                        stakeholder={props.stakeholder}
                        editStakeholder={props.editStakeholder}
                        // archiveStakeholder={ props.archiveStakeholder }
                        {...props}
                        link={link}
                        capitalize={capitalize}
                    />
                }
                create={() => <CreateDirectoryInstitution
                        stakeholder={props.stakeholder}
                        createStakeholder={props.createStakeholder}
                        {...props}
                        handleClick={(e) => handleClick(e)}
                        link={link} capitalize={capitalize}
                    />
                }
            />

        case 'library':
            
            return <ResourceSection
                option={props.user_event}
                name="library"
                list={() => <ListLibraryDocuments
                        handleClick={(e) => handleClick(e)}
                        docs={props.library}
                        {...props}
                        handleChange={(e) => handleChange(e)}
                        handleFilteredResource={ handleFilteredResource }
                    />
                }
                edit={() => <EditLibraryItem
                        handleClick={(e) => handleClick(e)}
                        {...props}
                        link={link}
                        capitalize={capitalize}
                        filteredResource={ filteredResource }
                    />
                }
                create={() => <CreateLibraryItem
                        handleClick={(e) => handleClick(e)}
                        {...props}
                        uploadFile={props.uploadFile}
                        handleChange={(e) => handleChange(e)}
                        link={link} capitalize={capitalize}
                    />
                }
            />

        case 'faqs':

            return <ResourceSection
                option={props.user_event}
                name="faqs"
                list={
                    () => <ListFAQS
                        handleClick={(e) => handleClick(e)}
                        {...props}
                        questions={props.maincategory}
                    />
                }
                create={
                    () => <CreateQuestion
                        handleClick={(e) => handleClick(e)}
                        handleChange={(e) => handleChange(e)}
                        {...props}
                        link={link} capitalize={capitalize}
                    />
                }
                edit={
                    () => <EditQuestion
                        handleClick={(e) => handleClick(e)}
                        handleChange={(e) => handleChange(e)}
                        {...props}
                        link={link}
                        capitalize={capitalize}
                    />
                }
            />

        case 'news':
            
            return <ResourceSection
                option={props.user_event}
                name="news"
                list={() => <ListNewsArticles
                        handleClick={(e) => handleClick(e)}
                        handleChange={e => handleChange(e)}
                        {...props}
                    />
                }
                edit={() => <EditNewsItem 
                        {...props} 
                        handleClick={(e) => handleClick(e)} 
                        link={link} 
                        capitalize={capitalize} 
                    />
                }
                create={() => <CreateNewsItem 
                        handleClick={(e) => handleClick(e)} 
                        {...props} link={link} 
                        capitalize={capitalize} 
                    />
                }
            />

        case 'logout':

            // Get logged in user, then remove from local storage
            const user = UserProfile.get();
            if (user !== undefined && user !== null) {
                // logout user
                props.logout(user);
                // redirect the user to login
                return redirect.to({ url: `/login` });

            } else {
                return <Fragment />
            }

        case 'accounts':

            return <ResourceSection
                option={props.user_event}
                name="accounts"
                list={
                    () => <ListUserAccounts
                        {...props}
                        handleAccountClick={(e) => handleClick(e)}
                    />
                }
                create={() => <AddUserAccount
                        {...props}
                        handleClick={handleClick}
                        handleChange={handleChange}
                        link={link} 
                        capitalize={capitalize}
                    />
                }
                edit={
                    () => <EditUserAccount
                        {...props}
                        handleClick={handleClick}
                        handleChange={handleChange}
                        link={link} 
                        capitalize={capitalize}
                    />
                }
            />

        case 'profile':

            return <ResourceSection
                option={props.user_event}
                name="profile"
                list={() => <EditUserProfile
                        {...props}
                        handleClick={(e) => handleClick(e)}
                        handleChange={e => handleChange(e)}
                    />
                }
                create={() => (<div>Create new account</div>)}
            />

        default: {

            return <Fragment />

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