import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import './home.css';
import './marep.css';

import * as HomeActions from '../../actions/home.action';
import { HomeSubCategory } from './home.subcategory';
import { NoDataCard } from '../card.text';
import { Intent } from '@blueprintjs/core';

import IMAGE from '../../assets/img/42279146641_d3950cd740_k.jpg';

/**
 * @author Paul Sembereka
 * @author Isaac S. Mwakabira
 * 
 */
const Home = ({
    fetchHome,
    general, 
    sections: HomeSections,
    ...props
}) => {

    useEffect(() => fetchHome("Home"), [fetchHome]);

    const sections = () => {
        return general && (!general.isLoading ? 
        <HomeSections {...props} /> : <div className="loader" />);
    }

    const getSection = (data, index) => {
        if (data == null) 
            return null;

        if (index === null) 
            return data[0];

        if (index < 0)
            return {};

        return data.slice(0, index);
    };

    console.log(getSection(props.home.subCategories, 0))

    return (
        <>
            <div className='landing-info'>
                <div className="container-fluid pl-0" 
                    style={{ 
                        background: `url(${IMAGE}) no-repeat center`, 
                        backgroundSize: 'cover',
                        opacity: 1.0
                    }}>
                    <div className="row">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center left">
                            <div className="row">
                                <h1 className="display-2 re-font-size" style={{ color: '#FFF' }}>
                                    Welcome
                                </h1>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center justify-content-start right">
                            <div className="jumbotron my-5 w-75 re-w text-left">
                                <h1 className="display-4 re-display-font-size">Portal Overview</h1>
                                <p className="lead">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet rutrum velit. Sed eu viverra nisi. Ut nunc mi, mollis eget mollis sit amet, ultrices id lorem. Aenean quis urna at arcu molestie pretium vitae id tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae    
                                </p>
                                <hr className="my-1" />
                                <p>
                                    Quisque sagittis ante id varius luctus. Quisque aliquam et orci at dignissim. Vestibulum vitae eros leo. Pellentesque elementum vel libero eu vulputate. Sed nec ultrices nisl. Nullam at pellentesque purus. Integer venenatis aliquam fringilla.
                                </p>
                                <hr className="my-1" />
                                <p>Aenean egestas velit ipsum, eget cursus erat suscipit eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam at ante lacinia, dictum erat nec, fermentum ex. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                // List section's card
                sections()
            }

        </>
    );

}

Home.propTypes = {
    sections: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(
            React.Component
        )
    ]),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node
        )
    ])
}

Home.defaultProps = {
    sections: ({
        home,
        ...props
    }) => {
        return (
        <div className='app-sections'>
            <Container>
                <Row>
                {
                    home !== null && (home.length !== 0 && 
                        (home.subCategories.length !== 0 
                        ? home.subCategories.map((section, index) => {
                            return index !== 0 && <HomeSubCategory 
                                key={index} 
                                subCategories={home.subCategories} 
                                section={section.name} 
                            />
                        }) 
                        : <NoDataCard 
                            header={ `No home subcategories. Please try again!` } 
                            intent={Intent.SUCCESS} 
                            style={{ textAlign: `center` }} 
                        />)
                    )
                }
                </Row>
            </Container>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    home: state.home.home,
    general: state.general.general,
})

const mapDispatchToProps = (dispatch) => ({
    fetchHome: (name) => { 
        dispatch(HomeActions.fetchHomeDetails(name)) 
    },
})

export default connect(mapStateToProps, 
    mapDispatchToProps)(Home);
