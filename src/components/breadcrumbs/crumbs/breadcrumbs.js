// Import External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Specify BEM block name
const block = 'breadcrumbs';

// Create and export the component
export const Breadcrumbs = ({
    className, 
    hidden, 
    wrapper: Wrapper, 
    setCrumbs, 
    breadcrumbs,
    ...props 
}) => {
    const hiddenMod = hidden ? `${block}--hidden` : '';

    let crumbs = breadcrumbs.sort((a, b) => {
        return a.pathname.length - b.pathname.length
    })

    if (setCrumbs) crumbs = setCrumbs(crumbs);

    return (
        <div className={className}>
            <Wrapper 
                className={`${block} ${hiddenMod}`} 
                style={{ backgroundColor: "#416fd1" }}>
                <div className={`${block}__inner`}>
                    {
                        crumbs.map((crumb, i) => (
                            <span key={crumb.id} className={`${block}__section`}>
                                <Link
                                    exact
                                    style={{ color: "#fff" }}
                                    className={`${block}__crumb`}
                                    activeClassName={`${block}__crumb--active`}
                                    to={{
                                        pathname: crumb.pathname,
                                        search: crumb.search,
                                        state: crumb.state
                                    }}>
                                    {crumb.title}
                                </Link>

                                {
                                    i < crumbs.length - 1 ? (
                                        <span className={`${block}__separator`}>
                                            {props.separator}
                                        </span>
                                    ) : <span />
                                }
                            </span>
                        ))
                    }
                </div>
            </Wrapper>

            {props.children}

        </div>
    )
}

Breadcrumbs.propTypes = {
    className: PropTypes.string,
    hidden: PropTypes.bool,
    separator: PropTypes.node,
    setCrumbs: PropTypes.func,
    wrapper: PropTypes.oneOfType([
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

Breadcrumbs.defaultProps = {
    className: '',
    hidden: false,
    separator: '>',
    wrapper: props => (
        <nav {...props}>
            {props.children}
        </nav>
    )
}

const mapStateToProps = (state) => ({
    breadcrumbs: state.breadcrumbs,
});

export default connect(mapStateToProps, 
    null)(Breadcrumbs);
