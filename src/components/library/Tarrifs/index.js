import React, { Component } from 'react'
import Document from '../Document'

export default class Tarrifs extends Component {
    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const docs = [
            {
                name: 'MERA Tariff Determination Procedures and Information Requirements',
                path: '', //require('../../../assets/docs/tarrifs/MERA Tariff Determination Procedures and Information Requirements.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'New Tariff Methodology',
                path: '', //require('../../../assets/docs/tarrifs/NewTariff Methodology.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Tariff Framework for Mini Grids in Malawi',
                path: '', //require('../../../assets/docs/tarrifs/Tariff Framework for Mini Grids in Malawi.pdf'),
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
            return <Document name={name} path={path} summary={summary}/>
        })
    }

}
