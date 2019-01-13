import React, { Fragment } from 'react';

import NewsArticleItem from '../news/news.article.item';

const ListNewsArticles = ({ articles, handleClick, handleChange }) => {

    return (
        <Fragment>

            <NewsArticleItem handleClick={ handleClick } handleChange={ handleChange }/>

        </Fragment>
    );

}

export default ListNewsArticles;