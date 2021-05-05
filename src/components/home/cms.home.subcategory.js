import React from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button, } from '@blueprintjs/core';
import UserProfile, { profile } from '../user/user.profile';
import ButtonControls from '../cms/cms.controls';

export const CMSHomeSubCategory = ({
    handleClick, 
    modal,
    dangerouslyRender,
    renderReadMore,
    section, 
    activeElement
}) => {
    const user = UserProfile.get();

    return (<li key={section?._id + section?.name} className="list-group-item">
        <div className="lead">
        {
            !profile.canEdit({ user })
            ? <div className="heading">{section?.name}</div>
            : <a
                name="edit" 
                id={section?._id} key={section?._id} href="/#"
                onClick={(e) => handleClick(e)}
                className="heading">
                {section?.name}
            </a>
        }
        </div>
        <p style={{ textAlign: 'justify' }}>
            { 
                modal && section?._id === activeElement ? dangerouslyRender(section?.about) : 
                dangerouslyRender(section?.about.substring(0, 200))
            }
            { renderReadMore(section) }
            <span><i>
                <ButtonControls 
                    keys={['edit']}
                    user={ user }
                    id={section?._id}
                    handleClick={e=>handleClick(e)}
                />
            </i></span>
        </p>
    </li>)
}

CMSHomeSubCategory.propTypes = {
    section: PropTypes.object.isRequired
}

export default CMSHomeSubCategory;

export const StatusModal = ({
    section: { name, about, _id },
    toggle,
    modal,
    handleClick
}) => {
    return (
        <Col key={name + _id} sm='12' md='8' lg='6'>
            <Modal
                isOpen={modal} toggle={toggle}
                style={{ minWidth: '20%' }}
                centered={true}
                // modalTransition={{ timeout: 400 }} 
                // backdropTransition={{ timeout: 1000 }}
                // backdrop={ false }
            >
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                    {about}
                    <br />
                    <p>
                        <Button
                            name="edit" id={_id}
                            disabled={!profile.canEdit({ 
                                user: UserProfile.get() })
                            }
                            intent="primary"
                            text="Edit"
                            onClick={(e) => handleClick(e)}
                        />
                    </p>
                </ModalBody>
            </Modal>
        </Col>
    );
}