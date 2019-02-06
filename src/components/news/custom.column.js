import React, { Component, Fragment } from 'react';
import { Box } from 'reflexbox';

class CustomColumn extends Component {

    render() {

        return (
            <Fragment>
                
                <Box 
                    w={this.props.w} 
                    p={this.props.p} 
                    m={this.props.m || 0} 
                    style={this.props.style}
                    className={this.props.className}>
                    
                    { this.props.children }
    
                </Box>
    
            </Fragment>
        );

    }

}

export default CustomColumn;