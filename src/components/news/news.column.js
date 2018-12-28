import React, { Component } from 'react';
import { Box } from 'reflexbox';

class NewsColumn extends Component {

    render() {

        return (
            <>
                <Box w={this.props.w} p={this.props.p}>
                    
                    { this.props.children }
    
                </Box>
    
            </>
        );

    }

}

export default NewsColumn;