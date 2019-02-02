import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import './home.css'
import Footer from '../footer';
import { WhichHeaderComponent } from '../which.header.component';

class Home extends Component {
  
  constructor() {
    super();
    this.state = {}
  }

  render(){

    // const { match } = this.props;
    // console.log(history);
    // console.log(`${match.url}`);

    // const containerStyle = {
    //   width: '90%',
    //   margin: '0 auto',
    // }

    return (
      <>
        <div className='landing-info'>
          <div className = "row top-card">
            <div className="card">
              <div className="card-body">
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
              </div>
            </div>
          </div>
        </div>
        {/* <div style={containerStyle}> */}
        <div className = "card-container">
          <div className = "row">
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
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
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                    <h4><a className="heading" href="/financing">Financing</a></h4>
                    <p>
                      Mini-Grid development in Tanzania may receive fincancing aid from REA.
                      The required documentation and an overview of the procedure is
                      presented in a dedicated relevant section of the Mini-Grids Information Portal.
                    </p>
                      <Link to="financing">
                        <Button intent="primary">Financing Section</Button>
                      </Link>
                      
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                      <h4><a className="heading" href="/library">Library</a></h4>
                      <p>
                        The Library section of the Mini-Grids Information Portal caters to the need
                        of project developers to have all relevant legislature and relevant documents
                        collected at one place, easily accessible, and up-to-date.

                      </p>
                        <Link to="library">
                          <Button intent="primary">Library Section</Button>
                        </Link>
                    </div>
                </div>
            </div>
          </div>
          <br></br>
          <div className = "row">
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                    <h4><a className="heading" href="/gis">GIS</a></h4>
                      <p>
                        To help mini-grid investors get an overview of facts about specific areas in
                        Tanzania, the GIS section presents geographically anchored information
                        (rural electrification, MV&HV lines, powerstations, etc.).
                      </p>
                      <Link to='/gis'>
                        <Button intent="primary">GIS section</Button>
                      </Link>
                    </div>
                </div>
            </div> 
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                    <h4><a className="heading" href="tasf">TASF</a></h4>
                    <p>
                      The Transactional Advisory Services Facility (TASF) provides experts to support
                      developers to strengthen mini-grids operating models, increase their commercial
                      viability and, ultimately, bankability.
                      </p>
                      <Link to="tasf">
                        <Button intent="primary">TASF section</Button>
                      </Link>
                    </div>
                </div>
            </div> 
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                    <h4><a className="heading" href="/directory">Directory</a></h4>
                    <p>
                      The Portal allows the self-registration of state authorities, local authorities,
                      financing institutions and other entities of relevance to mini-grid development.
                      Their details are gathered in the Directory section.
                    </p>
                      <Link to="/directory">
                        <Button intent="primary">Directory section</Button>
                      </Link>
                    </div>
                </div>
            </div>  
          </div>
        </div>
        <Footer/>
      </>
    );
  }
}

export default (WhichHeaderComponent('app_header')(Home));
