import React, { Component } from 'react';
import { Row } from 'reactstrap';

import CustomColumn from '../news/custom.column';
import SearchInputControl from '../forms/search.form.field';
import FormLegendField from '../forms/form.legend.field';
import { Flex } from 'reflexbox';
import { bold } from 'react-icons-kit/feather/bold';

class FAQ extends Component {

  componentDidMount() {

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value})

  }

  render(){

    return (
      <>

        <Row style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>

          <CustomColumn sm='12' md='4' lg='2'>

            <Flex wrap column align='top' justify='left' m={1} w={1} p={1} style={{ borderLeft: 'solid #fff000'}}>

              <a href="/contact"><FormLegendField value="Contact us"/></a>

            </Flex>

          </CustomColumn>

          <CustomColumn sm='12' md='12' lg='10'>

            <div className="card" style={{ background: '#dcdde1',  marginBottom: '30px' }}>
                <div className="card-body" style={{ padding: '20px' }}>
                  This are some of the previously or frequently asked questions. If not helped please contact us through the link given.
                </div>
            </div>

            <form autoComplete='off'>

              <SearchInputControl 
                handleChange={this.handleChange} 
                placeholder="Search for previous asked questions..."
                name="Faqs"
              />

            </form>

            <Row>
              
              <div>
                  <h4 className="heading" style={{ marginTop: '20px' }}>
                    <i style={{ fontSize: '20px', fontStyle: bold }}>Q. </i>
                    Is there a support Policy framework for mini-grid development in Malawi?
                  </h4>
                  <div variant="caption">
                      <i style={{ fontSize: '20px', fontStyle: bold }}>Answer: </i>
                      <p>Minigrid development is supported by the draft Energy Policy 2018 which is advocating for private participation in electricity generation in form of IPPs.The policy also advocate for the Rural Electrification Fund to be funding of off-grid renewable energy technologies which includes minigrids.The draft Policy has adopted a New Global Tracking Framework for measuring electricity access in the country.The new framework takes into account connections from minigrids when measuring electricity access.</p>
                      <p>Minigrid development is also supported in the Malawi Renewable Energy Strategy(MRES) which is promoting clean minigrids and views them as a most economically viable technology solution in areas with a population which has a density above 250 inhabitants per square kilometre and are situated more than 5km from the medium-voltage grid line. The MRES also advocate for capacity building for mnigrid operators; Favourable licencing; Development of quality Minigrid standards; Development of cost-reflective tariffs, among others.</p>
                  </div>
              </div>

            </Row>

          </CustomColumn>

        </Row>

      </>
    );

  }

}

export default (FAQ);
