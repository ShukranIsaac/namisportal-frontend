import React, { Component } from 'react';

export default class Sponsors extends Component{
    render(){
        const container = {
            margin: '0 auto',
            width: '80%',
            paddingTop: '20px',
            paddingBottom: '10px'
        }

        const imageContainer = {
            maxHeight: '150px',
            minHeight: '150px',
            textAlign: 'center',
        }

        const imageElement = {
            height: '150px'
        }

        // const heading = {
        //     textAlign: 'center'
        // }

        return(
            <div>
                <div style={container}>
                    {/* <h3 style={heading}>Sponsors</h3> */}
                    <div className = "row">
                        <div className = "col-sm-4">
                            <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/malawi.png")} alt="Malawi Coat of Arms"/>
                            </div>
                        </div>
                        <div className = "col-sm-4">
                            <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/undp.png")} alt="UNDP logo"/>
                            </div>
                        </div>
                        <div className = "col-sm-4">
                            <div style={imageContainer}>
                                <img style={imageElement} src={require("../../assets/img/gef.png")} alt="gef logo"/>
                            </div>
                        </div>
                    </div>
                    <br></br>
                </div>
            </div>
        );
    }
}