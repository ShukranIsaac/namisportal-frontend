import React, { Fragment } from 'react';
import SearchInputControl from '../forms/search.form.field';

const NewsArticleItem = ({ article, handleClick, handleChange }) => {

    return (
        <Fragment>

            <SearchInputControl 
                id="search_id"
                name="search_article"
                placeholder="Search for specific article..."
                handleClick={ handleClick }
                handleChange={ (e) => handleChange(e) }
            />

            <ul>
                <li>
                    <a 
                        href="/news/e8g9tyjGh" 
                        onClick={ (e) => handleClick(e) }
                        name="edit"
                    >
                        Information clearing house, Department of Energy
                    </a>
                </li>
                <li>
                    <a 
                        href="/news/e8g9tyjGh" 
                        onClick={ (e) => handleClick(e) }
                        name="edit"
                    >
                        New Marep centers Destroyed, Department of Energy
                    </a>
                </li>
            </ul>

        </Fragment>
    );
    
}

export default NewsArticleItem;