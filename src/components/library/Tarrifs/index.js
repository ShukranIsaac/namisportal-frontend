import React, { Component } from 'react'
import Document from '../Document'

export default class Tarrifs extends Component {

    constructor(){
      
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const { library } = this.props;

        return(
            <>
                { this.renderDocuments(library) }
            </>
        );
    }

    renderDocuments(docs){

        return docs.map(({name, path, summary}, key) => {

            return <Document key={key} name={name} path={path} summary={summary}/>

        })

    }

}
