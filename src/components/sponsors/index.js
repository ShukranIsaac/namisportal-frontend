import React from 'react';

export const Sponsors = () => {
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

    return (
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
                        <img style={imageElement} src={require("../../assets/img/world-bank.png")} alt="World Bank"/>
                    </div>
                </div>
                <div className = "col-sm-4">
                    <div style={imageContainer}>
                        <img style={imageElement} src={require("../../assets/img/ministry-of-agriculture.png")} alt="Ministry of Agriculture"/>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    );
}

export default Sponsors;