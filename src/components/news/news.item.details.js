import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const NewsItemDetails = ({ classes, location }) => {
    
    const { state: { article } } = location;

    return (
        <div className="container" style={{ marginTop: '30px' }}>
            <div>
                <h4 className={classNames(classes.headline, "heading")}>{ article.title }</h4>
                <Typography variant="caption">
                    <div className={classes.when}>{ article.createdDate }</div>
                    By John Doe
                </Typography>

                <Divider style={{ margin: '20px' }} />
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: article.text }}></div>

            <Divider style={{ margin: '20px', width: '35%' }} />

            <Typography variant="caption">
                By John Doe, <br/> Chief Information Officer.<br/>
                (<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>)
            </Typography>
        </div>
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
    headline: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    when: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },
});

NewsItemDetails.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewsItemDetails);