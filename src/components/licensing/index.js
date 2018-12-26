import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Flex } from 'reflexbox';

import LicensingProfile from './LicensingProfile';
import LicensingSidebar from './LicensingSidebar';

import * as LicensingAction from '../../actions/index';

const steps = [
  {
    "type": "Generating",
    "steps": []
  },
  {
    "type": "Distribution",
    "steps": []
  },
  {
    "type": "Licensing",
    "steps": []
  },
];

class Licensing extends Component {

  constructor() {
    super();
    this.state = {
        steps: steps,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {

    this.props.fetchLicencingFilters();

  }

  render(){

    return (
      <>

        <Flex
            p={4}
            align='top'
            justify='center'
            m={1}
            w={1}
            className='landing-info'>

              <LicensingSidebar onChange={ this.handleChange } {...this.props} {...this.state}/>

              <LicensingProfile onChange={ this.handleChange } {...this.props} {...this.state}/>

        </Flex>

      </>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: `100%`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  button: {
    width: '100%',
    textAlign: 'left',
    borderRadius: '0',
    background: '#BFCCD6',
    fontSize: '1.2em'
  },
});

const mapStateToProps = (state) => {

    return {
        filters: state.l_filters.filters,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };

}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchLicencingFilters: () => { dispatch(LicensingAction.fetchLicencingFilters()) },
    };

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Licensing));
