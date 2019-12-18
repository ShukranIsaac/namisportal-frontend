// Import External Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// TODO: Use imitation and allow it to be passed as a prop
import { NavLink } from 'react-router-dom'

// Specify BEM block name
const block = 'breadcrumbs'

// Create and export the component
export class Breadcrumbs extends React.Component {
    static propTypes = {
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

    static defaultProps = {
        className: '',
        hidden: false,
        separator: '>',
        setCrumbs: undefined,
        wrapper: props => (
            <nav {...props}>
                {props.children}
            </nav>
        )
    }

    render() {
        let { className, hidden, wrapper: Wrapper, setCrumbs, breadcrumbs } = this.props;

        let hiddenMod = hidden ? `${block}--hidden` : '';

        let crumbs = breadcrumbs.sort((a, b) => {
            return a.pathname.length - b.pathname.length
        })
        console.log(crumbs)

        if (setCrumbs) {
            crumbs = setCrumbs(crumbs)
        }

        return (
            <div className={className}>
                <Wrapper className={`${block} ${hiddenMod}`}>
                    <div className={`${block}__inner`}>
                        {
                            crumbs.map((crumb, i) => (
                                <span key={crumb.id} className={`${block}__section`}>
                                    <NavLink
                                        exact
                                        className={`${block}__crumb`}
                                        activeClassName={`${block}__crumb--active`}
                                        to={{
                                            pathname: crumb.pathname,
                                            search: crumb.search,
                                            state: crumb.state
                                        }}>
                                        {crumb.title}
                                    </NavLink>

                                    {
                                        i < crumbs.length - 1 ? (
                                            <span className={`${block}__separator`}>
                                                {this.props.separator}
                                            </span>
                                        ) : null
                                    }
                                </span>
                            ))
                        }
                    </div>
                </Wrapper>

                {this.props.children}

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        breadcrumbs: state.breadcrumbs,
    };

}

export default connect(mapStateToProps, null)(Breadcrumbs);
