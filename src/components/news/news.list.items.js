import React, { Fragment } from 'react';

import NewsArticleItem from '../news/news.article.item';
// import SearchInputControl from '../forms/search.form.field';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';

const ListNewsArticles = ({ articles, handleClick, handleChange }) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Article"
                name="create"
                handleClick={e => handleClick(e) }
            />

            {/* <SearchInputControl 
                id="search_id"
                name="search_article"
                placeholder="Search for specific article..."
                handleClick={ handleClick }
                handleChange={ (e) => handleChange(e) }
            /> */}

            <NewsArticleItem handleClick={ handleClick }/>

        </Fragment>
    );

}

export default ListNewsArticles;