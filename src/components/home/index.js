import React, { Component } from 'react';
import { Elevation, Button, Card } from "@blueprintjs/core";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Flex, Box } from 'reflexbox';

import Directory from '../directory'
import GIS from '../gis'
import TASF from '../tasf'
import Financing from '../financing'
import Library from '../library'
import Licensing from '../licensing'

import './home.css'
import Footer from '../footer';

class Home extends Component {
  render(){
    const containerStyle = {
      width: '90%',
      margin: '0 auto',
    }
    return (
      <>
      <Flex
          p={4}
          align='center'
          justify='center'
          m={1}
          w={1}
          className='landing-info'>
          <Box w={1} p={1} align='center'>
            <Card elevation={Elevation.TWO}>
              <h4 className="heading"><a href="/">Information for Mini-Grid Developers</a></h4>
              <p>
                An information portal is a customized website that immerses information from a wide
                range of sources in a consistent and uniform manner. For this purpose, UNDP and
                Department of Energy Affairs (DoEA) seek to establish an information clearing house
                portal to make available information that includes: current electricity grid network,
                planned and known rural electrification efforts of Malawi Rural Electrification Project
                (MAREP); existing off-grid systems; population centres; renewable energy resource
                information; infrastructure; location of government public service institutions; location
                of other rural infrastructure, land use, environmental and social issues.
              </p>
            </Card>
          </Box>
        </Flex>
      <div style={containerStyle}>
        <Flex
          wrap
          align='center'
          justify='center'
          m={1}
          w={1}
          p={3}>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4 ><a className="heading" href="/licencing">Licensing</a></h4>
            <p>
            The Mini-Grids Information Portal's Licensing section provides
            an overview of procedures, prerequisites and required documentation
            for obtaining generation, distribution, and supply licenses for small
            powerplants.
            </p>
            <Link to="licensing">
              <Button intent="primary">Licensing Section</Button>
            </Link>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4><a className="heading" href="/financing">Financing</a></h4>
            <p>
            Mini-Grid development in Tanzania may receive fincancing aid from REA.
            The required documentation and an overview of the procedure is
            presented in a dedicated relevant section of the Mini-Grids Information Portal.
            </p>
            <Link to="financing">
              <Button intent="primary">Financing Section</Button>
            </Link>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4><a className="heading" href="/library">Library</a></h4>
            <p>
            The Library section of the Mini-Grids Information Portal caters to the need
            of project developers to have all relevant legislature and relevant documents
            collected at one place, easily accessible, and up-to-date.

            </p>
            <Link to="library">
              <Button intent="primary">Library Section</Button>
            </Link>

          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4><a className="heading" href="/gis">GIS</a></h4>
            <p>
            To help mini-grid investors get an overview of facts about specific areas in
            Tanzania, the GIS section presents geographically anchored information
            (rural electrification, MV&HV lines, powerstations, etc.).
            </p>
            <Link to='/gis'>
              <Button intent="primary">GIS section</Button>
            </Link>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4><a className="heading" href="tasf">TASF</a></h4>
            <p>
            The Transactional Advisory Services Facility (TASF) provides experts to support
            developers to strengthen mini-grids operating models, increase their commercial
            viability and, ultimately, bankability.
            </p>
            <Link to="tasf">
              <Button intent="primary">TASF section</Button>
            </Link>

          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card elevation={Elevation.TWO}>
            <h4><a className="heading" href="/directory">Directory</a></h4>
            <p>
            The Portal allows the self-registration of state authorities, local authorities,
            financing institutions and other entities of relevance to mini-grid development.
            Their details are gathered in the Directory section.
            </p>
            <Link to="/directory">
              <Button intent="primary">Directory section</Button>
            </Link>
          </Card>
          </Box>
        </Flex>
      </div>
      <Footer/>
      <Route path="/gis" component={GIS} />
      <Route path="/licensing" component={Licensing} />
      <Route path="/financing" component={Financing} />
      <Route path="/library" component={Library} />
      <Route path="/directory" component={Directory} />
      <Route path="/tasf" component={TASF} />
      </>
    );
  }
}

export default Home;
