import React, { Fragment } from 'react';

const Toolkits = (props) => {

    const { library } = props;

    return(
        <Fragment>
            { props.renderDocuments(library) }
        </Fragment>
    );

}

export default Toolkits;
