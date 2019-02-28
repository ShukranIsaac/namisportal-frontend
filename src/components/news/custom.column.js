import React, { Component } from 'react';
import { Col } from 'reactstrap';

class CustomColumn extends Component {

    render() {

        const { sm, md, lg } = this.props;

        return <Col sm={sm} md={md} lg={lg}> { this.props.children } </Col>

    }

}

export default CustomColumn;