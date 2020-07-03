import React, { Component } from 'react';
import { CardImg, Col, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './directory.css';
import Config from '../../config';

class Item extends Component {

    render() {

        const { stakeholder } = this.props;

        if (stakeholder !== null && stakeholder !== undefined) {

            const imageUrl = Config.REMOTE_PROD_SERVER + stakeholder.image;

            return (
                <Row>
                    <Col lg='12'>
                        <div style={{ margin: '2.5px 0' }}>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '20% 80%' 
                            }}>

                                <CardImg src={ imageUrl.trim() } />

                                <div>
                                    <h4>
                                        <NavLink
                                            aria-disabled
                                            disabled
                                            to={{
                                                pathname: `/directory/` + stakeholder.name,
                                                state: {
                                                    stakeholder: stakeholder
                                                }
                                            }}
                                        >
                                            {stakeholder.name}
                                        </NavLink>
                                    </h4>
                                    <p>{stakeholder.about}</p>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
            );

        }

    }

}

const styles = theme => ({
    card: {
        margin: '0 auto',
        maxWidth: '80%',
        // cursor: 'pointer'
    },
    paddindUnset: {
        padding: 'unset'
    },
});


Item.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Item);
