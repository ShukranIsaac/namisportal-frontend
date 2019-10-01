import React, { Component, Fragment } from 'react'
import Document from '../Document'

export default class ResourcePlan extends Component {

    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const { library_documents, general } = this.props;

        return general && (
            !general.isLoading ? (
                <Fragment>
                    { this.renderDocuments(library_documents) }
                </Fragment>
            ) : <div className="loader"></div>
        );

    }

    renderDocuments(docs){

        return docs.map(({name, path, summary}, key) => {

            return <Document key={key} name={this.toTitleCase(name)} path={path} summary={summary}/>

        });
        
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            txt =>  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

}
