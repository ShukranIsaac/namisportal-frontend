import React, { Component } from 'react'
import Document from '../Document'

export default class ResourcePlan extends Component {
    constructor(){
        super();

        this.renderDocuments = this.renderDocuments.bind(this);
    }

    render(){

        const docs = [
            {
                name: 'Integrated Resource Plan (IRP) for Malawi_Final_May 2017.pdf-Vol. I-Main Report',
                path: require('../../../assets/docs/resource-plan/Integrated Resource Plan (IRP) for Malawi_Final_May 2017.pdf-Vol. I-Main Report.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Malawi IRP - Vol I - Main Report - Appendices',
                path: require('../../../assets/docs/resource-plan/Malawi IRP - Vol I - Main Report - Appendices.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Malawi IRP - Vol II - Load Forecast',
                path: require('../../../assets/docs/resource-plan/Malawi IRP - Vol II - Load Forecast (1).pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Malawi IRP - Vol III - Resource Assessment - Appendices',
                path: require('../../../assets/docs/resource-plan/Malawi IRP - Vol III - Resource Assessment - Appendices.pdf'),
                summary: "This paper provides the process and methodology of tariff setting in the electricity sector as at September 2017. It details the procedures for determining electricity tariffs for customers directly regulated by the Malawi Energy Regulatory Authority (MERA), other than customers regulated through Power Supply Agreements (PSAs) or Power Purchase Agreements (PPAs). It provides both MERA’s administrative process of handling a tariff review for Utilities in the Electricity Supply Industry (ESI) and how tariffs for various retail customer categories are determined."
            },
            {
                name: 'Malawi IRP - Vol III - Resource Assessment',
                path: require('../../../assets/docs/resource-plan/Malawi IRP - Vol III - Resource Assessment.pdf'),
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
            return <Document key={name} name={this.toTitleCase(name)} path={path} summary={summary}/>
        })
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            txt =>  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

}
