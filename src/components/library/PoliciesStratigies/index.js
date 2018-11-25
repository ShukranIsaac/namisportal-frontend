import React, { Component } from 'react'
import Document from '../Document'

export default class PoliciesStratigies extends Component {
    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const docs = [
            {
                name: 'Malawi National Energy Policy  2018',
                path: '', //require('../../../assets/docs/policies-stratigy/Malawi National Energy Policy  2018.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'MALAWI RENEWABLE ENERGY STRATEGY FINAL VERSION- JULY 2018',
                path: '', //require('../../../assets/docs/policies-stratigy/MALAWI RENEWABLE ENERGY STRATEGY FINAL VERSION- JULY 2018.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            }

        ]

        return(
            <>
                { this.renderDocuments(docs) }
            </>

        );
    }

    renderDocuments(docs){
        return docs.map(({name, path, summary}) => {
            return <Document name={this.toTitleCase(name)} path={path} summary={summary}/>
        })
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            txt =>  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

}
