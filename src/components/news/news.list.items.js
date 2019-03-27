import React, { Fragment } from 'react';

// import NewsArticleItem from '../news/news.article.item';
// import SearchInputControl from '../forms/search.form.field';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { NoDataCard } from '../card.text';

const ListNewsArticles = ({ articles, handleClick, general }) => {

    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Article"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <ul>
                {
                    general !== null ? 
                        general !== undefined && general.isLoading !== undefined && !general.isLoading ?
                            articles !== null && articles.length !== 0 ? 
                                articles.map(({ _id, title }, index) => {

                                    return (
                                        <li key={ index }>
                                            <a id={ _id } href={`${ '/news/' + title }`} onClick={ (e) => handleClick(e) } name="edit">
                                                { title }
                                            </a>
                                        </li>
                                    );

                                })
                            : <NoDataCard header={ `No articles` } style={{ marginTop: `30px` }} intent={ Intent.WARNING } />
                        : <div className="loader" />
                    : <NoDataCard header='Ooops!! something gone wrong.' intent={Intent.WARNING} />
                }
            </ul>

        </Fragment>
    );

}

export default ListNewsArticles;