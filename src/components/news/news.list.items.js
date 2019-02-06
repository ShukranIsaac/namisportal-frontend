import React, { Fragment } from 'react';

import NewsArticleItem from '../news/news.article.item';
import SearchInputControl from '../forms/search.form.field';

const ListNewsArticles = ({ articles, handleClick, handleChange }) => {

    return (
        <Fragment>

            <SearchInputControl 
                id="search_id"
                name="search_article"
                placeholder="Search for specific article..."
                handleClick={ handleClick }
                handleChange={ (e) => handleChange(e) }
            />

            <NewsArticleItem handleClick={ handleClick }/>

        </Fragment>
    );

}

export default ListNewsArticles;