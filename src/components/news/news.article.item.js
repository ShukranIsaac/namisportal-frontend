import React, { Fragment } from 'react';

const NewsArticleItem = ({ article, handleClick }) => {

    return (
        <Fragment>

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