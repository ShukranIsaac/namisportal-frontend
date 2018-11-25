import React, { Component } from 'react'
import Document from '../Document'

export default class Toolkits extends Component {
    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const docs = [
            {
                name: 'Toolkit - infosheet 1 energy and electricity',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 1 energy and electricity.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 1a energy framework',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 1a energy framework.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 2 electrification options',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 2 electrification options.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 3 renewable energy minigrids',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 3 renewable energy minigrids.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 4 energy demand and supply - sizing',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 4 energy demand and supply - sizing.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 5 C-B modelling',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 5 C-B modelling.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Toolkit - infosheet 6 business-operation models',
                path: '', //require('../../../assets/docs/toolkit/Toolkit - infosheet 6 business-operation models.pdf'),
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
            return <Document key={name} name={name} path={path} summary={summary}/>
        })
    }

}
