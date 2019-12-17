import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Card, CardBody, Row } from 'reactstrap'
import { withStyles } from '@material-ui/core';
import ParticlesComponent from '../user/particles';
import * as CMSAction from '../../actions/cms.action';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import CustomColumn from '../news/custom.column';

/**
 * Renders financing component
 * 
 * @author Paul Sembereka (Pablo)
 * @author Isaac S. Mwakabira
 * 
 */
class Financing extends Component {

    componentDidMount() {

        // check if we already data for this category in state
        if (this.props.maincategory !== null) {

        }

        // fetch category
        this.props.category('Financing');

    }

    render() {

        const { maincategory, general, classes } = this.props;

        return (
            <div className="page-content">

                <ParticlesComponent />

                <Container>
                    <Row>
                        {
                            general && (
                                !general.isLoading ? (
                                    (maincategory !== undefined && maincategory !== null) ? (
                                        maincategory.subCategories[0] !== undefined && (
                                            <Card>
                                                <CardBody>
                                                    <p className={classes.header}>
                                                        <strong>{maincategory.subCategories[0].name}</strong>
                                                    </p>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: maincategory.subCategories[0].about
                                                        }}
                                                    />
                                                </CardBody>
                                            </Card>
                                        )
                                    ) : (
                                            <CustomColumn sm='12' md='12' lg='12'>
                                                <Card>
                                                    <NoDataCard
                                                        text={`No information availble to show. Please check your device internet connection and refresh.`}
                                                        header={`Information!`}
                                                        intent={Intent.WARNING}
                                                    />
                                                </Card>
                                            </CustomColumn>
                                        )
                                ) : <p className="loader" />
                            )
                        }
                    </Row>
                </Container>
            </div>
        );

    }

}

const styles = {
    header: {
        textAlign: 'center',
    },
    financing: {
        marginBottom: 8,
        borderRadius: 0
    }
}

const mapStateToProps = (state) => {

    return {
        general: state.general.general,
        maincategory: state.cms.maincategory,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        // Financing
        category: (name) => { dispatch(CMSAction.fetchCategory(name)) },
    };

}

Financing.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Financing));
