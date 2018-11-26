import React, { Component } from 'react'
import Document from '../Document'

export default class LegalRegFrameworks extends Component {
    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const docs = [
            {
                name: 'LEGAL AND REGULATORY FRAMEWORK FOR MINI-GRIDS',
                path: require('../../../assets/docs/legal-reg-frameworks/LEGAL AND REGULATORY FRAMEWORK FOR MINI-GRIDS.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'MALAWI GRID CODE',
                path: require('../../../assets/docs/legal-reg-frameworks/MALAWI GRID CODE.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'MARKET RULES FOR THE MALAWI ELECTRICITY MARKET',
                path: require('../../../assets/docs/legal-reg-frameworks/MARKET RULES FOR THE MALAWI ELECTRICITY MARKET.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },

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
