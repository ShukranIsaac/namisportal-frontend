import React, { Fragment } from 'react';

const Tarrifs = (props) => {

    const { library_documents, general } = props;

    return general && (
        !general.isLoading ? (
            <Fragment>
                { props.renderDocuments(library_documents) }
            </Fragment>
        ) : <div className="loader"></div>
    )

}

export default Tarrifs;
