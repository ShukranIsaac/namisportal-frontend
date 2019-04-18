import React, { Component, Fragment } from 'react';
import { Card, CardBody } from 'reactstrap'
import Panel from '../financing/panel';
import { redirect } from '../user/user.redirect';

class Licensing extends Component {
  
  constructor(){
      super();
      this.state = {
          isOpen: false,
          collapsed: false
      }
      this.handleClick = this.handleClick.bind(this)
  }

  lincensingProcess = [
    {
      heading: '1. Establishing of a Business Entity (Company)',
      text: (<p>
      This is an optional step which is not required in case the project 
      developer is already a registered company in Malawi. If this is not 
      the case, permission to conduct business in Malawi requires company 
      registration, obtaining a business license, and a tax clearance 
      certificate. Registration of companies is done by the Department of 
      registrar general and is governed by Companies Act No 15 of 2013, 
      Companies Regulations 2016 and Companies Regulations 2017 For more 
      information log on to <a href='https://www.registrargeneral.gov.mw' onClick={ (e) => redirect.toExternalLink({ url: e.target.href, event: e })}>https://www.registrargeneral.gov.mw</a>
      </p>)
    },
    {
      heading: '2. Environmental Clearance',
      text: (<>
      <h4>1.0 Background to Environmental Impact Assessment and National Legislation</h4> <p>
                              Malawi is a signatory to the 1992 Rio Declaration on Environment and Development.
                              Principle 17 of the Declaration commits Malawi to undertaking environmental
                              impact assessments, as a national instrument for environment management on all
                              proposed activities likely to have significant adverse impact on environment, which
                              is subject for a decision of a competent authority. Following the Declaration, several
                              policies and legislations on environmental management have been developed in
                              Malawi of which the overarching legislation is the Environment Management Act
                              (EMA) of 1996, currently under revision. Its subsidiary regulations, The Guidelines
                              for Environmental Impact Assessment in Malawi, were developed in 1997 to ensure
                              compliance with EIA requirements.
                              </p>
      
                              <h4>2.0 Institutional Arrangement governing EIA process in Malawi</h4>
                              <p>
                              The EIA process in Malawi is managed by the Director of Environmental Affairs in
                              Environmental Affairs Department (EAD) under the Ministry of Natural Resources,
                              Energy and Mines (MNREM). EAD is a responsible authority charged with
                              development and enforcement of the environmental policy and legislation. EAD,
                              with support from the Technical Committee of the Environment (TCE), and in line
                              with the provisions of the EMA as well as the Guidelines for Environmental Impact
                              Assessment in Malawi of 1997, determines whether an ESIA is required or not, for all
                              projects. Annexed to the Guidelines for EIA is Appendix B which provide a list of
                              prescribed projects. The TCE reviews environmental impact assessment reports for
                              proposed projects and makes recommendations to the Director of Environmental
                              Affairs, who reports to the National Council for the Environment (NCE). The NCE
                              considers the recommendations from the DEA and advises the Minister for approval
                              and issuance of the environmental certificate.
                              </p>
      
                              <h4>EIA Process in Malawi</h4>
                              <p>
                                According to Guidelines for EIA in Malawi, “EIA is both a process and a tool for
                                project planning and decision-making. Its purpose is to:
                              </p>
      
                              <ul>
                                <li>
                                  Integrate environmental considerations in development planning thereby promoting
                                  sustainable livelihoods.
                                </li>
                                <li>
                                  Ensure that the environmental and socio-economic costs and benefits of economic
                                  development projects are properly accounted for;
                                </li>
                                <li>
                                  Ensure that unwarranted negative impacts are avoided or mitigated at an early stage in the
                                  planning process
                                </li>
                                <li>
                                  Ensure that potential benefits are identified and enhanced;
                                </li>
                                <li>
                                  Carry out environmental and socio-economic studies of projects in parallel with analyses of
                                  technical and economic feasibility;
                                </li>
                                <li>
                                  Ensure that decision-makers are provided with information on a project’s environmental
                                  costs and benefits to complement information on its technical and economic feasibility at key
                                  decision points in the development of the project;
                                </li>
                                <li>
                                  Ensure that all the affected and interested groups (grass-roots communities; government
                                  authorities, developers, investors, NGOs, donors etc) participate in the process;
                                </li>
                                <li>
                                  Set up a machinery to carry out mitigation and monitoring
                                </li>
                                <li>
                                  Promote inter and intra-sectoral linkages and conserve the social, 
                                  historical and cultural values of people and their communities.
                                </li>
                              </ul>
                                <p>
                                  Malawi’s EIA process is specifically designed to integrate EIA requirements within
                                  the project cycle. This integration is essential for the EIA study to provide timely
                                  environmental information at key stages in the project cycle. Thus, early results
                                  from an EIA may indicate practical design changes which would avoid or reduce
                                  negative environmental and social impacts, or better capture environmental and
                                  social benefits. The project developer may then adopt these changes into the
                                  project plan, and the final EIA document would be based upon the revised plan and
                                  describe both reduced impacts and more modest needs for impact management.
                                  Similarly, Government has the opportunity to review and comment upon a project
                                  as it is formulated and, where necessary, require changes to avoid or reduce adverse
                                  environmental impacts before irrevocable project decisions are made. Thus, the EIA
                                  process proceeds in several stages not all of which may be required on any project.
                                </p>
                                <p>
                                  Malawi’s EIA process is specifically designed to integrate EIA requirements within
                                  the project cycle. This integration is essential for the EIA study to provide timely
                                  environmental information at key stages in the project cycle. Thus, early results
                                  from an EIA may indicate practical design changes which would avoid or reduce
                                  negative environmental and social impacts, or better capture environmental and
                                  social benefits. The project developer may then adopt these changes into the
                                  project plan, and the final EIA document would be based upon the revised plan and
                                  describe both reduced impacts and more modest needs for impact management.
                                  Similarly, Government has the opportunity to review and comment upon a project
                                  as it is formulated and, where necessary, require changes to avoid or reduce adverse
                                  environmental impacts before irrevocable project decisions are made. Thus, the EIA
                                  process proceeds in several stages not all of which may be required on any project.
                                </p>
                                <p>
                                  At the start of the EIA process there is screening and scoping stage that result into
                                  the production of a Project Brief. The project brief is received and reviewed by
                                  Government at the project concept to early pre-feasibility and feasibility study
                                  phase.
                                </p>
                                <p>
                                  If EIA is deemed necessary, it is timed to coincide with feasibility studies and
                                  detailed design when the detailed information it provides is most useful to projects
                                  planners. The purpose of designing EIA requirements in this way is to encourage
                                  project developers to include the “EIA team” within the broader project
                                  development team and to make constructive use of EIA findings as they are
                                  generated. The result is that EIA studies should be useful both to project developers
                                  as a planning tool in designing more environmentally sustainable projects and to
                                  Government as an evaluation tool in fulfilling its environmental and natural
                                  resources management responsibilities.
                                </p>
                                <p>
                                  After review of the project brief by the Director of Environmental Affairs, the project
                                  developer is provided with detailed terms of references to guide the EIA studies of
                                  the project. Depending on the nature, scale, status and anticipated environmental
                                  and social impacts of the project, the developer is advised either to conduct a
                                  detailed environment and social impact assessment (ESIA) or develop an
                                  environment and social plan (ESMP) or an environmental audit (EA).
                                </p>
                                  <p><strong>EAD will take a maximum of:</strong></p>
                                  <hr/>
                                  <ul>
                                    <li>15 working days to review and provide feedback on the project brief</li>
                                    <li>10 working days to prepare and provide the ToRs to guide undertakings of a full EIA</li>
                                    <li>50 working days to review and provide feedback on the first draft EIA report</li>
                                    <li>25 working days to review and provide feedback on the revised EIA report(s)</li>
                                    <li>15 working days to review and provide feedback on application of EMP certificate</li>
                                </ul>
                              </>)
      
    },
    {
      heading: '3. Land Clearance',
      text: (<p>
      Here you obtain land clearance (leasing) from the authorities who include District
      Councils, City assemblies of .For more information on the land acquisition and
      registration process, log on to <a href='http://www.lands.gov.mw' onClick={ (e) => redirect.toExternalLink({ url: e.target.href, event: e })}>http://www.lands.gov.mw</a>
    </p>)
    },
    {
      heading: '4. Obtaining Minigrid license',
      text: (<><p>
              Having done all the above cited steps, minigrid developers/operators are supposed
              to apply to Malawi Energy Regulatory Authority (MERA) for a generation and
              distribution licenses. The process of licensing electricity generation and distribution
              is governed by the Electricity Act 2004, Electricity amendment act 2016,Energy
              Regulations Act 2004 and the Rural Electrification Act 2004.For more information
              regarding application forms,guidelines,fees and other details, log on to
              www.meramalawi.mw <a href='http://www.meramalawi.mw' onClick={ (e) => redirect.toExternalLink({ url: e.target.href, event: e })}>http://www.meramalawi.mw</a>
            </p>
            <p>
              Notice that Government of Malawi in collaboration with MERA is drafting Minigrid
              regulatory Frameworks which will streamline licensing processes and requirements
              specifically for minigrids. Once this is approved, streamlined steps to licensing
              minigrids in Malawi shall be posted on this portal.
            </p>
          </>)
    }
  ]

  handleClick(){
      this.setState(() => ({isOpen: !this.state.isOpen, collapsed: !this.state.collapsed}))
  }

  panelCollapsed = ({ isOpen }) => isOpen ? true : false;

  renderPanels ({ subCategories }) {

    return subCategories.map(({ name, about }, index) => {

      return <Panel key={ index } heading={`${ (index + 1) + '. ' + name }`} text={about} />

    });

  }

  render(){

    const header = {
      textAlign: 'center',
    }

    const category = this.props.subcategory;
    const { general } = this.props;

    return (
      <div style={header}>
      
        <Card>
          <Card>
            <p><strong>Licensing</strong></p>
            <p>
              The process for requesting Minigrid Related Licensing-Generation and Distribution license the following 
              steps. Further details are available by clicking on each step.
            </p>
          </Card>
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
          
      </div>
    );
  }

}

export default Licensing;
