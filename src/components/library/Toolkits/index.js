import React, { Fragment } from 'react';

const Toolkits = (props) => {

    const { library, general } = props;

    return general && (
        !general.isLoading ? (
            <Fragment>
                { props.renderDocuments(library) }
            </Fragment>
        ) : <div className="loader"></div>
    )

}

export default Toolkits;
