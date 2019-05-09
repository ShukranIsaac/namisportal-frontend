import React, {useState} from 'react';
import { Button, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from "react-router-dom";
import { redirect } from '../user/user.redirect';

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

const link = (props) => {

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

const linkButton = (props) => {

    if(props.name !== null && props.name !== undefined) {

        return (
            <Link to={ `${ '/' +  link(props) }`}>
                <Button intent="primary">{ props.name } section </Button>
            </Link>
        );

    }

    return null;

}

/**
 * Render a single home section
 * 
 * @author Isaac S. Mwakabira
 */
export const HomeSubCategory = ({ props, section }) => {
    const [modal, setValue] = useState(false)
    if (props === null && props === undefined) {
        return <Col sm='12' md='6' lg='4'/>
    }

    const my_section = filterSection(props, section);
    
    
    if (my_section === null && my_section === undefined) {
        return <Col sm='12' md='6' lg='4' />
    }
   
    const toggle = () => {
        console.log('somethinf')
        setValue(!modal)
    }

    const renderReadMore = (about) => {
        console.log(about.length)
        if (about.length > 250){
           
            return (<a onClick={toggle}>Read more...</a>)
        }
        else{
            return ''
        }
    }
    return (
        <Col sm='12' md='6' lg='4'>
            <div className="card">
                <div className="card-body">
                <h4>
                    <a className="heading" 
                        href={ link(my_section) } 
                        onClick={ redirect.to({ to: '/' + my_section })}
                    >
                        { my_section.name }
                    </a>
                </h4>
                <p style={{textAlign: 'justify'}}>
                    { `${my_section.about.substring(0, 250)} `} 
                    {
                        my_section.about.length > 250 ? (<a onClick={toggle} className="badge badge-info">Read more...</a>) : ''
                    }
                </p>
                {
                    my_section.name !== "Information for Mini-Grid Developers" ? linkButton(my_section) : <div></div>
                }
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{my_section.name}</ModalHeader>
                <ModalBody>
                    {my_section.about}
                    <br/>
                    <p>
                        {
                            my_section.name !== "Information for Mini-Grid Developers" ? linkButton(my_section) : <div></div>
                        }
                    </p>
                    
                </ModalBody>
            </Modal>
        </Col>
    );

}