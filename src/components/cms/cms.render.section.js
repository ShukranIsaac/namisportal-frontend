import React, { Fragment } from 'react';

import FormTextareaField from '../forms/form.textarea.field';
import FormTextInputField from '../forms/form.textinput.field';
import FormFileinputField from '../forms/form.fileinput.field';

import EditNewsItem from '../news/news.edit.item';
import EditLibraryItem from '../library/library.edit.document';
import CreateNewsItem from '../news/news.create.item';
import CreateLibraryItem from '../library/library.create.document';
import ResourceSection from './cms.section.resource';
import ListNewsArticles from '../news/news.list.items';
import { ListLibraryDocuments } from '../library/library.list.documents';

/**
 * Renders a single section resource i.e. licencing, library at cms index
 * which can be edited, published or unpublished, archived or soft deleted
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
export const RenderSection = ({ link, props, handleClick, handleChange }) => {
    
    switch (link) {

        case 'licencing':
            
            return (
                <FormTextInputField
                    name="title"
                    placeholder="Article title..."
                    type="text"
                    handleChange={ e => {
                        console.log(e.target.value);
                    } }
                />
            );

        case 'financing':
            
            return (
                <FormTextareaField
                    name="content"
                    placeholder="News content..."
                    handleChange={ (e) => {
                        console.log(e.target.value);
                    }}
                />
            );

        case 'directory':
        case 'library':

            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="library" 
                        List={ () => <ListLibraryDocuments handleClick={ (e) => handleClick(e) } 
                                        docs={props.library} handleChange={ (e) => handleChange(e) }
                                    /> 
                            }
                        Edit={ () => <EditLibraryItem handleClick={ (e) => handleClick(e) }
                                        docs={props.library}
                                    />
                            }
                        Create={ () => <CreateLibraryItem handleClick={ (e) => handleClick(e) } />}
                    />

                </Fragment>
            );

        case 'notifications':
        case 'news':
            
            return (
                <Fragment>

                    <ResourceSection 
                        option={props.user_event} 
                        name="news" 
                        List={ () => <ListNewsArticles handleClick={ (e) => handleClick(e) } handleChange={ e => handleChange(e) } /> }
                        Edit={ () => <EditNewsItem handleClick={ (e) => handleClick(e) } /> }
                        Create={ () => <CreateNewsItem handleClick={ (e) => handleClick(e) } />}
                    />

                </Fragment>
            );

        case 'user':
        case 'settings':
        case 'contact':
            
            return (
                <FormFileinputField 
                    handleInputChange={ e => {
                        console.log(e.target.value);
                    }} 
                />
            );
    
        default:
            return;
    }
}