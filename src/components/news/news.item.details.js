import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const NewsItemDetails = ({headline, summary, time, editor, classes}) => {
    
    return (
        <>
            <div className="container">
                <div>
                    <h4 className={classNames(classes.headline, "heading")}>
                        Information clearing house, Department of Energy
                    </h4>
                    <Typography variant="caption">
                        <div className={classes.when}>2hr ago</div>
                        By John Doe
                    </Typography>

                    <Divider style={{ margin: '20px' }} />
                </div>
                <Typography>
                    The Project Developer should submit a Concept Note to the Rural 
                    Energy Agency (REA) in order to get a preliminary assessment of 
                    whether the planned project is eligible for support from the 
                    REA. The Concept note should, inter alia, include:
                    An information portal is a customized website that immerses information from a wide
                    range of sources in a consistent and uniform manner. For this purpose, UNDP and
                    Department of Energy Affairs (DoEA) seek to establish an information clearing house
                    portal to make available information that includes: current electricity grid network,
                    planned and known rural electrification efforts of Malawi Rural Electrification Project
                    (MAREP); existing off-grid systems; population centres; renewable energy resource
                    information; infrastructure; location of government public service institutions; location
                    of other rural infrastructure, land use, environmental and social issues.
                </Typography>

                <Divider style={{ margin: '20px', width: '35%' }} />

                <Typography variant="caption">
                    By John Doe, <br/> Chief Information Officer.<br/>
                    (<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>)
                </Typography>
            </div>
        </>
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