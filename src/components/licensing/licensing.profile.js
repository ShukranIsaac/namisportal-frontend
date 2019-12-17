import React, { Component, Fragment } from 'react';
import { Card, CardBody } from 'reactstrap'
import Panel from '../financing/panel';
// import { redirect } from '../user/user.redirect';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';
import CustomColumn from '../news/custom.column';

const text = "The process for requesting Minigrid Related Licensing - Generation and Distribution, entails the following steps. Further details are available by clicking on each step.";

/**
 * Licensing 
 * 
 * @author Paul Sembeleka(Pablo)
 * @author Isaac S. Mwakabira
 */
class Licensing extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            collapsed: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(() => ({ isOpen: !this.state.isOpen, collapsed: !this.state.collapsed }))
    }

    panelCollapsed = ({ isOpen }) => isOpen ? true : false;

    renderPanels({ subCategories }) {

        return subCategories.map(({ name, about }, index) => {

            return <Panel key={index} heading={`${(index + 1) + '. ' + name}`} text={about} />

        });

    }

    render() {

        const styles = {
            marginLeft: '0px'
        }

        const category = this.props.maincategory;
        const { general } = this.props;

        return (
            <Fragment>
                {
                    category ?
                        <Card>
                            <NoDataCard
                                text={text} header={`Licensing`}
                                intent={Intent.PRIMARY}
                                style={styles}
                            />
                            <CardBody>
                                {
                                    general && (
                                        !general.isLoading ? (
                                            <Fragment>
                                                {
                                                    category !== null && this.renderPanels(category)
                                                }
                                            </Fragment>
                                        ) : <div style={{ marginTop: `50px` }} className="loader" />
                                    )
                                }
                            </CardBody>
                        </Card>
                        : <CustomColumn sm='12' md='12' lg='12'>
                            <Card>
                                <NoDataCard
                                    text={`No information availble to show. Please check your device internet connection and refresh.`}
                                    header={`Information!`}
                                    intent={Intent.WARNING}
                                />
                            </Card>
                        </CustomColumn>
                }
            </Fragment>
        );
    }

}

export default Licensing;
