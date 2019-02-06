import React from 'react';
import { Button } from "@blueprintjs/core";
import { Col } from 'reactstrap';
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

      } else {

        return null

      }

    })[0];

}

const link = (props) => {

    let section_name = (props.name).toLowerCase();
    let url = '/';

    if (props.name !== "Information for Mini-Grid Developers") {
        url += section_name;
        section_name = '';
    }

    return url;
}

const linkButton = (props) => {

    return (
        <Link to={ `${ `/` +  link(props) }`}>
            <Button intent="primary">{ props.name } section </Button>
        </Link>
    );

}
/**
 * Render a single home section
 * 
 * @author Isaac S. Mwakabira
 */
export const HomeSubCategory = ({ props, section }) => {

    if (props === null && props === undefined) {
        return <Col sm='12' md='6' lg='4'/>
    }

    // console.log(section);
    const my_section = filterSection(props, section);
    // console.log(my_section)

    return (
        <Col sm='12' md='6' lg='4'>
            <div className="card">
                <div className="card-body">
                <h4>
                    <a className="heading" href={ link(my_section) }>
                        { my_section.name }
                    </a>
                </h4>
                <p>{ my_section.about }</p>
                {
                    my_section.name !== "Information for Mini-Grid Developers" ? linkButton(my_section) : <div></div>
                }
                </div>
            </div>
        </Col>
    );

}