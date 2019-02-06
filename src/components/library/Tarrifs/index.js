import React, { Component } from 'react';

export default class Tarrifs extends Component {

    render(){

        const { library } = this.props;

        return(
            <>
                { this.props.renderDocuments(library) }
            </>

        );
    }

}
