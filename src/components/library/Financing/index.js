import React, { Fragment } from 'react';

const Financing = (props) => {

    const { library } = props;

    return(
        <Fragment>
            { props.renderDocuments(library) }
        </Fragment>
    );

}

export default Financing;
