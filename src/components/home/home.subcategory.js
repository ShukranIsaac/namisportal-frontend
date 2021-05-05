import React, { useState } from 'react';
import { Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Link } from "react-router-dom";

export const HomeSubCategory = ({
    section
}) => {
    const [modal, setModal] = useState(false);

    const renderReadMore = (about) => {
        if (about.length > 250) {
            return (<span
                onClick={toggle}
                className="badge badge-info inline"
                style={{ cursor: 'pointer' }}>
                Read more...
            </span>
            )
        }
        else {
            return ''
        }
    }

    const toggle = () => setModal(!modal);

    const link = (props) => {
        let url;

        if (props !== undefined && props !== null) {
            let section_name = (props.name).toLowerCase();
            url = section_name;
            section_name = ''
        }
        return url;
    }

    const linkButton = (props) => {
        const { name } = props

        if (name !== null && name !== undefined) {
            return (
                <Link to={`${'/' + link(props)}`}>
                    <button className="btn btn-primary">
                        {name} section
                    </button>
                </Link>
            );
        }

        return null;
    }

    return (
        <Col sm='12' md='6' lg='4'>
            <div className="card" style={{ minHeight: '394px' }}>
                <div className="card-body">
                    <h4>
                        <a className="heading"
                            href={link(section)}
                        >
                            {section.name}
                        </a>
                    </h4>
                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: section?.about.substring(0, 250) }} />
                    {renderReadMore(section.about)}
                </div>
                <div className="card-footer"
                    style={{
                        backgroundColor: 'unset',
                        borderTop: 'unset'
                    }}
                >
                    {
                        linkButton(section)
                    }
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {section.name}
                </ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{ __html: section?.about }} />
                    <br />
                    <p>{linkButton(section)}</p>
                </ModalBody>
            </Modal>
        </Col>
    )
}