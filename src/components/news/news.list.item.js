import React, { Component } from 'react';
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
    
        this.toogleNewsItem = this.toogleNewsItem.bind(this);
    
    }
    
    toogleNewsItem(e){
        
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    
    }
    
    render() {

        const { classes } = this.props;
    
        return (
            <>
                <div>
                    <h4 className="heading">
                        <NavLink to="/news/e8g9tyjGh">Information clearing house, Department of Energy</NavLink>
                    </h4>
                    <Typography variant="caption">
                        <div className={classes.when}>2hrs ago</div>
                        By John Doe(<a href="mailto:newseditor@grid.mw" className={classes.link}>newseditor@grid.mw</a>)
                    </Typography>
                </div>
                <Typography>
                    The Project Developer should submit a Concept Note to the Rural 
                    Energy Agency (REA) in order to get a preliminary assessment of 
                    whether the planned project is eligible for support from the 
                    REA. The Concept note should, inter alia, include:
                </Typography>
                <Collapse isOpen={this.state.isOpen}>   
                    <Typography>
                        An information portal is a customized website that immerses information from a wide
                        range of sources in a consistent and uniform manner. For this purpose, UNDP and
                        Department of Energy Affairs (DoEA) seek to establish an information clearing house
                        portal to make available information that includes: current electricity grid network,
                        planned and known rural electrification efforts of Malawi Rural Electrification Project
                        (MAREP); existing off-grid systems; population centres; renewable energy resource
                        information; infrastructure; location of government public service institutions; location
                        of other rural infrastructure, land use, environmental and social issues.
                    </Typography>
                </Collapse>
                <h6 style={{ marginTop: '0px' }}>
                    <a 
                        href="/#"
                        onClick={(e) => this.toogleNewsItem(e)} 
                        className={classes.moreOrLess}
                    >
                        { 
                            !this.state.isOpen ? 
                                <div><em>more...</em></div> : <em><div>less...</div></em>
                        }
                    </a>
                </h6>

                <Divider style={{ margin: '20px' }} />
            </>
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