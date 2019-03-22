import React, { Component, Fragment } from 'react';
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
class NewsListItem extends Component {

    constructor(){
        super()
    
        this.state = {
            isOpen: false
        }
    
        this.toggleNewsItem = this.toggleNewsItem.bind(this);
    
    }
    
    toggleNewsItem = (e) => {
        
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    
    }

    when = (time) => {
        const t = new Date(time);
        let str, h, now = new Date();
        h = Number(now.getHours() - t.getHours());
        str = ' ' + h + ' hours ago';
        return str;

    }

    // split and splice the string passed
    splitCount = (string) => {

        return ((string.split(' ')).splice(0, 62)).join(' ');

    }
    
    render() {

        const { classes, article } = this.props;
    
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
                                        createdDate: this.when(article.createdDate)
                                    }
                                }
                            }}
                        > 
                            { article.title } 
                        </NavLink>
                    </h4>
                    <p variant="caption">
                        <i> 
                            By John Doe (<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>),
                             <span className={classes.when}>{ this.when(article.createdDate) }</span>
                        </i>
                    </p>
                </div>

                <p>
                    { this.splitCount(article.article) } 
                    <NavLink to={{
                        pathname: `/news/` + article.title,
                        state: {
                            article: {
                                title: article.title,
                                text: article.article,
                                createdDate: this.when(article.createdDate)
                            },
                        }
                    }}
                    >
                        <em>more...</em>
                    </NavLink>
                </p>

                <Divider style={{ margin: '20px' }} />

            </Fragment>
        );

    }

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