import React, { Fragment } from 'react';

const Tarrifs = (props) => {

    const { library } = props;

    return(
        <Fragment>
            { props.renderDocuments(library) }
        </Fragment>
    );

}

export default Tarrifs;
