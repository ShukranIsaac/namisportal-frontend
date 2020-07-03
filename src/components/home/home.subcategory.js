import React from 'react';
import { Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Link } from "react-router-dom";

// Filter a section from home
export const filterSection = (sections, name) => {
    
    if (sections.length !== 0 && sections === null && sections === undefined) {

      return null;

    }

    return sections.filter(section => {
      // console.log(name)
      if (section.name === name) {
        // console.log(name)
        return section;

      } 

      return null;

    })[0];

}



export class HomeSubCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
            filteredSection: filterSection(this.props.subCategories, 
                this.props.section)
        }

        this.toggle = this.toggle.bind(this)
        this.linkButton = this.linkButton.bind(this)
    }


    
    renderReadMore = (about) => {
        if (about.length > 250){
           
            return (<span 
                    onClick={this.toggle} 
                    className="badge badge-info" 
                    style={{cursor: 'pointer'}}>
                        Read more...
                </span>
            )
        }
        else{
            return ''
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    link(props){

        let url;
    
        if( props !== undefined && props !== null) {
            
            let section_name = (props.name).toLowerCase();
        
            if (props.name !== "Information for Mini-Grid Developers") {
                url = section_name;
                section_name = '';
            } else {
                url = section_name;
                section_name = '';
            }
    
        }
    
        return url;
    }

    linkButton(props) {
        const { name } = props

        if(name !== null && name !== undefined) {
    
            return (
                <Link to={ `${ '/' +  this.link(props) }`}>
                    <button className="btn btn-primary">{ name } section </button>
                </Link>
            );
    
        }
    
        return null;
    
    }

    render(){
        const {filteredSection, modal} = this.state
        
        return (
            <Col sm='12' md='6' lg='4'>
                <div className="card" style={{minHeight: '394px'}}>
                    <div className="card-body">
                        <h4>
                            <a className="heading" 
                                href={ this.link(filteredSection) } 
                                // onClick={ redirect.to({ to: '/' + section })}
                            >
                                { filteredSection.name }
                            </a>
                        </h4>
                        <p style={{textAlign: 'justify'}}>
                            { `${filteredSection.about.substring(0, 250)} `} 
                            {
                                this.renderReadMore(filteredSection.about)
                            }
                        </p>
                    
                    </div>
                    <div className="card-footer" style={{  backgroundColor: 'unset', borderTop: 'unset' }}>
                        {
                            filteredSection.name !== "Information for Mini-Grid Developers" 
                            ? this.linkButton(filteredSection) : <></>
                        }
                    </div>
                </div>
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{filteredSection.name}</ModalHeader>
                    <ModalBody>
                        {filteredSection.about}
                        <br/>
                        <p>
                            {
                                filteredSection.name !== "Information for Mini-Grid Developers" 
                                ? this.linkButton(filteredSection) : <div></div>
                            }
                        </p>
                        
                    </ModalBody>
                </Modal>
            </Col>
        )
        
    }
}