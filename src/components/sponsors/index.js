import React from 'react';
import PropTypes from 'prop-types';

import LOGO_MIN_AGRICULTURE from '../../assets/img/ministry-of-agriculture.png';
import LOGO_MALAWI from '../../assets/img/malawi.png';
import { withStyles } from '@material-ui/core';

export const Sponsors = ({
    classes
}) => {
    return (
        <div className={classes.container}>
            <div className="row">
                <div className="col-sm-4">
                    <div className={classes.imageContainer}>
                        <img className={classes.imageElement} 
                            src={LOGO_MALAWI} 
                            alt="Malawi Coat of Arms"
                        />
                    </div>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className={classes.imageContainer}>
                        <img className={classes.imageElement} 
                            src={LOGO_MIN_AGRICULTURE} 
                            alt="Ministry of Agriculture"
                        />
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    );
}

const styles = theme => ({
    container: {
        margin: '0 auto',
        width: '80%',
        paddingTop:  20 + 'px',
        paddingBottom: 10 + 'px'
    },
    imageContainer: {
        maxHeight: 150 + 'px',
        minHeight: 150 + 'px',
        textAlign: 'center',
    },
    imageElement: {
        height: 150 + 'px'
    }
})

Sponsors.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {
    withTheme: true
})(Sponsors);