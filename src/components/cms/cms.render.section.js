import React, { Fragment } from 'react';

import FormTextareaField from '../forms/form.textarea.field';
import FormTextInputField from '../forms/form.textinput.field';
import FormFileinputField from '../forms/form.fileinput.field';

import EditNewsItem from '../news/news.edit.item';
import CreateNewsItem from '../news/news.create.item';
import ResourceSection from './cms.section.resource';
import ListNewsArticles from '../news/news.list.items';

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
                        List={ () => <ListNewsArticles handleClick={ (e) => handleClick(e) } handleChange={ e => handleChange(e) } /> }
                        Edit={ () => <EditNewsItem handleClick={ (e) => handleClick(e) } /> }
                        Create={ () => <CreateNewsItem handleClick={ (e) => handleClick(e) } />}
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