import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { Collapse } from '@blueprintjs/core';

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
    
    render() {

        const { classes } = this.props;
    
        return (
            <Fragment>
                <div>
                    <h4 className="heading">
                        <NavLink to="/news/e8g9tyjGh">Information clearing house, Department of Energy</NavLink>
                    </h4>
                    <p variant="caption">
                        <i> 
                            By John Doe (<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>),
                             <span className={classes.when}> 2 hrs ago</span>
                            
                        </i>
                    </p>
                </div>
                <p>
                    The Project Developer should submit a Concept Note to the Rural 
                    Energy Agency (REA) in order to get a preliminary assessment of 
                    whether the planned project is eligible for support from the 
                    REA. The Concept note should, inter alia, include:
                </p>
                <Collapse isOpen={this.state.isOpen}>   
                    <p>
                        An information portal is a customized website that immerses information from a wide
                        range of sources in a consistent and uniform manner. For this purpose, UNDP and
                        Department of Energy Affairs (DoEA) seek to establish an information clearing house
                        portal to make available information that includes: current electricity grid network,
                        planned and known rural electrification efforts of Malawi Rural Electrification Project
                        (MAREP); existing off-grid systems; population centres; renewable energy resource
                        information; infrastructure; location of government public service institutions; location
                        of other rural infrastructure, land use, environmental and social issues.
                    </p>
                </Collapse>
                <h6 style={{ marginTop: '0px' }}>
                    <a 
                        href="/#"
                        onClick={(e) => this.toggleNewsItem(e)} 
                        className={classes.moreOrLess}
                    >
                        { 
                            !this.state.isOpen ? 
                                <div><em>more...</em></div> : <em><div>less...</div></em>
                        }
                    </a>
                </h6>

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