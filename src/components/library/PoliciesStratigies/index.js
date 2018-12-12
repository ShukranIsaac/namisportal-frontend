import React, { Component } from 'react';
import Document from '../Document';

export default class PoliciesStratigies extends Component {

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

            return <Document key={key} name={this.toTitleCase(name)} path={path} summary={summary}/>

        })

    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            txt =>  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

}
