import React, { Component, Fragment } from 'react';
import { Box } from 'reflexbox';

class NewsColumn extends Component {

    render() {

        return (
            <Fragment>
                
                <Box w={this.props.w} p={this.props.p}>
                    
                    { this.props.children }
    
                </Box>
    
            </Fragment>
        );

    }

}

export default NewsColumn;