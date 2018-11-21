import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

export default class Sponsors extends Component{
    render(){
        const container = {
            margin: '0 auto',
            width: '80%'
        }

        const imageContainer = {
            maxHeight: '150px',
            minHeight: '150px',
            textAlign: 'center',
        }

        const imageElement = {
            height: '150px'
        }
        const heading = {
            textAlign: 'center'
        }
        return(
            <div>
                <div style={container}>
                    <h3 style={heading}>Sponsors</h3>
                    <Flex
                        wrap 
                        align='center' 
                        justify='center'
                        m={1}
                        w={1}
                        p={3}>
                        <Box  w={1/3} p={1}>
                            <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/malawi.png")} alt="Malawi Coat of Arms"/>
                            </div>
                        </Box>
                        <Box  w={1/3} p={1}>
                             <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/undp.png")} alt="UNDP logo"/>
                            </div>
                        </Box>
                        <Box  w={1/3} p={1}>
                            <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/gef.png")} alt="gef logo"/>
                            </div>
                        </Box>
                    </Flex>
                </div>
            </div>
        );
    }
}