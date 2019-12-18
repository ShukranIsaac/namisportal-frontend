// Import External Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import UUID from 'uuid'
import IsEqual from 'lodash.isequal'
import { connect } from 'react-redux';

import * as BreadCrumbAction from '../../../actions/breadcrumbs.action';

// Create and export the component
export class Breadcrumb extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		hidden: PropTypes.bool,
		children: PropTypes.element
	}

	static defaultProps = {
		hidden: false,
		children: null
	}

	state = {
		id: UUID.v4()
	}

	render() {
		return this.props.children
	}

	componentDidMount() {
		let { data, hidden } = this.props

		if ( !hidden ) this.props.add(this.state.id, data);
	}

	componentWillReceiveProps(nextProps) {
		let { data, hidden } = nextProps;

		// Update the crumb if its data has changed
		if ( !IsEqual(data, this.props.data) ) {
			this.props.update(this.state.id, data);
		}

		// Remove/add crumb based on `hidden` prop
		if ( hidden && !this.props.hidden ) {
			this.props.remove(this.state.id, data);
		} else if ( !hidden && this.props.hidden ) {
			this.props.add(this.state.id, data);
		}
	}

	componentWillUnmount() {
		this.props.remove(this.state.id, this.props.data);
	}

}

const mapStateToProps = (state) => {

    return {
        breadcrumbs: state.breadcrumbs,
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        add: (id, data) => { dispatch(BreadCrumbAction.addBreadcrumb(id, data)) },
        update: (id, data) => { dispatch(BreadCrumbAction.updateBreadcrumb(id, data)) },
        remove: (id, data) => { dispatch(BreadCrumbAction.removeBreadcrumb(id, data)) },
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
