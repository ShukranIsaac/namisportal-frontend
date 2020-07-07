import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

/**
 * Renders a single news item
 * 
 * @author Isaac S. Mwakabira
 * 
 */
const NewsListItem = ({ 
    when, 
    splitCount, 
    classes, 
    article 
})=> {
    
    return (
        <Fragment>
            <div>
                <h4 className="heading">
                    <NavLink 
                        to={{
                            pathname: `/news/` + article.title,
                            state: {
                                article: {
                                    title: article.title,
                                    text: article.article,
                                    createdDate: new Date(article.createdDate).toLocaleDateString()
                                }
                            }
                        }}
                    > 
                        { article.title } 
                    </NavLink>
                </h4>
                <p variant="caption">
                    <i> 
                        {/* By John Doe (<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>), */}
                        <span className={classes.when}>{ new Date(article.createdDate).toLocaleDateString() }</span>
                    </i>
                </p>
            </div>

            <div>
                <div dangerouslySetInnerHTML={{ __html: splitCount(article.article) }} />
                <NavLink to={{
                    pathname: `/news/` + article.title,
                    state: {
                        article: {
                            title: article.title,
                            text: article.article,
                            createdDate: new Date(article.createdDate).toLocaleDateString()
                        },
                    }
                }}
                >
                    <em>more...</em>
                </NavLink>
            </div>

            <Divider style={{ margin: '20px' }} />

        </Fragment>
    );

}

const styles = theme => ({
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    when: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },
    margin: {
        marginBotton: theme.spacing.unit * 10,
    },
    moreOrLess: {
        width:'30px',
        textAlign: 'left',
        borderRadius: '0',
        background: '#BFCCD6',
    }
});

NewsListItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewsListItem);