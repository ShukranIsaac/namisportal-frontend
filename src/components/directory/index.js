import React, { Component, Fragment } from 'react';
import { 
    Container, Card, 
    Row, Pagination, PaginationItem, PaginationLink 
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DirectoryItem from './item';

import './directory.css';
import * as Stakeholder from '../../actions/stakeholder.action';
import { redirect } from '../user/user.redirect';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import CustomColumn from '../news/custom.column';

const Nav = ({ 
    stakeholders_list, 
    classes 
}) => {

    return <Fragment>
        {
            stakeholders_list.length > 10 ?
                (<Row>
                    <Pagination aria-label="Page navigation example" className={classes.paginationStuff}>
                        <PaginationItem>
                            <PaginationLink className={classes.previous} previous href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">4</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">5</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next href="#" />
                        </PaginationItem>
                    </Pagination>
                </Row>) : <Row />
        }
    </Fragment>
}
class Directory extends Component {

    componentDidMount() {

        // fetches all stakeholders
        this.props.fetchStakeholders();

    }

    handleClick = (e) => {
        // e.preventDefault();
        return redirect.to({ url: `/directory/` + this.props.stakeholders_list[1].name, from: this.props });

    }

    render() {

        const { stakeholders_list, general } = this.props;

        return (
            <div className="page-content">

                <Container>
                    <Row>
                    {
                        stakeholders_list ?
                            <CustomColumn sm='12' md='12' lg='12'>
                                <Card>
                                    <NoDataCard
                                        text={`Here is a list of some of the stakeholders we work with.`}
                                        header={`Directory`}
                                        intent={Intent.PRIMARY}
                                    />
                                </Card>
                            </CustomColumn>
                            : <CustomColumn sm='12' md='12' lg='12'>
                                {
                                    general && (
                                        !general.isLoading && (
                                            <Card>
                                                <NoDataCard
                                                    text={`No information availble to show. Please refresh page`}
                                                    header={`Information!`}
                                                    intent={Intent.WARNING}
                                                />
                                            </Card>
                                        )
                                    )
                                }
                            </CustomColumn>
                    }
                    {
                        general && (
                            !general.isLoading ? (
                                (stakeholders_list !== null && stakeholders_list !== undefined) && (
                                    <Fragment>
                                        {
                                            stakeholders_list.map((stakeholder, index) => {

                                                return (
                                                    <DirectoryItem key={stakeholder.name + index} stakeholder={stakeholder} handleClick={this.handleClick} />
                                                );

                                            })
                                        }

                                        <Nav {...this.props} />
                                    </Fragment>
                                )
                            ) : <div style={{ marginTop: `50px` }} className="loader" />
                        )
                    }
                    </Row>
                </Container>

            </div>

        );

    }

}

const styles = theme => ({
    card: {
        margin: '0 auto',
        maxWidth: '80%',
        cursor: 'pointer'
    },
    paddindUnset: {
        padding: 'unset'
    },
    headerCard: {
        width: '80%',
        margin: '0 auto',
        // textAlign: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    previous: {
        borderTopLeftRadius: 'unset',
        borderBottomLeftRadius: 'unset'
    },
    paginationStuff: {
        margin: '5px auto'
    },
});


Directory.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    general: state.general.general,
    stakeholders_list: state.stakeholder.stakeholders_list,
});

const mapDispatchToProps = (dispatch) => ({
    // stakeholders
    fetchStakeholders: () => { dispatch(Stakeholder.fetchAllStakeholders()) },
});

export default withStyles(styles, {
    withTheme: true
})(connect(mapStateToProps, mapDispatchToProps)(Directory));
