import React from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button, } from '@blueprintjs/core';

export class CMSHomeSubCategory extends React.Component{

    constructor() {
        super()
        this.state = {
            modal: false,
        }

        this.toggle = this.toggle.bind(this)
        this.renderReadMore = this.renderReadMore.bind(this)
    }


    
    renderReadMore = (about) => {
        if (about.length > 250){
           
            return (<span onClick={this.toggle} className="badge badge-info" style={{cursor: 'pointer'}}>Read more...</span>)
        }
        else{
            return ''
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    render() {

        const { handleClick, section: { name, about, _id } } = this.props;
        const { modal } = this.state;

        return (
            <Col key={ name + _id } sm='12' md='8' lg='6'>
                <div className="card" style={{minHeight: 'auto'}}>
                    <div className="card-body">
                        <h4>
                            <a name="edit" id={_id} key={_id} href="/cms" onClick={ (e) => handleClick(e) }>
                                { name }
                            </a>
                        </h4>
                        <p style={{textAlign: 'justify'}}>
                            { `${about.substring(0, 250)} `} 
                            {
                                this.renderReadMore(about)
                            }
                        </p>

                        <Button name="edit" id={_id} disabled={ false } intent="primary" text="Edit" onClick={(e) => handleClick(e)} />
                    </div>
                </div>
                <Modal 
                    isOpen={modal} toggle={this.toggle}
                    style={{ minWidth: '20%' }}
                    centered={ true }
                    // modalTransition={{ timeout: 400 }} 
                    // backdropTransition={{ timeout: 1000 }}
                    // backdrop={ false }
                >
                    <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
                    <ModalBody>
                        {about}
                        <br/>
                        <p>
                            <Button 
                                name="edit" id={_id} 
                                disabled={ false } 
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
}

CMSHomeSubCategory.propTypes = {
    section: PropTypes.object.isRequired
}